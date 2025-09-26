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
import Card from "../../components/Card";
import { OpenInNewOutlined as OpenInNewOutlinedIcon } from "@mui/icons-material";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BlockWiseOccupancyCard = ({
  blocks = [
    { name: "Level 1", owner: 110, rented: 24, vacant: 8 },
    { name: "Level 2", owner: 95, rented: 18, vacant: 6 },
    { name: "Level 3", owner: 65, rented: 12, vacant: 18 },
    { name: "Level 4", owner: 78, rented: 16, vacant: 30 },
  ],
}) => {
  const labels = blocks.map((b) => b.name);
  const owners = blocks.map((b) => b.owner);
  const rented = blocks.map((b) => b.rented);
  const vacant = blocks.map((b) => b.vacant);

  const data = {
    labels,
    datasets: [
      {
        label: "Closed",
        data: owners,
        backgroundColor: "#12B981",
        barThickness: 44,
      },
      {
        label: "",
        data: owners.map(() => 2),
        backgroundColor: "transparent",
        barThickness: 44,
      },
      {
        label: "In Progress",
        data: rented,
        backgroundColor: "#F59D0D",
        barThickness: 44,
      },
      {
        label: "",
        data: owners.map(() => 2),
        backgroundColor: "transparent",
        barThickness: 44,
      },
      {
        label: "Open",
        data: vacant,
        backgroundColor: "#EF4444",
        barThickness: 44,
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
          boxWidth: 10,
          boxHeight: 10,
          pointStyle: "rectRot",
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        ticks: { color: "#64748B" },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        suggestedMax: 180,
        grid: { color: "#F1F5F9" },
        ticks: { color: "#64748B", stepSize: 20 },
      },
    },
  };

  return (
    <Card
      title="Complaints by Level"
      className="w-full h-[362px]"
      period={<OpenInNewOutlinedIcon className="text-xl text-[#884EA7]" />}
    >
      <Bar data={data} options={options} />
    </Card>
  );
};

export default BlockWiseOccupancyCard;
