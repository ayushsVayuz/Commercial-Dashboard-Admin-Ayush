import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Card from "../../components/Card";
import { LuBuilding } from "react-icons/lu";

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

const UnitStatusPie = ({ sold = 847, unsold = 73, growthPct = "+9.1%" }) => {
  const totalUnits = sold + unsold;

  const data = {
    labels: ["Sold", "Unsold"],
    datasets: [
      {
        data: [sold, unsold],
        backgroundColor: ["#12B981", "#EF4444"],
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
        top: `${totalUnits}`,
        bottom: "Total Units",
        topSize: 20,
        bottomSize: 10,
      },
    },
  };

  return (
    <Card
      title="Unit Status"
      period="This Month"
      icon={<LuBuilding className="h-6 w-6 text-green-600" />}
      className="h-[238px]"
    >
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-5 space-y-3">
          <div>
            <div className="text-xs lending-[16px] text-[#64748B]">Sold</div>
            <div className="text-[28px] leading-[32px] text-[#1FA05B]">{sold}</div>
          </div>
          <div>
            <div className="text-xs lending-[16px] text-[#64748B]">Unsold</div>
            <div className="text-[28px] leading-[32px] text-[#EF4444]">{unsold}</div>
          </div>
          <div className="text-xs text-[#1FA05B] flex gap-2">
            {growthPct}{" "}
            <span className="text-[#64748B] text=[10px]">
              Compared to last month
            </span>
          </div>
        </div>

        <div className="col-span-7">
          <div className="h-[158px] w-[158px] ml-auto mr-2">
            <Doughnut
              data={data}
              options={options}
              plugins={[centerTextPlugin]}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UnitStatusPie;