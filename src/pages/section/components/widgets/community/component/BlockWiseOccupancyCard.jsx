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
    { name: "Block A", owner: 110, rented: 24, vacant: 8 },
    { name: "Block B", owner: 95, rented: 18, vacant: 6 },
    { name: "Block C", owner: 65, rented: 12, vacant: 18 },
    { name: "Block D", owner: 78, rented: 16, vacant: 30 },
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
        label: "Owner",
        data: owners,
        backgroundColor: "#3C81F6",
        barThickness: 40,
      },
      {
        label: "",
        data: owners.map(() => 2),
        backgroundColor: "transparent",
        barThickness: 40,
      },
      {
        label: "Rented",
        data: rented,
        backgroundColor: "#8B5CF6",
        barThickness: 40,
      },
      {
        label: "",
        data: rented.map(() => 2),
        backgroundColor: "transparent",
        barThickness: 40,
      },
      {
        label: "Vacant",
        data: vacant,
        backgroundColor: "#08B6D4",
        barThickness: 40,
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
      title="Block-wise Occupancy"
      period={<OpenInNewOutlinedIcon className="text-xl text-[#884EA7]" />}
      className="w-full h-[360px]"
    >
      <Bar data={data} options={options} />
    </Card>
  );
};

export default BlockWiseOccupancyCard;
