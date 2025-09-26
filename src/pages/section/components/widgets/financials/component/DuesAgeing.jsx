import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { OpenInNewOutlined as OpenInNewOutlinedIcon } from "@mui/icons-material";
import Card from "../../components/Card";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const DuesAgeing = () => {
  const labels = ["Current Month", "1-3 Months", "3-6 Months", "6+ Months"];
  const values = [13000, 9400, 8800, 7200];
  const units = [18, 12, 18, 6];

  const data = {
    labels,
    datasets: [
      {
        label: "Due",
        data: values,
        backgroundColor: "#EF4444",
        barThickness: 60,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#0F172A",
        titleColor: "#FFFFFF",
        bodyColor: "#FFFFFF",
        displayColors: false,
        padding: 12,
        caretSize: 6,
        callbacks: {
          title: (items) => labels[items[0].dataIndex],
          label: (ctx) => `Due: AED ${(ctx.parsed.y / 1000).toFixed(1)}K`,
          afterLabel: (ctx) => `Units Count: ${units[ctx.dataIndex]}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#64748B" },
      },
      y: {
        beginAtZero: true,
        grid: { color: "#F1F5F9" },
        ticks: {
          color: "#64748B",
          callback: (val) => `${val / 1000}K`,
        },
      },
    },
  };

  return (
    <Card
      title="Dues Ageing"
      className="w-full h-[362px]"
      period={
        <OpenInNewOutlinedIcon className="h-5 w-5 text-[#884EA7] cursor-pointer" />
      }
      childrenClassName="space-y-2"
    >
      <div className="grid grid-cols-4 md:grid-cols-4 gap-3">
        {labels.map((label, i) => (
          <div key={label} className="p-2 rounded-lg bg-slate-50">
            <div className="flex justify-between items-start">
              <div className="font-semibold">{label}</div>
              <div className="text-right">
                <div className="text-red-600 font-semibold">
                  AED {(values[i] / 1000).toFixed(1)}K
                </div>
                <div className="text-xs text-gray-500">{units[i]} Units</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="h-[192px]">
        <Bar data={data} options={options} />
      </div>
    </Card>
  );
};

export default DuesAgeing;
