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

const RevenuebyCategory = () => {
  const labels = [
    "Gym",
    "Parking",
    "Swimming Pool",
    "Community Hall",
    "Tennis Court",
  ];
  const values = [13000, 9400, 8800, 7200, 6000];
  const units = [18, 12, 18, 6];

  const data = {
    labels,
    datasets: [
      {
        label: "Due",
        data: values,
        backgroundColor: "#8B5CF6",
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
      title="Revenue by Category"
      className="w-full h-[362px]"
      period={
        <OpenInNewOutlinedIcon className="h-5 w-5 text-[#884EA7] cursor-pointer" />
      }
      titleWeight="semi-bold"
    >
      <Bar data={data} options={options} />
    </Card>
  );
};

export default RevenuebyCategory;
