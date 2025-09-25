import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { OpenInNewOutlined as OpenInNewOutlinedIcon } from "@mui/icons-material";
import Card from "../../components/Card";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseCategories = () => {
  const labels = [
    "Maintenance",
    "Utilities",
    "Security",
    "Administration",
    "Others",
  ];
  const values = [450000, 320000, 280000, 180000, 120000];

  const data = {
    labels,
    datasets: [
      {
        label: "Expenses",
        data: values,
        backgroundColor: [
          "#08B6D4",
          "#8B5CF6",
          "#EF4444",
          "#F69E0A",
          "#12B981",
        ],
        borderColor: "#FFFFFF",
        borderWidth: 2,
        cutout: "70%",
      },
    ],
  };

  const total = values.reduce((sum, val) => sum + val, 0);

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
        padding: 10,
        callbacks: {
          label: (ctx) => `${ctx.label}: AED ${ctx.formattedValue}`,
        },
      },
    },
  };

  return (
    <Card
      title="Expense Categories"
      className="w-full"
      period={
        <OpenInNewOutlinedIcon className="h-5 w-5 text-[#884EA7] cursor-pointer" />
      }
      childrenClassName="space-y-6"
    >
      <div className="relative h-[254px] flex justify-center items-center">
        <Doughnut data={data} options={options} />

        <div className="absolute text-center">
          <p className="text-xl font-bold">
            AED {(total / 1000000).toFixed(2)}M
          </p>
          <p className="text-gray-500 text-sm">Total Expenses</p>
        </div>
      </div>

      <div className="space-y-2">
        {labels.map((label, i) => (
          <div
            key={label}
            className="flex justify-between items-center text-sm pb-2"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rotate-45"
                style={{ backgroundColor: data.datasets[0].backgroundColor[i] }}
              ></span>
              {label}
            </div>
            <span className="font-semibold text-gray-400">
              AED {(values[i] / 1000).toFixed(0)}K
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ExpenseCategories;
