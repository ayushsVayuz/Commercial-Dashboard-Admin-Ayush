import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Card from "../../componets/Card";
import { OpenInNewOutlined as OpenInNewOutlinedIcon } from "@mui/icons-material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const HourlyTrafficFlow = () => {
  const labels = ["10 AM", "12 PM", "2 PM", "4 PM", "6 PM", "8 PM", "10 PM"];

  const data = {
    labels,
    datasets: [
      {
        label: "Guest",
        data: [9, 5, 12, 7, 3, 6, 4],
        borderColor: "#EF4444",
        backgroundColor: "rgba(239,68,68,0.15)",
        pointBackgroundColor: "#EF4444",
        pointStyle: "rectRot",
        fill: false,
      },
      {
        label: "Cab",
        data: [15, 12, 10, 14, 7, 12, 8],
        borderColor: "#7C3AED",
        backgroundColor: "rgba(124,58,237,0.15)",
        pointBackgroundColor: "#7C3AED",
        pointStyle: "rectRot",
        fill: false,
      },
      {
        label: "Delivery",
        data: [22, 18, 16, 20, 22, 14, 17],
        borderColor: "#10B981",
        backgroundColor: "rgba(16,185,129,0.15)",
        pointBackgroundColor: "#10B981",
        pointStyle: "rectRot",
        fill: false,
      },
      {
        label: "Service",
        data: [13, 12, 8, 9, 5, 10, 7],
        borderColor: "#F59E0B",
        backgroundColor: "rgba(245,158,11,0.15)",
        pointBackgroundColor: "#F59E0B",
        pointStyle: "rectRot",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          boxWidth: 10,
          boxHeight: 10,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "#0F172A",
        titleColor: "#FFFFFF",
        bodyColor: "#FFFFFF",
        displayColors: false,
        padding: 12,
        caretSize: 0,
        callbacks: {
          title: (items) => items[0].label,
          label: (ctx) => `${ctx.dataset.label}  ${ctx.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: "#F1F5F9" },
        ticks: { color: "#64748B" },
      },
      y: {
        beginAtZero: true,
        suggestedMax: 28,
        grid: { color: "#F1F5F9" },
        ticks: { color: "#64748B", stepSize: 4, precision: 0 },
      },
    },
    elements: {
      line: { borderWidth: 2, tension: 0 },
      point: { radius: 0, hoverRadius: 3, hitRadius: 10 },
    },
  };

  return (
    <Card
      title="Hourly Traffic Flow"
      className="w-full h-[362px]"
      period={<OpenInNewOutlinedIcon className="text-xl text-[#884EA7]" />}
    >
      {/* <div className="h-[250px] w-full"> */}
      <Line data={data} options={options} />
      {/* </div> */}
    </Card>
  );
};

export default HourlyTrafficFlow;
