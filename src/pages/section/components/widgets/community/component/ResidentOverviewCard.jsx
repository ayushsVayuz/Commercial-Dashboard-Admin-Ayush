import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { GoHome } from "react-icons/go";
import Card from "../../components/Card";

ChartJS.register(ArcElement, Tooltip, Legend);

const centerTextPlugin = {
  id: "centerText",
  afterDraw(chart, args, pluginOptions) {
    const { ctx } = chart;
    const meta = chart.getDatasetMeta(0);
    if (!meta?.data?.[0]) return;
    const { x, y } = meta.data[0];

    const {
      top = "",
      bottom = "",
      topSize = 20,
      bottomSize = 10,
      topColor = "#0F172A",
      bottomColor = "#64748B",
    } = pluginOptions || {};

    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = topColor;
    ctx.font = `600 ${topSize}px Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif`;
    ctx.fillText(top, x, y - 5);
    ctx.fillStyle = bottomColor;
    ctx.font = `500 ${bottomSize}px Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif`;
    ctx.fillText(bottom, x, y + 12);
    ctx.restore();
  },
};

const ResidentOverviewCard = ({
  ownerCount = 1000,
  tenantCount = 200,
  nonResidingOwners = 26,
  growthPct = "+9.1%",
}) => {
  const ownerResiding = Math.max(ownerCount - nonResidingOwners, 0);
  const totalMembers = ownerCount + tenantCount;

  const data = {
    labels: ["Owners", "Tenants", "Non-residing Owner"],
    datasets: [
      {
        data: [ownerResiding, tenantCount, nonResidingOwners],
        backgroundColor: ["#3C81F6", "#08B6D4", "#8B5CF6"],
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "68%",
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: { label: (ctx) => `${ctx.label}: ${ctx.parsed}` },
        displayColors: false,
      },
      centerText: {
        top: `${totalMembers}`,
        bottom: "Total Members",
        topSize: 20,
        bottomSize: 10,
      },
    },
  };

  return (
    <Card
      title="Resident Overview"
      icon={<GoHome className="h-6 w-6 text-[#8B5CF6]" />}
      className="h-[238px]"
      childrenClassName=" flex-1 min-h-0 grid grid-cols-12 gap-4 items-center"
    >
      <div className="col-span-5 space-y-3">
        <div>
          <div className="text-xs text-[#64748B] font-normal">Total Owners</div>
          <div className="text-3xl font-semibold text-[#3C81F6]">
            {ownerCount}
          </div>
        </div>
        <div>
          <div className="text-xs text-[#64748B] font-normal">
            Total Tenants
          </div>
          <div className="text-3xl font-semibold text-[#08B6D4]">
            {tenantCount}
          </div>
        </div>
        <div className="text-xs text-[#1FA05B] font-medium flex gap-2">
          {growthPct}{" "}
          <div className="text-[#64748B] font-normal">
            Compared to last month
          </div>
        </div>
      </div>

      <div className="col-span-7">
        <div className="h-[162px] w-[162px] ml-auto mr-2">
          <Doughnut
            data={data}
            options={options}
            plugins={[centerTextPlugin]}
          />
        </div>
      </div>
    </Card>
  );
};

export default ResidentOverviewCard;
