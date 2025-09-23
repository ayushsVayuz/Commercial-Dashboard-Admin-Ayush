import { WidthProvider, Responsive } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
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
import { dummyDashboardData } from "./Data";


const widgets = [
  {
    widget_id: "d94e5bbe-8fb3-11f0-a613-0277871623b0",
    widget_name: "Income",
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
    position: [4, 0, 2, 2],
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
    position: [4, 2, 2, 2],
  },
];

const ResponsiveGridLayout = WidthProvider(Responsive);

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

  // Fallback
  // DEFAULT: Nowidget,
};

const widgetMinWidth = {
  OVERVIEW_FACILITIES: 2,
  OVERVIEW_COMMUNITY: 2,
  OVERVIEW_ENGAGEMENT: 2,
  OVERVIEW_GATE_UPDATE: 2,
  OVERVIEW_INCOME_EXPENDITURE: 2,
  OVERVIEW_HELPDESK: 2,

  // COMMUNITY_UNIT_STATUS: 10,
  // COMMUNITY_OCCUPANCY_OVERVIEW: 10,
  // COMMUNITY_RESIDENT_OVERVIEW: 10,
  // COMMUNITY_MOVEIN_OUT_TRENDS: 10,
  // COMMUNITY_BLOCK_WISE_OCCUPANCY: 10,

  // FINANCIALS_ACCOUNTING: 25,
  // FINANCIALS_EXPENSECATEGORIES: 25,
  // FINANCIALS_CASH_AND_BANK_BALANCE: 20,
  // FINANCIALS_DUES_AGEING: 20,
  // FINANCIALS_BUDGET_VS_ACTUALS: 20,

  // ENGAGEMENT_NOTICE: 8,
  // ENGAGEMENT_POST: 8,
  // ENGAGEMENT_POLL: 8,
  // ENGAGEMENT_SURVEY: 8,
  // ENGAGEMENT_NOTICE_BOARD_STATUS: 13,
  // ENGAGEMENT_EVENTS_UTILISATION: 13,

  // FACILITIES_TOTAL_BOOKINGS: 8,
  // FACILITIES_UTILISATION_RATE: 8,
  // FACILITIES_REVENUE: 8,
  // FACILITIES_PENDING_DUES: 8,
  // FACILITIES_ASSET_VALUE_BREAKDOWN: 15,
  // FACILITIES_REVENUE_BY_CATEGORY: 15,

  // GATE_AND_SECURITY_TOTAL_VISITORS: 8,
  // GATE_AND_SECURITY_ACTIVE_INCIDENTS: 8,
  // GATE_AND_SECURITY_MISSING_PATROLS: 8,
  // GATE_AND_SECURITY_PARKING_USAGE: 8,
  // GATE_AND_SECURITY_GUARDPATROLS: 15,
  // GATE_AND_SECURITY_HOURLY_TRAFFIC_FLOW: 15,
  // GATE_AND_SECURITY_INCIDENTREPORTS: 15,
  // GATE_AND_SECURITY_STAFFATTENDANCE: 15,

  // HELPDESK_OPEN_COMPLAINTS: 8,
  // HELPDESK_PENDING_REQUESTS: 8,
  // HELPDESK_AVG_RESPONSE_TIME: 8,
  // HELPDESK_RESOLUTION_RATE: 8,
  // HELPDESK_COMPLAINTS: 15,
  // HELPDESK_REQUESTBOX: 15,
  // HELPDESK_COMPLAINTS_BY_LEVEL: 15,
};

const widgetMinHeights = {
  OVERVIEW_FACILITIES: 16,
  OVERVIEW_COMMUNITY: 10,
  OVERVIEW_ENGAGEMENT: 14,
  OVERVIEW_GATE_UPDATE: 10,
  OVERVIEW_INCOME_EXPENDITURE: 19,
  OVERVIEW_HELPDESK: 10,

  COMMUNITY_UNIT_STATUS: 10,
  COMMUNITY_OCCUPANCY_OVERVIEW: 10,
  COMMUNITY_RESIDENT_OVERVIEW: 10,
  COMMUNITY_MOVEIN_OUT_TRENDS: 10,
  COMMUNITY_BLOCK_WISE_OCCUPANCY: 10,

  FINANCIALS_ACCOUNTING: 25,
  FINANCIALS_EXPENSECATEGORIES: 25,
  FINANCIALS_CASH_AND_BANK_BALANCE: 20,
  FINANCIALS_DUES_AGEING: 20,
  FINANCIALS_BUDGET_VS_ACTUALS: 20,

  ENGAGEMENT_NOTICE: 8,
  ENGAGEMENT_POST: 8,
  ENGAGEMENT_POLL: 8,
  ENGAGEMENT_SURVEY: 8,
  ENGAGEMENT_NOTICE_BOARD_STATUS: 13,
  ENGAGEMENT_EVENTS_UTILISATION: 13,

  FACILITIES_TOTAL_BOOKINGS: 8,
  FACILITIES_UTILISATION_RATE: 8,
  FACILITIES_REVENUE: 8,
  FACILITIES_PENDING_DUES: 8,
  FACILITIES_ASSET_VALUE_BREAKDOWN: 15,
  FACILITIES_REVENUE_BY_CATEGORY: 15,

  GATE_AND_SECURITY_TOTAL_VISITORS: 8,
  GATE_AND_SECURITY_ACTIVE_INCIDENTS: 8,
  GATE_AND_SECURITY_MISSING_PATROLS: 8,
  GATE_AND_SECURITY_PARKING_USAGE: 8,
  GATE_AND_SECURITY_GUARDPATROLS: 15,
  GATE_AND_SECURITY_HOURLY_TRAFFIC_FLOW: 15,
  GATE_AND_SECURITY_INCIDENTREPORTS: 15,
  GATE_AND_SECURITY_STAFFATTENDANCE: 15,

  HELPDESK_OPEN_COMPLAINTS: 8,
  HELPDESK_PENDING_REQUESTS: 8,
  HELPDESK_AVG_RESPONSE_TIME: 8,
  HELPDESK_RESOLUTION_RATE: 8,
  HELPDESK_COMPLAINTS: 15,
  HELPDESK_REQUESTBOX: 15,
  HELPDESK_COMPLAINTS_BY_LEVEL: 15,
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

export default function WidgetGrid({
  value,
  onChange,
  data,
  isResizable = true,
  isDraggable = true,
  widgetPositions,
  setWidgetPositions,
}) {
  // generate layout for grid
  function makeLayout(items) {
    return items?.map((w) => {
      const [x, y, wth, h] = w.position || [0, 0, 2, 2];
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

  // Use fewer columns for xl breakpoint to make widgets larger
  const layouts = {
    xl: makeLayout(effectiveData),
    lg: makeLayout(effectiveData),
    md: makeLayout(effectiveData),
    sm: makeLayout(effectiveData),
  };

  const handleLayoutChange = (currentLayout) => {
    const updated = currentLayout.map((l) => {
      const matchedWidget = data?.find((item) => item?.widget_id == l?.i);
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

  console.log(data, "payload in section add");

  const renderWidget = (item) => {
    // Get the component based on key_name
    const WidgetComponent = widgetComponents[item.container_id];

    if (!WidgetComponent) {
      // Fallback to placeholder if widget component not found
      return renderPlaceholderCard(item);
    }

    return (
      <div className="h-full w-full relative bg-white !border-[0.5px] !border-[#EBEBEB] !rounded-xl !shadow-[0_0_12px_0_#EAF2FF]">
        <WidgetComponent
          data={item.data || {}}
          config={item.config || {}}
          {...(item.props || {})}
        />
      </div>
    );
  };

  const renderPlaceholderCard = (item) => (
    <div
      className={`h-full p-4 relative bg-white !border-[0.5px] !border-[#EBEBEB] !rounded-xl !shadow-[0_0_12px_0_#EAF2FF] flex flex-col`}
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
    <div className="min-h-[370px]">
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ xl: 1300, lg: 1200, md: 996, sm: 768 }}
        cols={{ xl: 6, lg: 6, md: 6, sm: 6 }}
        rowHeight={10}
        isResizable={true}
        isDraggable={isDraggable}
        draggableHandle={".drag-handle"}
        measureBeforeMount={false}
        useCSSTransforms={true}
        onLayoutChange={handleLayoutChange}
        resizeHandles={["n", "s", "e", "w"]}
        margin={[10, 10]}
      >
        {effectiveData?.map((item) => {
          const minWidth = widgetMinWidth[item.container_id] || 2;
          const minHeight = widgetMinHeights[item.container_id] || 2;
          const actualWidth =
            item.position[2] < minWidth ? minWidth : item.position[2];
          const actualHeight =
            item.position[3] < minHeight ? minHeight : item.position[3];

          const widgetData = widgetDataMap[item.container_id] || {};
          return (
            <div
              key={item.widget_id}
              data-grid={{
                x: item.position[0],
                y: item.position[1],
                w: actualWidth,
                h: actualHeight,
              }}
            >
              <div className="h-full flex flex-col">
                <div className="flex-1 drag-handle cursor-move">
                  {renderWidget({ ...item, data: widgetData })}
                </div>
              </div>
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </div>
  );
}
