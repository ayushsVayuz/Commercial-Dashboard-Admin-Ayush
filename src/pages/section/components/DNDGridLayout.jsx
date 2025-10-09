import { WidthProvider, Responsive } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { AllWidgetMapping } from "./Widgets";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function DNDGridLayout({
  value,
  onChange,
  data,
  isResizable = false,
  isDraggable = true,
  widgetPositions,
  setWidgetPositions,
}) {
  // ---------- Helpers ----------
  function makeLayout(items) {
    return items?.map((w) => {
      const [x, y, wth, h] = w?.position || [0, 0, 2, 2];
      return {
        i: w.widget_id,
        x,
        y,
        w: wth,
        h,
        static: false,
      };
    });
  }

  const effectiveData = value?.length ? value : data;

  const layouts = {
    xl: makeLayout(effectiveData),
    lg: makeLayout(effectiveData),
    md: makeLayout(effectiveData),
    sm: makeLayout(effectiveData),
  };

  const handleLayoutChange = (currentLayout) => {
    const updated = currentLayout.map((l) => {
      const matchedWidget = data?.find((item) => item?.widget_id === l?.i);
      return {
        widget_id: l.i,
        widget_name: matchedWidget?.widget_name || "",
        container_id: matchedWidget?.container_id || "",
        position: [l.x, l.y, l.w, l.h],
        is_active: 1,
      };
    });
    setWidgetPositions?.(updated);
    onChange?.(updated);
  };

  // ---------- Render ----------
  const renderWidget = (item) => {
    const WidgetComponent = AllWidgetMapping[item.container_id]?.component;

    if (!WidgetComponent) return renderPlaceholderCard(item);

    return (
      // <div className="h-full w-full relative bg-white !border-[0.5px] !border-[#EBEBEB] !rounded-xl !shadow-[0_0_12px_0_#EAF2FF]">
      <WidgetComponent
        data={item.data || {}}
        config={item.config || {}}
        {...(item.props || {})}
      />
      //  </div>
    );
  };

  const renderPlaceholderCard = (item) => (
    <div
      className="h-full p-4 relative bg-white !border-[0.5px] !border-[#EBEBEB] !rounded-xl !shadow-[0_0_12px_0_#EAF2FF] flex flex-col"
      role="region"
      aria-label={item.widget_name}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-medium text-slate-800">
            {item.title || item.widget_name}
          </h3>
          <p className="text-xs text-slate-500 mt-1">Key: {item.key_name}</p>
        </div>
        <div className="text-xs text-slate-500">
          #{item.position ? item.position.join("/") : "-"}
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <p className="text-sm text-slate-400">Widget Preview</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-[370px] -mx-[10px]">
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ xl: 1300, lg: 1200, md: 996, sm: 768 }}
        cols={{ xl: 6, lg: 6, md: 6, sm: 6 }}
        rowHeight={10}
        isResizable={isResizable}
        isDraggable={isDraggable}
        draggableHandle=".drag-handle"
        measureBeforeMount={false}
        useCSSTransforms
        onLayoutChange={handleLayoutChange}
        resizeHandles={["n", "s", "e", "w"]}
        margin={[10, 10]}
      >
        {effectiveData?.map((item) => {
          const mapping = AllWidgetMapping[item?.container_id] || {};
          const [defX, defY, defW, defH] = mapping.position || [0, 0, 1.5, 1.5];

          const x = item?.position?.[0] ?? defX;
          const y = item?.position?.[1] ?? defY;
          const w =
            Math.max(item?.position?.[2] ?? defW, mapping.minWidth) || 1.5;
          const h =
            Math.max(item?.position?.[3] ?? defH, mapping.minHeight) || 1.5;

          const mergedData = { ...mapping.data, ...item?.data };

          return (
            <div key={item?.widget_id} data-grid={{ x, y, w, h }}>
              <div className="h-full flex flex-col">
                <div className="flex-1 drag-handle cursor-move">
                  {renderWidget({ ...item, data: mergedData })}
                </div>
              </div>
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </div>
  );
}
