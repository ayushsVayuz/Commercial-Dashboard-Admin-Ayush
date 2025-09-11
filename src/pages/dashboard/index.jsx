import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DraggableWidget } from "./components/DragableWidget";
import Card from "./components/widgets/Card";
import FinancialSummary from "./components/widgets/FinancialSummary";
import GateUpdates from "./components/widgets/GateUpdate";
import Facilities from "./components/widgets/Facilities";
import CommunityStats from "./components/widgets/CommunityStats";
import Helpdesk from "./components/widgets/Helpdesk";
import Engagement from "./components/widgets/Engagement";

export default function Dashboard() {
  const [widgets, setWidgets] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState(null);

  const widgetsDummyArray = [
    { id: "A", x: 0, y: 0, w: 4, h: 1, groupId: "group1" },
    { id: "B", x: 0, y: 1, w: 4, h: 1, groupId: "group1" },
    { id: "C", x: 4, y: 0, w: 4, h: 2 },
    { id: "D", x: 8, y: 0, w: 4, h: 2 },
    { id: "E", x: 0, y: 2, w: 6, h: 2, groupId: "group2" },
    { id: "F", x: 6, y: 2, w: 6, h: 2, groupId: "group2" },
  ];

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch(
          "https://whitelabels-1.apnacomplex.com/dashboard-api/v1/dashboards/1689fab9-9c56-426a-bd15-368b9da4ce33/details"
        );
        const json = await res.json();

        if (json?.statusCode === 200) {
          const apiWidgets = [];

          // Flatten sections → widgets
          json.data.sections.forEach((section) => {
            section.widgets.forEach((w) => {
              apiWidgets.push({
                id: w.id,
                name: w.name,
                type: w.type,
                x: w.position?.x ?? 0,
                y: w.position?.y ?? 0,
                w: w.position?.w ?? 2,
                h: w.position?.h ?? 1,
                groupId: w.group_id || null,
                draggable: w.constraints?.draggable ?? true,
                maxWidth: w.constraints?.maxWidth ?? null,
                minWidth: w.constraints?.minWidth ?? null,
                sectionId: section.id,
              });
            });
          });

          setWidgets(apiWidgets);
        }
      } catch (err) {
        console.error("Failed to load dashboard:", err);
      }
    }

    fetchDashboard();
  }, []);

  const dashboardData = dummyDashboardData;

  // utils/formatters.js
  const formatCurrencyShort = (value) => {
    if (value === null || value === undefined || isNaN(value)) return "0";

    const num = Number(value);

    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
    }
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1_000) {
      return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
    }

    return num.toString();
  };

  return (
    <>
      {/* <CommunityFilter
        selectedCommunity={selectedCommunity}
        setSelectedCommunity={setSelectedCommunity}
      /> */}
      <Card title="Financial Summary">
        <FinancialSummary
          data={dashboardData}
          formatCurrencyShort={formatCurrencyShort}
        />
      </Card>

      <Card title="Gate Updates">
        <GateUpdates data={dashboardData} />
      </Card>

      <Card title="Facilities">
        <Facilities data={dashboardData} />
      </Card>

      <Card title="Community Stats">
        <CommunityStats data={dashboardData} />
      </Card>

      <Card title="Helpdesk">
        <Helpdesk data={dashboardData} />
      </Card>

      <Card title="Engagement">
        <Engagement data={dashboardData} />
      </Card>

      <div className="p-4 max-w-6xl mx-auto border-2 border-gray-300 bg-slate-100">
        <DndProvider backend={HTML5Backend}>
          <div
            className="
            grid gap-2 w-full
            grid-cols-12
            auto-rows-[60px]
            sm:auto-rows-[50px]
            md:auto-rows-[70px]
            lg:auto-rows-[80px]
          "
          >
            {widgets.map((w) => (
              <DraggableWidget
                key={w.id}
                widget={w}
                widgets={widgets}
                setWidgets={setWidgets}
              />
            ))}
          </div>
        </DndProvider>
      </div>
    </>
  );
}

export const dummyDashboardData = {
  // 🔹 Financial Summary
  finance: {
    incomeSummary: {
      opening_balance: 150000,
      income: 85000,
      collection: 70000,
      closing_balance: 205000,
    },
    expenditureSummary: {
      expenditure: 40000,
      payment: 30000,
      outstanding: 10000,
    },
  },

  // 🔹 Gate Updates
  gate_pass_visitors: 120,
  gate_pass_staff: 85,
  gate_pass_delivery: 60,
  gate_pass_cabs: 40,
  gate_data: [
    { date: "2025-09-05", visitors: 20, staff: 10, delivery: 5, cabs: 3 },
    { date: "2025-09-06", visitors: 25, staff: 15, delivery: 8, cabs: 4 },
    { date: "2025-09-07", visitors: 30, staff: 12, delivery: 10, cabs: 6 },
    { date: "2025-09-08", visitors: 18, staff: 14, delivery: 6, cabs: 5 },
    { date: "2025-09-09", visitors: 27, staff: 20, delivery: 9, cabs: 7 },
  ],

  // 🔹 Facilities
  facility_utilisation: 75,
  facility_revenue: 45000,
  facility_data: [
    { date: "2025-09-01", utilisation: 50, revenue: 2000 },
    { date: "2025-09-02", utilisation: 60, revenue: 3000 },
    { date: "2025-09-03", utilisation: 70, revenue: 5000 },
    { date: "2025-09-04", utilisation: 80, revenue: 7000 },
    { date: "2025-09-05", utilisation: 90, revenue: 9000 },
  ],

  // 🔹 Community Stats
  community_stats: {
    move_in: 12,
    move_out: 7,
  },

  // 🔹 Helpdesk
  helpdesk_open_complaints: 25,
  helpdesk_data: [
    { name: "Electrical", value: 10 },
    { name: "Plumbing", value: 7 },
    { name: "Cleaning", value: 5 },
    { name: "Security", value: 3 },
  ],

  // 🔹 Engagement
  engagement_data: [
    { name: "Polls", value: 40 },
    { name: "Events", value: 30 },
    { name: "Surveys", value: 20 },
    { name: "Announcements", value: 15 },
  ],
};
