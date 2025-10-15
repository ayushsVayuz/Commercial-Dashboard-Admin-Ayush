// import React from "react";
// import { useDrag, useDrop } from "react-dnd";

// const WIDGET = "WIDGET";
// const GROUP = "GROUP";

// // Helper to get the bounding box of a group
// const getGroupBounds = (group) => {
//   const minX = Math.min(...group.map((w) => w.x));
//   const minY = Math.min(...group.map((w) => w.y));
//   const maxX = Math.max(...group.map((w) => w.x + w.w - 1));
//   const maxY = Math.max(...group.map((w) => w.y + w.h - 1));
//   return {
//     x: minX,
//     y: minY,
//     w: maxX - minX + 1,
//     h: maxY - minY + 1,
//   };
// };

// export const DraggableWidget = ({
//   widget,
//   widgets,
//   setWidgets,
//   setHoverRow,   // ✅ new
//   hoverRow,      // ✅ new
//   swapRows,      // ✅ new
//   children,
//   className,
// }) => {
//   const groupId = widget.groupId ?? widget.id;
//   const isGrouped = widget.groupId !== undefined;

//   // --- Drag entire group ---
//   const [{ isDraggingGroup }, groupDragRef] = useDrag(
//     () => ({
//       type: GROUP,
//       item: () => ({ type: GROUP, groupId }),
//       collect: (monitor) => ({ isDraggingGroup: monitor.isDragging() }),
//     }),
//     [groupId]
//   );

//   // --- Drag individual widget ---
//   const [{ isDraggingWidget }, widgetDragRef] = useDrag(
//     () => ({
//       type: WIDGET,
//       item: () => ({
//         type: WIDGET,
//         id: widget.id,
//         groupId: widget.groupId,
//         widget,
//       }),
//       collect: (monitor) => ({ isDraggingWidget: monitor.isDragging() }),
//     }),
//     [widget]
//   );

//   // --- Drop target ---
//   const [{ isOver }, dropRef] = useDrop(
//     () => ({
//       accept: [WIDGET, GROUP],
//       collect: (monitor) => ({ isOver: monitor.isOver() }),
//       hover: () => {
//         setHoverRow(widget.y); // ✅ highlight this row while hovering
//       },
//       drop: (item) => {
//         setHoverRow(null); // ✅ clear highlight on drop

//         // 🔹 If dropping on another row -> swap rows
//         if (item?.widget && item.widget.y !== widget.y) {
//           const topRow = Math.min(item.widget.y, widget.y) < 2 ? 0 : 2;
//           const bottomRow = topRow === 0 ? 2 : 0;
//           swapRows(topRow, bottomRow);
//           return;
//         }

//         // ✅ your existing widget/group swap logic
//         if (!item) return;
//         if (item.type === WIDGET) {
//           const sourceWidget = item.widget;
//           const targetWidget = widget;

//           if (sourceWidget.id === targetWidget.id) return;

//           // same group swap
//           if (sourceWidget.groupId === targetWidget.groupId) {
//             setWidgets((prev) =>
//               prev.map((w) => {
//                 if (w.id === sourceWidget.id) {
//                   return { ...w, x: targetWidget.x, y: targetWidget.y };
//                 }
//                 if (w.id === targetWidget.id) {
//                   return { ...w, x: sourceWidget.x, y: sourceWidget.y };
//                 }
//                 return w;
//               })
//             );
//             return;
//           }

//           // … rest of your existing swap logic unchanged …
//         }

//         if (item.type === GROUP) {
//           const sourceGroupId = item.groupId;
//           const targetGroupId = widget.groupId ?? widget.id;
//           if (sourceGroupId === targetGroupId) return;

//           // … your existing group swap logic unchanged …
//         }
//       },
//     }),
//     [widget, widgets, setWidgets]
//   );

//   return (
//     <div
//       ref={dropRef}
//       className={`
//         flex flex-col rounded-lg text-white font-bold transition-colors
//         ${isDraggingWidget || isDraggingGroup
//           ? "bg-slate-400"
//           : isOver
//           ? "bg-green-500"
//           : "bg-blue-500"}
//         ${hoverRow === widget.y ? "border-4 border-yellow-400" : ""}
//       `}
//       style={{
//         gridColumn: `${widget.x + 1} / span ${widget.w}`,
//         gridRow: `${widget.y + 1} / span ${widget.h}`,
//       }}
//     >
//       {isGrouped && (
//         <div
//           ref={groupDragRef}
//           className="bg-slate-700 text-xs w-full text-center cursor-move p-1 rounded-t-lg hover:bg-slate-600"
//         >
//           ⇕ Group {widget.groupId}
//         </div>
//       )}
//       <div
//         ref={widgetDragRef}
//         className="w-full h-full flex items-center justify-center"
//       >
//         {widget.id}
//       </div>
//     </div>
//   );
// };
