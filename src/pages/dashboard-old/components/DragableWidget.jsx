import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const WIDGET = "WIDGET";
const GROUP = "GROUP";

// Helper to get the bounding box of a group
const getGroupBounds = (group) => {
  const minX = Math.min(...group.map((w) => w.x));
  const minY = Math.min(...group.map((w) => w.y));
  const maxX = Math.max(...group.map((w) => w.x + w.w - 1));
  const maxY = Math.max(...group.map((w) => w.y + w.h - 1));
  return {
    x: minX,
    y: minY,
    w: maxX - minX + 1,
    h: maxY - minY + 1,
  };
};

export const DraggableWidget = ({
  widget,
  widgets,
  setWidgets,
  children,
  className,
}) => {
  const groupId = widget.groupId ?? widget.id;
  const groupWidgets = widgets.filter((w) => (w.groupId ?? w.id) === groupId);
  const isGrouped = widget.groupId !== undefined;

  // --- Drag entire group ---
  const [{ isDraggingGroup }, groupDragRef] = useDrag(
    () => ({
      type: GROUP,
      item: () => ({
        type: GROUP,
        groupId: groupId,
      }),
      collect: (monitor) => ({
        isDraggingGroup: monitor.isDragging(),
      }),
    }),
    [groupId]
  );

  // --- Drag individual widget ---
  const [{ isDraggingWidget }, widgetDragRef] = useDrag(
    () => ({
      type: WIDGET,
      item: () => ({
        type: WIDGET,
        id: widget.id,
        groupId: widget.groupId,
        widget: widget,
      }),
      collect: (monitor) => ({
        isDraggingWidget: monitor.isDragging(),
      }),
    }),
    [widget]
  );

  // --- Drop target ---
  const [{ isOver }, dropRef] = useDrop(
    () => ({
      accept: [WIDGET, GROUP],
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
      drop: (item, monitor) => {
        console.log("Drop event:", { item, target: widget.id });

        if (!item) return;

        // Handle WIDGET drops
        if (item.type === WIDGET) {
          const sourceWidget = item.widget;
          const targetWidget = widget;

          console.log("Widget drop:", {
            source: sourceWidget.id,
            target: targetWidget.id,
          });

          // Don't drop on self
          if (sourceWidget.id === targetWidget.id) return;

          // Case 1: Both widgets in same group - swap positions
          if (sourceWidget.groupId === targetWidget.groupId) {
            console.log("Same group swap");
            setWidgets((prev) =>
              prev.map((w) => {
                if (w.id === sourceWidget.id) {
                  return { ...w, x: targetWidget.x, y: targetWidget.y };
                }
                if (w.id === targetWidget.id) {
                  return { ...w, x: sourceWidget.x, y: sourceWidget.y };
                }
                return w;
              })
            );
            return;
          }

          // Case 2: Different groups - check size compatibility
          const sourceIsGrouped = sourceWidget.groupId !== undefined;
          const targetIsGrouped = targetWidget.groupId !== undefined;

          if (sourceIsGrouped && targetIsGrouped) {
            // Both are grouped - compare group bounds
            const sourceGroupWidgets = widgets.filter(
              (w) => w.groupId === sourceWidget.groupId
            );
            const targetGroupWidgets = widgets.filter(
              (w) => w.groupId === targetWidget.groupId
            );
            const sourceBounds = getGroupBounds(sourceGroupWidgets);
            const targetBounds = getGroupBounds(targetGroupWidgets);

            if (
              sourceBounds.w !== targetBounds.w ||
              sourceBounds.h !== targetBounds.h
            )
              return;

            // Swap entire groups
            setWidgets((prev) =>
              prev.map((w) => {
                if (w.groupId === sourceWidget.groupId) {
                  return {
                    ...w,
                    x: targetBounds.x + (w.x - sourceBounds.x),
                    y: targetBounds.y + (w.y - sourceBounds.y),
                  };
                }
                if (w.groupId === targetWidget.groupId) {
                  return {
                    ...w,
                    x: sourceBounds.x + (w.x - targetBounds.x),
                    y: sourceBounds.y + (w.y - targetBounds.y),
                  };
                }
                return w;
              })
            );
          } else if (!sourceIsGrouped && !targetIsGrouped) {
            // Both are individual widgets
            if (
              sourceWidget.w !== targetWidget.w ||
              sourceWidget.h !== targetWidget.h
            )
              return;

            setWidgets((prev) =>
              prev.map((w) => {
                if (w.id === sourceWidget.id) {
                  return { ...w, x: targetWidget.x, y: targetWidget.y };
                }
                if (w.id === targetWidget.id) {
                  return { ...w, x: sourceWidget.x, y: sourceWidget.y };
                }
                return w;
              })
            );
          } else {
            // Mixed: one grouped, one individual - compare sizes
            const groupedWidget = sourceIsGrouped ? sourceWidget : targetWidget;
            const individualWidget = sourceIsGrouped
              ? targetWidget
              : sourceWidget;

            const groupWidgets = widgets.filter(
              (w) => w.groupId === groupedWidget.groupId
            );
            const groupBounds = getGroupBounds(groupWidgets);

            if (
              groupBounds.w !== individualWidget.w ||
              groupBounds.h !== individualWidget.h
            )
              return;

            setWidgets((prev) =>
              prev.map((w) => {
                if (w.groupId === groupedWidget.groupId) {
                  return {
                    ...w,
                    x: individualWidget.x + (w.x - groupBounds.x),
                    y: individualWidget.y + (w.y - groupBounds.y),
                  };
                }
                if (w.id === individualWidget.id) {
                  return { ...w, x: groupBounds.x, y: groupBounds.y };
                }
                return w;
              })
            );
          }
        }

        // Handle GROUP drops
        if (item.type === GROUP) {
          const sourceGroupId = item.groupId;
          const targetGroupId = widget.groupId ?? widget.id;

          console.log("Group drop:", { sourceGroupId, targetGroupId });

          if (sourceGroupId === targetGroupId) return;

          const sourceGroup = widgets.filter(
            (w) => (w.groupId ?? w.id) === sourceGroupId
          );
          const targetGroup = widgets.filter(
            (w) => (w.groupId ?? w.id) === targetGroupId
          );

          if (!sourceGroup.length || !targetGroup.length) return;

          const sourceBounds = getGroupBounds(sourceGroup);
          const targetBounds = getGroupBounds(targetGroup);

          // Check size compatibility
          if (
            sourceBounds.w !== targetBounds.w ||
            sourceBounds.h !== targetBounds.h
          )
            return;

          setWidgets((prev) =>
            prev.map((w) => {
              const wGroupId = w.groupId ?? w.id;
              if (wGroupId === sourceGroupId) {
                return {
                  ...w,
                  x: targetBounds.x + (w.x - sourceBounds.x),
                  y: targetBounds.y + (w.y - sourceBounds.y),
                };
              }
              if (wGroupId === targetGroupId) {
                return {
                  ...w,
                  x: sourceBounds.x + (w.x - targetBounds.x),
                  y: sourceBounds.y + (w.y - targetBounds.y),
                };
              }
              return w;
            })
          );
        }
      },
    }),
    [widget, widgets, setWidgets]
  );

  return (
    <div
      ref={dropRef}
      className={`flex flex-col rounded-lg text-white font-bold transition-colors ${
        isDraggingWidget || isDraggingGroup
          ? "bg-slate-400"
          : isOver
          ? "bg-green-500"
          : "bg-blue-500"
      }`}
      style={{
        gridColumn: `${widget.x + 1} / span ${widget.w}`,
        gridRow: `${widget.y + 1} / span ${widget.h}`,
      }}
    >
      {/* Group Drag Handle - only show if widget is part of a group */}
      {isGrouped && (
        <div
          ref={groupDragRef}
          className="bg-slate-700 text-xs w-full text-center cursor-move p-1 rounded-t-lg hover:bg-slate-600"
        >
          ⇕ Group {widget.groupId}
        </div>
      )}

      {/* Widget Content Drag Handle */}
      <div
        ref={widgetDragRef}
        //  className={className}
        className="w-full h-full flex items-center justify-center "
      >
        {/* {children} */}
        {widget.id}
      </div>
    </div>
  );
};
