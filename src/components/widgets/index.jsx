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

// import Nowidget from "../../components/ui/Nowidget";
import axios from "axios";

const widgetMinHeights = {
  OVERVIEW_FACILITIES: 14,
  OVERVIEW_COMMUNITY: 8,
  OVERVIEW_ENGAGEMENT: 14,
  OVERVIEW_GATE_UPDATE: 10,
  OVERVIEW_INCOME_EXPENDITURE: 12,
  OVERVIEW_HELPDESK: 8,

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

const createWidgets = (summaryData, widgetData = {}) => ({
  OVERVIEW_FACILITIES: (
    <Facilities
      facility={summaryData?.["facilities-overview"] || {}}
      {...widgetData}
    />
  ),
  OVERVIEW_COMMUNITY: (
    <Community
      community={summaryData?.["community-overview"] || {}}
      {...widgetData}
    />
  ),
  OVERVIEW_ENGAGEMENT: (
    <Engagement
      engagement={summaryData?.["engagement-overview"] || {}}
      {...widgetData}
    />
  ),
  OVERVIEW_GATE_UPDATE: (
    <GateUpdates gate={summaryData?.["gate-updates"] || {}} {...widgetData} />
  ),
  OVERVIEW_INCOME_EXPENDITURE: (
    <FinanceSummary
      financial={summaryData?.["income-expenditure"] || {}}
      {...widgetData}
    />
  ),
  OVERVIEW_HELPDESK: (
    <Helpdesk
      complaints={summaryData?.["helpdesk-overview"] || {}}
      {...widgetData}
    />
  ),

  COMMUNITY_UNIT_STATUS: <UnitStatus {...widgetData} />,
  COMMUNITY_OCCUPANCY_OVERVIEW: <OccupancyOverview {...widgetData} />,
  COMMUNITY_RESIDENT_OVERVIEW: <ResidentOverview {...widgetData} />,
  COMMUNITY_MOVEIN_OUT_TRENDS: <MoveInOutTrends {...widgetData} />,
  COMMUNITY_BLOCK_WISE_OCCUPANCY: <BlockWiseOccupancy {...widgetData} />,

  FINANCIALS_ACCOUNTING: <Accounting {...widgetData} />,
  FINANCIALS_EXPENSECATEGORIES: <ExpenseCategories {...widgetData} />,
  FINANCIALS_CASH_AND_BANK_BALANCE: <CashBankBalance {...widgetData} />,
  FINANCIALS_DUES_AGEING: <DuesAgeing {...widgetData} />,
  FINANCIALS_BUDGET_VS_ACTUALS: <Budgets {...widgetData} />,

  ENGAGEMENT_NOTICE: <SingleStats data="Notice" {...widgetData} />,
  ENGAGEMENT_POST: <SingleStats data="Post" {...widgetData} />,
  ENGAGEMENT_POLL: <SingleStats data="Poll" {...widgetData} />,
  ENGAGEMENT_SURVEY: <SingleStats data="Survey" {...widgetData} />,
  ENGAGEMENT_NOTICE_BOARD_STATUS: <NoticeBoardStatus {...widgetData} />,
  ENGAGEMENT_EVENTS_UTILISATION: <EventsUtilisation {...widgetData} />,

  FACILITIES_TOTAL_BOOKINGS: (
    <SingleStats data="Total Bookings" {...widgetData} />
  ),
  FACILITIES_UTILISATION_RATE: (
    <SingleStats data="Utilisation Rate" {...widgetData} />
  ),
  FACILITIES_REVENUE: <SingleStats data="Revenue" {...widgetData} />,
  FACILITIES_PENDING_DUES: <SingleStats data="Pending Dues" {...widgetData} />,
  FACILITIES_ASSET_VALUE_BREAKDOWN: <AssetValueBreakdown {...widgetData} />,
  FACILITIES_REVENUE_BY_CATEGORY: <RevenuebyCategory {...widgetData} />,

  GATE_AND_SECURITY_TOTAL_VISITORS: (
    <SingleStats data="Total Visitors" {...widgetData} />
  ),
  GATE_AND_SECURITY_ACTIVE_INCIDENTS: (
    <SingleStats data="Active Incidents" {...widgetData} />
  ),
  GATE_AND_SECURITY_MISSING_PATROLS: (
    <SingleStats data="Missed Patrols" {...widgetData} />
  ),
  GATE_AND_SECURITY_PARKING_USAGE: (
    <SingleStats data="Parking Usage" {...widgetData} />
  ),
  GATE_AND_SECURITY_GUARDPATROLS: <GuardPatrols {...widgetData} />,
  GATE_AND_SECURITY_HOURLY_TRAFFIC_FLOW: (
    <HourlyTrafficFlow {...widgetData} />
  ),
  GATE_AND_SECURITY_INCIDENTREPORTS: <IncidentReports {...widgetData} />,
  GATE_AND_SECURITY_STAFFATTENDANCE: <StaffAttendance {...widgetData} />,

  HELPDESK_OPEN_COMPLAINTS: <SingleStats data="Open Complaints" {...widgetData} />,
  HELPDESK_PENDING_REQUESTS: <SingleStats data="Pending Requests" {...widgetData} />,
  HELPDESK_AVG_RESPONSE_TIME: <SingleStats data="Avg Response Time" {...widgetData} />,
  HELPDESK_RESOLUTION_RATE: <SingleStats data="Resolution Rate" {...widgetData} />,
  HELPDESK_COMPLAINTS: <Complaints {...widgetData} />,
  HELPDESK_REQUESTBOX: <RequestBox {...widgetData} />,
  HELPDESK_COMPLAINTS_BY_LEVEL: <ComplaintsByLevel {...widgetData} />,

  DEFAULT: <Nowidget {...widgetData} />,
});

const mapApiToSections = async (sections, communityId) => {
  return await Promise.all(
    sections?.map(async (section) => {
      let sectionData = {};

      if (section?.api_endpoint === "/summary") {
        sectionData = await fetchSummary(communityId, section.api_endpoint);
      }

      return {
        id: section.id,
        name: section.name,
        endpoint: section?.api_endpoint,
        rowHeight: section?.section_config?.["min-h"] || 120,
        widgets: section.widgets.map((w) => {
          const widgets = createWidgets(sectionData, {
            widgetId: w.id,
            containerId: w.container_id,
            sectionEndpoint: section?.api_endpoint,
          });
          const minHeight = widgetMinHeights[w.container_id] || 2;
          const actualHeight =
            w.position[3] < minHeight ? minHeight : w.position[3];

          return {
            id: w.id,
            x: w.position[0],
            y: w.position[1],
            w: w.position[2],
            h: actualHeight,
            groupId: w.group_id ? `group${w.group_id}` : undefined,
            component: widgets[w.container_id] || widgets.DEFAULT,
          };
        }),
      };
    }) || []
  );
};

export const fetchCommunity = async () => {
  try {
    const res = await axios.get(
      "https://whitelabels-1.apnacomplex.com/dashboard-api/v1/community/all-communities"
    );
    return res.data?.data || [];
  } catch (err) {
    console.error("Error fetching community data:", err);
    return [];
  }
};

export const fetchSummary = async (communityId, endpoint) => {
  if (!communityId || !endpoint) return {};
  try {
    const url = `https://whitelabels-1.apnacomplex.com/dashboard-api/v1${endpoint}?community_id=${communityId}`;
    const res = await axios.get(url);
    return res.data?.data || {};
  } catch (err) {
    console.error(`Error fetching data from ${endpoint}:`, err);
    return {};
  }
};

export const fetchDashboardData = async (communityId) => {
  try {
    const res = await axios.get(
      "https://whitelabels-1.apnacomplex.com/dashboard-api/v1/dashboards/1689fab9-9c56-426a-bd15-368b9da4ce33/details"
    );

    const sections = res.data?.data?.sections || [];
    return await mapApiToSections(sections, communityId);
  } catch (err) {
    console.error("Error fetching dashboard data:", err);
    return [];
  }
};
