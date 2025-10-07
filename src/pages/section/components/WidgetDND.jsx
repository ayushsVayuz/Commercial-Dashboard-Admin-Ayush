// import React, { useState, useCallback } from "react";
// import { DndProvider, useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { AllWidgetMapping } from "./Widgets";

// // DnD Item Types
// const WIDGET = "WIDGET";

// // Convert your position format to grid format
// const convertToGridPosition = (widget) => {
//   const [x, y, w, h] = widget.position || [0, 0, 2, 2];
//   return {
//     ...widget,
//     x,
//     y,
//     w,
//     h,
//     containerId: widget.container_id || widget.key_name,
//     groupId: widget.group_id || null,
//     id: widget.widget_id,
//   };
// };

// // Convert grid position back to your format
// const convertFromGridPosition = (widget) => {
//   return {
//     widget_id: widget.id,
//     widget_name: widget.widget_name || "",
//     container_id: widget.containerId,
//     key_name: widget.key_name,
//     title: widget.title,
//     is_active: 1,
//     position: [widget.x, widget.y, widget.w, widget.h],
//     group_id: widget.groupId,
//     data: widget.data,
//     config: widget.config,
//     props: widget.props,
//   };
// };

// // Draggable Widget Component with your logic
// const DraggableWidget = ({ widget, widgets, setWidgets }) => {
//   const { containerId, groupId } = widget;

//   const [{ isDragging }, dragRef] = useDrag(
//     () => ({
//       type: WIDGET,
//       item: { id: widget.id, containerId, groupId },
//       collect: (monitor) => ({ isDragging: monitor.isDragging() }),
//     }),
//     [widget]
//   );

//   const [, dropRef] = useDrop(
//     () => ({
//       accept: WIDGET,
//       drop: (item) => {
//         if (!item) return;

//         const draggedWidgets = widgets.filter(
//           (w) => w.containerId === item.containerId
//         );
//         const targetWidgets = widgets.filter(
//           (w) => w.containerId === widget.containerId
//         );

//         // --- Internal swap inside same group ---
//         if (
//           item.containerId === widget.containerId &&
//           item.groupId &&
//           item.groupId === widget.groupId
//         ) {
//           setWidgets((prev) => {
//             const updated = [...prev];
//             const draggedIndex = updated.findIndex((w) => w.id === item.id);
//             const targetIndex = updated.findIndex((w) => w.id === widget.id);
//             const temp = {
//               x: updated[draggedIndex].x,
//               y: updated[draggedIndex].y,
//             };
//             updated[draggedIndex] = {
//               ...updated[draggedIndex],
//               x: updated[targetIndex].x,
//               y: updated[targetIndex].y,
//             };
//             updated[targetIndex] = {
//               ...updated[targetIndex],
//               x: temp.x,
//               y: temp.y,
//             };
//             return updated;
//           });
//           return;
//         }

//         // --- Internal container swap (vertical) ---
//         if (
//           item.containerId === widget.containerId &&
//           item.groupId !== widget.groupId
//         ) {
//           // dragged group inside container
//           const draggedGroup = widgets.filter(
//             (w) =>
//               w.containerId === widget.containerId && w.groupId === item.groupId
//           );
//           const targetGroup = widgets.filter(
//             (w) =>
//               w.containerId === widget.containerId &&
//               w.groupId === widget.groupId
//           );

//           const draggedMinY = Math.min(...draggedGroup.map((w) => w.y));
//           const targetMinY = Math.min(...targetGroup.map((w) => w.y));

//           setWidgets((prev) =>
//             prev.map((w) => {
//               if (draggedGroup.find((dw) => dw.id === w.id)) {
//                 return { ...w, y: w.y - draggedMinY + targetMinY };
//               }
//               if (targetGroup.find((tw) => tw.id === w.id)) {
//                 return { ...w, y: w.y - targetMinY + draggedMinY };
//               }
//               return w;
//             })
//           );
//           return;
//         }

//         // --- Full container swap for different containers ---
//         const draggedMinX = Math.min(...draggedWidgets.map((w) => w.x));
//         const draggedMinY = Math.min(...draggedWidgets.map((w) => w.y));
//         const targetMinX = Math.min(...targetWidgets.map((w) => w.x));
//         const targetMinY = Math.min(...targetWidgets.map((w) => w.y));

//         setWidgets((prev) =>
//           prev.map((w) => {
//             if (draggedWidgets.find((dw) => dw.id === w.id)) {
//               const xOffset = w.x - draggedMinX;
//               const yOffset = w.y - draggedMinY;
//               return { ...w, x: targetMinX + xOffset, y: targetMinY + yOffset };
//             }
//             if (targetWidgets.find((tw) => tw.id === w.id)) {
//               const xOffset = w.x - targetMinX;
//               const yOffset = w.y - targetMinY;
//               return {
//                 ...w,
//                 x: draggedMinX + xOffset,
//                 y: draggedMinY + yOffset,
//               };
//             }
//             return w;
//           })
//         );
//       },
//     }),
//     [widget, widgets]
//   );

//   const isGrouped = widgets.some(
//     (w) => w.containerId === containerId && w.id !== widget.id
//   );

//   // Get the widget component
//   const WidgetComponent = AllWidgetMapping[widget.container_id]?.component;
//   const widgetData = AllWidgetMapping[widget.container_id]?.data || {};

//   const renderWidget = () => {
//     if (!WidgetComponent) {
//       return (
//         <div className="h-full p-4 flex flex-col bg-white rounded-xl border border-gray-200">
//           <div className="flex items-start justify-between gap-4">
//             <div>
//               <h3 className="text-base font-medium text-slate-800">
//                 {widget.title || widget.widget_name}
//               </h3>
//               <p className="text-xs text-slate-500 mt-1">
//                 Key: {widget.key_name}
//               </p>
//             </div>
//             <div className="text-xs text-slate-500">
//               #{widget.x}/{widget.y}
//             </div>
//           </div>
//           <div className="flex-1 flex items-center justify-center">
//             <p className="text-sm text-slate-400">Widget Preview</p>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className="h-full w-full relative bg-white !border-[0.5px] !border-[#EBEBEB] !rounded-xl !shadow-[0_0_12px_0_#EAF2FF]">
//         <WidgetComponent
//           data={widgetData}
//           config={widget.config || {}}
//           {...(widget.props || {})}
//         />
//       </div>
//     );
//   };

//   return (
//     <div
//       ref={(node) => dragRef(dropRef(node))}
//       className={`flex flex-col rounded-lg transition-all duration-200 ${
//         isDragging ? "opacity-50 scale-105 z-50" : "hover:scale-[1.02]"
//       }`}
//       style={{
//         gridColumn: `${widget.x + 1} / span ${widget.w}`,
//         gridRow: `${widget.y + 1} / span ${widget.h}`,
//         cursor: isDragging ? "grabbing" : "grab",
//       }}
//     >
//       {/* Drag Handle for Grouped Widgets */}
//       {isGrouped && (
//         <div className="bg-slate-700 text-white text-xs w-full text-center cursor-move p-1 rounded-t-lg hover:bg-slate-600 transition-colors">
//           ⇕ {widget.title || widget.widget_name}{" "}
//           {groupId ? `- Group ${groupId}` : ""}
//         </div>
//       )}

//       {/* Widget Content */}
//       <div
//         className={`w-full h-full flex items-center justify-center relative ${
//           !isGrouped ? "rounded-lg" : "rounded-b-lg"
//         }`}
//       >
//         {/* Drag indicator for non-grouped widgets */}
//         {!isGrouped && (
//           <div className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm rounded-md p-1 shadow-sm border z-10">
//             <svg
//               width="16"
//               height="16"
//               viewBox="0 0 24 24"
//               fill="none"
//               className="text-gray-600"
//             >
//               <circle cx="9" cy="5" r="1" fill="currentColor" />
//               <circle cx="15" cy="5" r="1" fill="currentColor" />
//               <circle cx="9" cy="12" r="1" fill="currentColor" />
//               <circle cx="15" cy="12" r="1" fill="currentColor" />
//               <circle cx="9" cy="19" r="1" fill="currentColor" />
//               <circle cx="15" cy="19" r="1" fill="currentColor" />
//             </svg>
//           </div>
//         )}
//         {renderWidget()}
//       </div>
//     </div>
//   );
// };

// export default function WidgetGridDND({
//   value,
//   onChange,
//   data,
//   widgetPositions,
//   setWidgetPositions,
// }) {
//   const effectiveData = value?.length ? value : data;

//   // Convert your widget format to grid format
//   const [gridWidgets, setGridWidgets] = useState(
//     () => effectiveData?.map(convertToGridPosition) || []
//   );

//   // Handle widget updates and convert back to your format
//   const handleWidgetsChange = useCallback(
//     (newGridWidgets) => {
//       setGridWidgets(newGridWidgets);

//       const convertedWidgets = newGridWidgets.map(convertFromGridPosition);
//       setWidgetPositions?.(convertedWidgets);
//       onChange?.(convertedWidgets);
//     },
//     [onChange, setWidgetPositions]
//   );

//   // Update grid widgets when external data changes
//   React.useEffect(() => {
//     if (effectiveData) {
//       setGridWidgets(effectiveData.map(convertToGridPosition));
//     }
//   }, [effectiveData]);

//   console.log(gridWidgets, "grid widgets data");

//   return (
//     <div className="p-4">
//       <DndProvider backend={HTML5Backend}>
//         <div
//           className="
//             grid gap-2 w-full
//             grid-cols-6
//             auto-rows-[120px] 
//             sm:auto-rows-[100px]
//             md:auto-rows-[120px]
//             lg:auto-rows-[140px]
//           "
//         >
//           {gridWidgets.map((widget) => (
//             <DraggableWidget
//               key={widget.id}
//               widget={widget}
//               widgets={gridWidgets}
//               setWidgets={handleWidgetsChange}
//             />
//           ))}
//         </div>
//       </DndProvider>
//     </div>
//   );
// }