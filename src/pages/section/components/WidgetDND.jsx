import React, { useState, useCallback } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Community,
  Engagement,
  Facilities,
  FinanceSummary,
  GateUpdates,
  Helpdesk,
  UnitStatus,
  OccupancyOverview,
  ResidentOverview,
  MoveInOutTrends,
  BlockWiseOccupancy,
  Accounting,
  Budgets,
  CashBankBalance,
  DuesAgeing,
  ExpenseCategories,
  IncomeExpenditure,
  AssetValueBreakdown,
  RevenuebyCategory,
  StatsGrid as FacilitiesStatsGrid,
  GuardPatrols,
  HourlyTrafficFlow,
  IncidentReports,
  StaffAttendance,
  GateAndSecurityStatsGrid,
  Complaints,
  ComplaintsByLevel,
  RequestBox,
  HelpdeskStatsGrid,
  EventsUtilisation,
  NoticeBoardStatus,
  SingleStats,
  EngagementStatsGrid,
} from "@anarock/widgets";

// DnD Item Types
const WIDGET = "WIDGET";

// Widget mapping based on key_name
const widgetComponents = {
  // Overview widgets
  OVERVIEW_FACILITIES: Facilities,
  OVERVIEW_COMMUNITY: Community,
  OVERVIEW_ENGAGEMENT: Engagement,
  OVERVIEW_GATE_UPDATE: GateUpdates,
  OVERVIEW_INCOME_EXPENDITURE: FinanceSummary,
  OVERVIEW_HELPDESK: Helpdesk,

  // Community/Resident widgets
  COMMUNITY_UNIT_STATUS: UnitStatus,
  COMMUNITY_OCCUPANCY_OVERVIEW: OccupancyOverview,
  COMMUNITY_RESIDENT_OVERVIEW: ResidentOverview,
  COMMUNITY_MOVEIN_OUT_TRENDS: MoveInOutTrends,
  COMMUNITY_BLOCK_WISE_OCCUPANCY: BlockWiseOccupancy,

  // Financial widgets
  FINANCIALS_ACCOUNTING: Accounting,
  FINANCIALS_BUDGET_VS_ACTUALS: Budgets,
  FINANCIALS_CASH_AND_BANK_BALANCE: CashBankBalance,
  FINANCIALS_DUES_AGEING: DuesAgeing,
  FINANCIALS_EXPENSECATEGORIES: ExpenseCategories,
  FACILITIES_ASSET_VALUE_BREAKDOWN: AssetValueBreakdown,
  FACILITIES_REVENUE_BY_CATEGORY: RevenuebyCategory,

  // Engagement widgets
  ENGAGEMENT_NOTICE: SingleStats,
  ENGAGEMENT_POST: SingleStats,
  ENGAGEMENT_POLL: SingleStats,
  ENGAGEMENT_SURVEY: SingleStats,
  ENGAGEMENT_NOTICE_BOARD_STATUS: NoticeBoardStatus,
  ENGAGEMENT_EVENTS_UTILISATION: EventsUtilisation,

  // Facility widgets
  FACILITIES_TOTAL_BOOKINGS: SingleStats,
  FACILITIES_UTILISATION_RATE: SingleStats,
  FACILITIES_REVENUE: SingleStats,
  FACILITIES_PENDING_DUES: SingleStats,

  // Gate/Security widgets
  GATE_AND_SECURITY_TOTAL_VISITORS: SingleStats,
  GATE_AND_SECURITY_ACTIVE_INCIDENTS: SingleStats,
  GATE_AND_SECURITY_MISSING_PATROLS: SingleStats,
  GATE_AND_SECURITY_PARKING_USAGE: SingleStats,
  GATE_AND_SECURITY_GUARDPATROLS: GuardPatrols,
  GATE_AND_SECURITY_HOURLY_TRAFFIC_FLOW: HourlyTrafficFlow,
  GATE_AND_SECURITY_INCIDENTREPORTS: IncidentReports,
  GATE_AND_SECURITY_STAFFATTENDANCE: StaffAttendance,

  // Helpdesk widgets
  HELPDESK_OPEN_COMPLAINTS: SingleStats,
  HELPDESK_PENDING_REQUESTS: SingleStats,
  HELPDESK_AVG_RESPONSE_TIME: SingleStats,
  HELPDESK_RESOLUTION_RATE: SingleStats,
  HELPDESK_COMPLAINTS: Complaints,
  HELPDESK_REQUESTBOX: RequestBox,
  HELPDESK_COMPLAINTS_BY_LEVEL: ComplaintsByLevel,
};

const widgetDataMap = {
  OVERVIEW_INCOME_EXPENDITURE: {
    incomeSummary: {
      opening_balance: 50000,
      income: 120000,
      collection: 90000,
      closing_balance: 80000,
    },
    expenditureSummary: {
      opening_balance: 40000,
      expenditure: 70000,
      payment: 50000,
      outstanding: 20000,
    },
  },
  OVERVIEW_FACILITIES: {
    totalBookings: 45,
    totalSlots: 60,
    utilizationRate: 75.5,
    slots: [
      {
        slot_start_time: "08:00",
        slot_end_time: "09:00",
        slot_bookings: 5,
        total_slots: 8,
      },
      {
        slot_start_time: "09:00",
        slot_end_time: "10:00",
        slot_bookings: 8,
        total_slots: 8,
      },
      {
        slot_start_time: "10:00",
        slot_end_time: "11:00",
        slot_bookings: 10,
        total_slots: 8,
      },
      {
        slot_start_time: "11:00",
        slot_end_time: "12:00",
        slot_bookings: 7,
        total_slots: 8,
      },
      {
        slot_start_time: "12:00",
        slot_end_time: "13:00",
        slot_bookings: 15,
        total_slots: 8,
      },
    ],
  },
  OVERVIEW_HELPDESK: {
    openComplaints: 5,
    resolvedComplaints: 15,
    pendingRequests: 3,
  },
  OVERVIEW_GATE_UPDATE: {
    summary: {
      activeWalkins: { visitor_in: 12, total_pass: 20 },
      preApprovedCheckins: {
        expected_pass_scanned: 8,
        total_expected_pass: 15,
      },
    },
    chart: [
      { hour: 8, walkins: 5, preApproved: 3 },
      { hour: 9, walkins: 8, preApproved: 5 },
      { hour: 10, walkins: 12, preApproved: 7 },
      { hour: 11, walkins: 15, preApproved: 9 },
      { hour: 12, walkins: 10, preApproved: 6 },
      { hour: 13, walkins: 6, preApproved: 4 },
      { hour: 14, walkins: 9, preApproved: 5 },
      { hour: 15, walkins: 14, preApproved: 10 },
      { hour: 16, walkins: 11, preApproved: 8 },
      { hour: 17, walkins: 7, preApproved: 5 },
    ],
  },
  OVERVIEW_COMMUNITY: {
    thisMonthMoveIns: 25,
    thisMonthMoveOuts: 15,
    moveInPercentChange: 12,
    moveOutPercentChange: -5,
    lastMonthMoveIns: 20,
    lastMonthMoveOuts: 18,
  },
  OVERVIEW_ENGAGEMENT: {
    total_notices: 15,
    total_topics: 30,
    total_polls: 12,
    total_surveys: 8,
  },
};

// Convert your position format to grid format
const convertToGridPosition = (widget) => {
  const [x, y, w, h] = widget.position || [0, 0, 2, 2];
  return {
    ...widget,
    x,
    y,
    w,
    h,
    containerId: widget.container_id || widget.key_name,
    groupId: widget.group_id || null,
    id: widget.widget_id,
  };
};

// Convert grid position back to your format
const convertFromGridPosition = (widget) => {
  return {
    widget_id: widget.id,
    widget_name: widget.widget_name || "",
    container_id: widget.containerId,
    key_name: widget.key_name,
    title: widget.title,
    is_active: 1,
    position: [widget.x, widget.y, widget.w, widget.h],
    group_id: widget.groupId,
    data: widget.data,
    config: widget.config,
    props: widget.props,
  };
};

// Draggable Widget Component with your logic
const DraggableWidget = ({ widget, widgets, setWidgets }) => {
  const { containerId, groupId } = widget;

  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: WIDGET,
      item: { id: widget.id, containerId, groupId },
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    }),
    [widget]
  );

  const [, dropRef] = useDrop(
    () => ({
      accept: WIDGET,
      drop: (item) => {
        if (!item) return;

        const draggedWidgets = widgets.filter(
          (w) => w.containerId === item.containerId
        );
        const targetWidgets = widgets.filter(
          (w) => w.containerId === widget.containerId
        );

        // --- Internal swap inside same group ---
        if (
          item.containerId === widget.containerId &&
          item.groupId &&
          item.groupId === widget.groupId
        ) {
          setWidgets((prev) => {
            const updated = [...prev];
            const draggedIndex = updated.findIndex((w) => w.id === item.id);
            const targetIndex = updated.findIndex((w) => w.id === widget.id);
            const temp = {
              x: updated[draggedIndex].x,
              y: updated[draggedIndex].y,
            };
            updated[draggedIndex] = {
              ...updated[draggedIndex],
              x: updated[targetIndex].x,
              y: updated[targetIndex].y,
            };
            updated[targetIndex] = {
              ...updated[targetIndex],
              x: temp.x,
              y: temp.y,
            };
            return updated;
          });
          return;
        }

        // --- Internal container swap (vertical) ---
        if (
          item.containerId === widget.containerId &&
          item.groupId !== widget.groupId
        ) {
          // dragged group inside container
          const draggedGroup = widgets.filter(
            (w) =>
              w.containerId === widget.containerId && w.groupId === item.groupId
          );
          const targetGroup = widgets.filter(
            (w) =>
              w.containerId === widget.containerId &&
              w.groupId === widget.groupId
          );

          const draggedMinY = Math.min(...draggedGroup.map((w) => w.y));
          const targetMinY = Math.min(...targetGroup.map((w) => w.y));

          setWidgets((prev) =>
            prev.map((w) => {
              if (draggedGroup.find((dw) => dw.id === w.id)) {
                return { ...w, y: w.y - draggedMinY + targetMinY };
              }
              if (targetGroup.find((tw) => tw.id === w.id)) {
                return { ...w, y: w.y - targetMinY + draggedMinY };
              }
              return w;
            })
          );
          return;
        }

        // --- Full container swap for different containers ---
        const draggedMinX = Math.min(...draggedWidgets.map((w) => w.x));
        const draggedMinY = Math.min(...draggedWidgets.map((w) => w.y));
        const targetMinX = Math.min(...targetWidgets.map((w) => w.x));
        const targetMinY = Math.min(...targetWidgets.map((w) => w.y));

        setWidgets((prev) =>
          prev.map((w) => {
            if (draggedWidgets.find((dw) => dw.id === w.id)) {
              const xOffset = w.x - draggedMinX;
              const yOffset = w.y - draggedMinY;
              return { ...w, x: targetMinX + xOffset, y: targetMinY + yOffset };
            }
            if (targetWidgets.find((tw) => tw.id === w.id)) {
              const xOffset = w.x - targetMinX;
              const yOffset = w.y - targetMinY;
              return {
                ...w,
                x: draggedMinX + xOffset,
                y: draggedMinY + yOffset,
              };
            }
            return w;
          })
        );
      },
    }),
    [widget, widgets]
  );

  const isGrouped = widgets.some(
    (w) => w.containerId === containerId && w.id !== widget.id
  );

  // Get the widget component
  const WidgetComponent = widgetComponents[widget.containerId];
  const widgetData = widgetDataMap[widget.containerId] || {};

  const renderWidget = () => {
    if (!WidgetComponent) {
      return (
        <div className="h-full p-4 flex flex-col bg-white rounded-xl border border-gray-200">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-base font-medium text-slate-800">
                {widget.title || widget.widget_name}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Key: {widget.key_name}
              </p>
            </div>
            <div className="text-xs text-slate-500">
              #{widget.x}/{widget.y}
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <p className="text-sm text-slate-400">Widget Preview</p>
          </div>
        </div>
      );
    }

    return (
      <div className="h-full w-full relative bg-white !border-[0.5px] !border-[#EBEBEB] !rounded-xl !shadow-[0_0_12px_0_#EAF2FF]">
        <WidgetComponent
          data={widgetData}
          config={widget.config || {}}
          {...(widget.props || {})}
        />
      </div>
    );
  };

  return (
    <div
      ref={(node) => dragRef(dropRef(node))}
      className={`flex flex-col rounded-lg transition-all duration-200 ${
        isDragging ? "opacity-50 scale-105 z-50" : "hover:scale-[1.02]"
      }`}
      style={{
        gridColumn: `${widget.x + 1} / span ${widget.w}`,
        gridRow: `${widget.y + 1} / span ${widget.h}`,
        cursor: isDragging ? "grabbing" : "grab",
      }}
    >
      {/* Drag Handle for Grouped Widgets */}
      {isGrouped && (
        <div className="bg-slate-700 text-white text-xs w-full text-center cursor-move p-1 rounded-t-lg hover:bg-slate-600 transition-colors">
          ⇕ {widget.title || widget.widget_name}{" "}
          {groupId ? `- Group ${groupId}` : ""}
        </div>
      )}

      {/* Widget Content */}
      <div
        className={`w-full h-full flex items-center justify-center relative ${
          !isGrouped ? "rounded-lg" : "rounded-b-lg"
        }`}
      >
        {/* Drag indicator for non-grouped widgets */}
        {!isGrouped && (
          <div className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm rounded-md p-1 shadow-sm border z-10">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="text-gray-600"
            >
              <circle cx="9" cy="5" r="1" fill="currentColor" />
              <circle cx="15" cy="5" r="1" fill="currentColor" />
              <circle cx="9" cy="12" r="1" fill="currentColor" />
              <circle cx="15" cy="12" r="1" fill="currentColor" />
              <circle cx="9" cy="19" r="1" fill="currentColor" />
              <circle cx="15" cy="19" r="1" fill="currentColor" />
            </svg>
          </div>
        )}
        {renderWidget()}
      </div>
    </div>
  );
};

export default function WidgetGridDND({
  value,
  onChange,
  data,
  widgetPositions,
  setWidgetPositions,
}) {
  const effectiveData = value?.length ? value : data;

  // Convert your widget format to grid format
  const [gridWidgets, setGridWidgets] = useState(
    () => effectiveData?.map(convertToGridPosition) || []
  );

  // Handle widget updates and convert back to your format
  const handleWidgetsChange = useCallback(
    (newGridWidgets) => {
      setGridWidgets(newGridWidgets);

      const convertedWidgets = newGridWidgets.map(convertFromGridPosition);
      setWidgetPositions?.(convertedWidgets);
      onChange?.(convertedWidgets);
    },
    [onChange, setWidgetPositions]
  );

  // Update grid widgets when external data changes
  React.useEffect(() => {
    if (effectiveData) {
      setGridWidgets(effectiveData.map(convertToGridPosition));
    }
  }, [effectiveData]);

  console.log(gridWidgets, "grid widgets data");

  return (
    <div className="p-4">
      <DndProvider backend={HTML5Backend}>
        <div
          className="
            grid gap-2 w-full
            grid-cols-6
            auto-rows-[120px] 
            sm:auto-rows-[100px]
            md:auto-rows-[120px]
            lg:auto-rows-[140px]
          "
        >
          {gridWidgets.map((widget) => (
            <DraggableWidget
              key={widget.id}
              widget={widget}
              widgets={gridWidgets}
              setWidgets={handleWidgetsChange}
            />
          ))}
        </div>
      </DndProvider>
    </div>
  );
}

// Sample data to test the component
const sampleWidgets = [
  {
    widget_id: "d94e5bbe-8fb3-11f0-a613-0277871623b0",
    widget_name: "Income",
    key_name: "financial",
    container_id: "OVERVIEW_INCOME_EXPENDITURE",
    title: "Income",
    is_active: 1,
    position: [0, 0, 2, 2],
  },
  {
    widget_id: "d94e5c8a-8fb3-11f0-a613-0277871623b0",
    key_name: "facility",
    container_id: "OVERVIEW_FACILITIES",
    title: "Facilities",
    is_active: 1,
    position: [2, 0, 2, 2],
  },
  {
    widget_id: "d94e5a87-8fb3-11f0-a613-0277871623b0",
    key_name: "complaints",
    container_id: "OVERVIEW_HELPDESK",
    title: "Helpdesk",
    is_active: 1,
    position: [4, 0, 2, 2],
  },
  {
    widget_id: "d94e5b35-8fb3-11f0-a613-0277871623b0",
    key_name: "gate",
    container_id: "OVERVIEW_GATE_UPDATE",
    title: "Gate Updates",
    is_active: 1,
    position: [0, 2, 2, 2],
  },
  {
    widget_id: "d94e5969-8fb3-11f0-a613-0277871623b0",
    key_name: "community",
    container_id: "OVERVIEW_COMMUNITY",
    title: "Community",
    is_active: 1,
    position: [2, 2, 2, 2],
  },
  {
    widget_id: "d94e56c6-8fb3-11f0-a613-0277871623b0",
    key_name: "engagement",
    container_id: "OVERVIEW_ENGAGEMENT",
    title: "Engagement",
    is_active: 1,
    position: [4, 2, 2, 2],
  },
];

// export default function WidgetGridWithCustomDnD() {
//   const [widgetPositions, setWidgetPositions] = useState([]);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="mb-6 p-4">
//         <h1 className="text-2xl font-bold text-gray-800">Widget Dashboard</h1>
//         <p className="text-gray-600">Drag and drop widgets to rearrange them</p>
//       </div>

//       <WidgetGridDND
//         data={sampleWidgets}
//         widgetPositions={widgetPositions}
//         setWidgetPositions={setWidgetPositions}
//         onChange={(widgets) => {
//           console.log('Widgets updated:', widgets);
//         }}
//       />
//     </div>
//   );
// }
