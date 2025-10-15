// import { useState } from "react";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { DraggableWidget } from "./components/DragableWidget";

// const widgetsDummyArray = [
//   { id: "A", x: 0, y: 0, w: 4, h: 1, groupId: "group1" },
//   { id: "B", x: 0, y: 1, w: 4, h: 1, groupId: "group1" },
//   { id: "C", x: 4, y: 0, w: 4, h: 2 },
//   { id: "D", x: 8, y: 0, w: 4, h: 2 },
//   { id: "E", x: 0, y: 2, w: 6, h: 2, groupId: "group2" },
//   { id: "F", x: 6, y: 2, w: 6, h: 2, groupId: "group2" },
// ];

// export default function Dashboard() {
//   const [widgets, setWidgets] = useState(widgetsDummyArray);
//   const [hoverRow, setHoverRow] = useState(null);

//   // 🔹 Swap whole line logic
//   function swapRows(rowY1, rowY2) {
//     setWidgets((prev) =>
//       prev.map((w) => {
//         if (w.y === rowY1 || w.y === rowY1 + 1) {
//           return { ...w, y: w.y + (rowY2 - rowY1) };
//         }
//         if (w.y === rowY2 || w.y === rowY2 + 1) {
//           return { ...w, y: w.y - (rowY2 - rowY1) };
//         }
//         return w;
//       })
//     );
//   }

//   return (
//     <div className="p-4 max-w-6xl mx-auto border-2 border-gray-300 bg-slate-100">
//       <DndProvider backend={HTML5Backend}>
//         <div
//           className="
//             grid gap-2 w-full
//             grid-cols-12
//             auto-rows-[60px]
//             sm:auto-rows-[50px]
//             md:auto-rows-[70px]
//             lg:auto-rows-[80px]
//           "
//         >
//           {widgets.map((w) => (
//             <DraggableWidget
//               key={w.id}
//               widget={w}
//               widgets={widgets}
//               setWidgets={setWidgets}
//               setHoverRow={setHoverRow}   // ✅ pass setter
//               hoverRow={hoverRow}         // ✅ pass active row
//               swapRows={swapRows}         // ✅ allow row swap
//             />
//           ))}
//         </div>
//       </DndProvider>
//     </div>
//   );
// }
