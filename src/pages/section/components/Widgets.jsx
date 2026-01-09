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
} from "anarock-widgets";

// import Community from "./widgets/overview/components/Community";
// import Engagement from "./widgets/overview/components/Engagement";
// import Facilities from "./widgets/overview/components/Facilities";
// import FinanceSummary from "./widgets/overview/components/FinanceSummary";
// import GateUpdates from "./widgets/overview/components/GateUpdates";
// import Helpdesk from "./widgets/overview/components/Helpdesk";

// import UnitStatus from "./widgets/community/component/UnitStatusPie";
// import OccupancyOverview from "./widgets/community/component/OccupancyOverviewCard";
// import ResidentOverview from "./widgets/community/component/ResidentOverviewCard";
// import MoveInOutTrends from "./widgets/community/component/MoveInOutTrendsCard";
// import BlockWiseOccupancy from "./widgets/community/component/BlockWiseOccupancyCard";

// import Accounting from "./widgets/financials/component/AccountingCard";
// import ExpenseCategories from "./widgets/financials/component/ExpenseCategories";
// import CashBankBalance from "./widgets/financials/component/CashBankBalance";
// import DuesAgeing from "./widgets/financials/component/DuesAgeing";
// import Budgets from "./widgets/financials/component/Budgets";

// import NoticeBoardStatus from "./widgets/engagement/component/NoticeBoardStatus";
// import EventsUtilisation from "./widgets/engagement/component/EventsUtilisation";
// import SingleStats from "./widgets/engagement/component/SingleStats";

// import AssetValueBreakdown from "./widgets/facilities/component/AssetValueBreakdown";
// import RevenuebyCategory from "./widgets/facilities/component/RevenuebyCategory";

// import GuardPatrols from "./widgets/gate-and-security/component/GuardPatrols";
// import HourlyTrafficFlow from "./widgets/gate-and-security/component/HourlyTrafficFlow";
// import IncidentReports from "./widgets/gate-and-security/component/IncidentReports";
// import StaffAttendance from "./widgets/gate-and-security/component/StaffAttendance";

// import Complaints from "./widgets/helpdesk/component/Complaints";
// import RequestBox from "./widgets/helpdesk/component/RequestBox";
// import ComplaintsByLevel from "./widgets/helpdesk/component/ComplaintsbyLevel";

import { pxToGridUnits } from "../../../utils";

export const AllWidgetMapping = {
  // ============ OVERVIEW ============ //
  OVERVIEW_FACILITIES: {
    component: Facilities,
    minWidth: 2,
    // minHeight: 15.7,
    minHeight: pxToGridUnits(305),
    position: [2, 0, 2, 2],
    data: {
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
  },
  OVERVIEW_COMMUNITY: {
    component: Community,
    minWidth: 2,
    minHeight: pxToGridUnits(184),
    position: [2, 0, 2, 2],
    data: {
      thisMonthMoveIns: 25,
      thisMonthMoveOuts: 15,
      moveInPercentChange: 12,
      moveOutPercentChange: -5,
      lastMonthMoveIns: 20,
      lastMonthMoveOuts: 18,
    },
  },
  OVERVIEW_ENGAGEMENT: {
    component: Engagement,
    minWidth: 2,
    minHeight: pxToGridUnits(303),
    position: [4, 4, 2, 2],
    data: {
      total_notices: 15,
      total_topics: 30,
      total_polls: 12,
      total_surveys: 8,
    },
  },
  OVERVIEW_GATE_UPDATE: {
    component: GateUpdates,
    minWidth: 2,
    minHeight: pxToGridUnits(251),
    position: [0, 6, 2, 2],
    data: {
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
  },
  OVERVIEW_INCOME_EXPENDITURE: {
    component: FinanceSummary,
    minWidth: 2,
    minHeight: pxToGridUnits(232),
    position: [0, 0, 2, 2],
    data: {
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
  },
  OVERVIEW_HELPDESK: {
    component: Helpdesk,
    minWidth: 2,
    minHeight: pxToGridUnits(184),
    position: [6, 0, 2, 2],
    data: {
      openComplaints: 5,
      resolvedComplaints: 15,
      pendingRequests: 3,
    },
  },

  // ============ COMMUNITY ============ //
  COMMUNITY_UNIT_STATUS: {
    component: UnitStatus,
    minWidth: 2,
    minHeight: pxToGridUnits(238),
    position: [0, 2, 2, 2],
  },
  COMMUNITY_OCCUPANCY_OVERVIEW: {
    component: OccupancyOverview,
    minWidth: 2,
    minHeight: pxToGridUnits(238),
    position: [2, 2, 2, 2],
  },
  COMMUNITY_RESIDENT_OVERVIEW: {
    component: ResidentOverview,
    minWidth: 2,
    minHeight: pxToGridUnits(238),
    position: [4, 2, 2, 2],
  },
  COMMUNITY_MOVEIN_OUT_TRENDS: {
    component: MoveInOutTrends,
    minWidth: 3,
    minHeight: pxToGridUnits(360),
    position: [6, 2, 2, 2],
  },
  COMMUNITY_BLOCK_WISE_OCCUPANCY: {
    component: BlockWiseOccupancy,
    minWidth: 3,
    minHeight: pxToGridUnits(360),
    position: [8, 2, 2, 2],
  },

  // ============ FINANCIAL ============ //
  FINANCIALS_ACCOUNTING: {
    component: Accounting,
    minWidth: 4,
    minHeight: pxToGridUnits(523),
    position: [0, 4, 2, 2],
  },
  FINANCIALS_EXPENSECATEGORIES: {
    component: ExpenseCategories,
    minWidth: 2,
    minHeight: pxToGridUnits(523),
    position: [2, 4, 2, 2],
  },
  FINANCIALS_CASH_AND_BANK_BALANCE: {
    component: CashBankBalance,
    minWidth: 2,
    minHeight: pxToGridUnits(362),
    position: [4, 4, 2, 2],
  },
  FINANCIALS_DUES_AGEING: {
    component: DuesAgeing,
    minWidth: 4,
    minHeight: pxToGridUnits(362),
    position: [6, 4, 2, 2],
  },
  FINANCIALS_BUDGET_VS_ACTUALS: {
    component: Budgets,
    minWidth: 6,
    minHeight: pxToGridUnits(362),
    position: [8, 2, 2, 2],
  },

  // ============ ENGAGEMENT ============ //
  ENGAGEMENT_NOTICE: {
    component: SingleStats,
    minWidth: 2,
    minHeight: pxToGridUnits(132),
    position: [0, 6, 2, 2],
    data: {
      title: "Notice",
    },
  },
  ENGAGEMENT_POST: {
    component: SingleStats,
    minWidth: 2,
    minHeight: pxToGridUnits(132),
    position: [2, 6, 2, 2],
    data: {
      title: "Post",
    },
  },
  ENGAGEMENT_POLL: {
    component: SingleStats,
    minWidth: 2,
    minHeight: pxToGridUnits(132),
    position: [4, 6, 2, 2],
    data: {
      title: "Poll",
    },
  },
  ENGAGEMENT_SURVEY: {
    component: SingleStats,
    minWidth: 2,
    minHeight: pxToGridUnits(132),
    position: [6, 6, 2, 2],
    data: {
      title: "Survey",
    },
  },
  ENGAGEMENT_NOTICE_BOARD_STATUS: {
    component: NoticeBoardStatus,
    minWidth: 2,
    minHeight: pxToGridUnits(360),
    position: [8, 6, 2, 2],
  },
  ENGAGEMENT_EVENTS_UTILISATION: {
    component: EventsUtilisation,
    minWidth: 2,
    minHeight: pxToGridUnits(360),
    position: [10, 6, 2, 2],
  },

  // ============ FACILITIES ============ //
  FACILITIES_TOTAL_BOOKINGS: {
    component: SingleStats,
    minWidth: 1.5,
    minHeight: pxToGridUnits(132),
    position: [0, 8, 2, 2],
    data: {
      title: "Total Bookings",
    },
  },
  FACILITIES_UTILISATION_RATE: {
    component: SingleStats,
    minWidth: 1.5,
    minHeight: pxToGridUnits(132),
    position: [2, 8, 2, 2],
    data: {
      title: "Utilisation Rate",
    },
  },
  FACILITIES_REVENUE: {
    component: SingleStats,
    minWidth: 1.5,
    minHeight: pxToGridUnits(132),
    position: [4, 8, 2, 2],
    data: {
      title: "Facilities Revenue",
    },
  },
  FACILITIES_PENDING_DUES: {
    component: SingleStats,
    minWidth: 1.5,
    minHeight: pxToGridUnits(132),
    position: [6, 8, 2, 2],
    data: {
      title: "Pending Dues",
    },
  },
  FACILITIES_ASSET_VALUE_BREAKDOWN: {
    component: AssetValueBreakdown,
    minWidth: 2,
    minHeight: pxToGridUnits(362),
    position: [8, 8, 2, 2],
  },
  FACILITIES_REVENUE_BY_CATEGORY: {
    component: RevenuebyCategory,
    minWidth: 2,
    minHeight: pxToGridUnits(362),
    position: [10, 8, 2, 2],
  },

  // ============ GATE & SECURITY ============ //
  GATE_AND_SECURITY_TOTAL_VISITORS: {
    component: SingleStats,
    minWidth: 1.5,
    minHeight: pxToGridUnits(132),
    position: [0, 10, 2, 2],
    data: {
      title: "Total Visitors",
    },
  },
  GATE_AND_SECURITY_ACTIVE_INCIDENTS: {
    component: SingleStats,
    minWidth: 1.5,
    minHeight: pxToGridUnits(132),
    position: [2, 10, 2, 2],
    data: {
      title: "Active Incidents",
    },
  },
  GATE_AND_SECURITY_MISSING_PATROLS: {
    component: SingleStats,
    minWidth: 1.5,
    minHeight: pxToGridUnits(132),
    position: [4, 10, 2, 2],
    data: {
      title: "Missing Patrols",
    },
  },
  GATE_AND_SECURITY_PARKING_USAGE: {
    component: SingleStats,
    minWidth: 1.5,
    minHeight: pxToGridUnits(132),
    position: [6, 10, 2, 2],
    data: {
      title: "Parking Usage",
    },
  },
  GATE_AND_SECURITY_GUARDPATROLS: {
    component: GuardPatrols,
    minWidth: 2,
    minHeight: pxToGridUnits(362),
    position: [8, 10, 2, 2],
  },
  GATE_AND_SECURITY_HOURLY_TRAFFIC_FLOW: {
    component: HourlyTrafficFlow,
    minWidth: 4,
    minHeight: pxToGridUnits(362),
    position: [10, 10, 2, 2],
  },
  GATE_AND_SECURITY_INCIDENTREPORTS: {
    component: IncidentReports,
    minWidth: 3,
    minHeight: pxToGridUnits(362),
    position: [12, 10, 2, 2],
  },
  GATE_AND_SECURITY_STAFFATTENDANCE: {
    component: StaffAttendance,
    minWidth: 3,
    minHeight: pxToGridUnits(362),
    position: [14, 10, 2, 2],
  },

  // ============ HELPDESK ============ //
  HELPDESK_OPEN_COMPLAINTS: {
    component: SingleStats,
    minWidth: 1.5,
    minHeight: pxToGridUnits(132),
    position: [0, 12, 2, 2],
    data: {
      title: "Complaints",
    },
  },
  HELPDESK_PENDING_REQUESTS: {
    component: SingleStats,
    minWidth: 1.5,
    minHeight: pxToGridUnits(132),
    position: [2, 12, 2, 2],
    data: {
      title: "Pending Requests",
    },
  },
  HELPDESK_AVG_RESPONSE_TIME: {
    component: SingleStats,
    minWidth: 1.5,
    minHeight: pxToGridUnits(132),
    position: [4, 12, 2, 2],
    data: {
      title: "Avg Response Time",
    },
  },
  HELPDESK_RESOLUTION_RATE: {
    component: SingleStats,
    minWidth: 1.5,
    minHeight: pxToGridUnits(132),
    position: [6, 12, 2, 2],
    data: {
      title: "Resolution Rate",
    },
  },
  HELPDESK_COMPLAINTS: {
    component: Complaints,
    minWidth: 2.4,
    minHeight: pxToGridUnits(362),
    position: [8, 12, 2, 2],
  },
  HELPDESK_REQUESTBOX: {
    component: RequestBox,
    minWidth: 1.8,
    minHeight: pxToGridUnits(362),
    position: [10, 12, 2, 2],
  },
  HELPDESK_COMPLAINTS_BY_LEVEL: {
    component: ComplaintsByLevel,
    minWidth: 1.8,
    minHeight: pxToGridUnits(362),
    position: [12, 12, 2, 2],
  },
};
