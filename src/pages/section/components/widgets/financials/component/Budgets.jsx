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

const BudgetVsActuals = () => {
  const labels = [
    "Maintenance",
    "Security",
    "Utilities",
    "Housekeeping",
    "Administration",
    "Others",
  ];
  const budgetValues = [55000, 56000, 64000, 38000, 54000, 65000];
  const actualValues = [63000, 48000, 51300, 28000, 42000, 35000];

  const data = {
    labels,
    datasets: [
      {
        label: "Budget",
        data: budgetValues,
        backgroundColor: "#93C5FD",
        barThickness: 60,
      },
      {
        label: "Actual",
        data: actualValues,
        backgroundColor: "#3B82F6",
        barThickness: 60,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "rectRot",
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "#0F172A",
        titleColor: "#FFFFFF",
        bodyColor: "#FFFFFF",
        displayColors: false,
        padding: 12,
        caretSize: 6,
        callbacks: {
          title: (items) => labels[items[0].dataIndex],
          label: (ctx) => {
            const value = ctx.parsed.y;
            return `${ctx.dataset.label}: AED ${(value / 1000).toFixed(1)}K`;
          },
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
      title="Budget vs Actuals"
      className="w-full"
      period={
        <OpenInNewOutlinedIcon className="h-5 w-5 text-[#884EA7] cursor-pointer" />
      }
    >
      <Bar data={data} options={options} />
    </Card>
  );
};

export default BudgetVsActuals;
