import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const widgets = [
  {
    widget_id: "d94e5bbe-8fb3-11f0-a613-0277871623b0",
    key_name: "financial",
    title: "Income",
    is_active: 1,
    position: [0, 0, 2, 2],
  },
  {
    widget_id: "d94e5c8a-8fb3-11f0-a613-0277871623b0",
    key_name: "facility",
    title: "Facilities",
    is_active: 1,
    position: [2, 0, 2, 2],
  },
  {
    widget_id: "d94e5a87-8fb3-11f0-a613-0277871623b0",
    key_name: "complaints",
    title: "Helpdesk",
    is_active: 1,
    position: [8, 0, 2, 2],
  },
  {
    widget_id: "d94e5b35-8fb3-11f0-a613-0277871623b0",
    key_name: "gate",
    title: "Gate Updates",
    is_active: 1,
    position: [0, 2, 2, 2],
  },
  {
    widget_id: "d94e5969-8fb3-11f0-a613-0277871623b0",
    key_name: "community",
    title: "Community",
    is_active: 1,
    position: [2, 2, 2, 2],
  },
  {
    widget_id: "d94e56c6-8fb3-11f0-a613-0277871623b0",
    key_name: "engagement",
    title: "Engagement",
    is_active: 1,
    position: [9, 2, 2, 2],
  },
];

export default function WidgetGrid({
  value,
  onChange,
  data = widgets,
  isResizable = true,
  isDraggable = true,
  widgetPositions,
  setWidgetPositions,
}) {

  console.log(data, "data in widget grid");
  // generate layout for grid
  function makeLayout(items) {
    return (
      items
        // ?.filter((w) => w.is_active)
        ?.map((w) => {
          const [x, y, wth, h] = w.position || [0, 0, 4, 2];
          return {
            i: w.widget_id,
            x,
            y,
            w: wth,
            h,
            static: false,
          };
        })
    );
  }

  const effectiveData = value?.length ? value : data;

  const layouts = {
    lg: makeLayout(effectiveData),
    md: makeLayout(effectiveData),
    sm: makeLayout(effectiveData),
  };

  const handleLayoutChange = (currentLayout) => {
    const updated = currentLayout.map((l) => ({
      widget_id: l.i,
      widget_name: l.widget_name,
      position: [l.x, l.y, l.w, l.h],
      is_active: 1,
    }));
    setWidgetPositions?.(updated);
    onChange?.(updated);
  };

  const renderCard = (item) => (
    <div
      key={item.widget_id}
      className="h-full p-4 rounded-xl shadow-sm border-[0.5px] border-[#EBEBEB] bg-white flex flex-col"
      role="region"
      aria-label={item.title}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-medium text-slate-800">
            {item.title || item.widget_name}
          </h3>
        </div>
        <div className="text-xs text-slate-500">
          #{item.position ? item.position.join("/") : "-"}
        </div>
      </div>

      {/* <div className="mt-4 flex-1 grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <div className="w-full h-20 rounded-lg bg-gradient-to-br from-white to-white/80 border border-dashed border-gray-100 flex items-center justify-center text-sm text-slate-400"></div>
        </div>
      </div> */}
    </div>
  );

  return (
    <div className="min-h-[370px]">
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768 }}
        cols={{ lg: 12, md: 12, sm: 6 }}
        rowHeight={80}
        isResizable={isResizable}
        isDraggable={isDraggable}
        draggableHandle={".drag-handle"}
        measureBeforeMount={false}
        useCSSTransforms={true}
        onLayoutChange={handleLayoutChange}
        resizeHandles={["n", "s", "e", "w"]}
      >
        {effectiveData
          // ?.filter((d) => d.is_active)
          ?.map((item) => (
            <div
              key={item.widget_id}
              data-grid={{
                x: item.position[0],
                y: item.position[1],
                w: item.position[2],
                h: item.position[3],
              }}
            >
              <div className="h-full flex flex-col">
                <div className="flex-1 drag-handle cursor-move">
                  {renderCard(item)}
                </div>
              </div>
            </div>
          ))}
      </ResponsiveGridLayout>
    </div>
  );
}
