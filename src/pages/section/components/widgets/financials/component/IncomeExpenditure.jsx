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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);


const prettyMonth = (shortLabel) => {
  const [mon, yy] = String(shortLabel).split(" ");
  const map = {
    Jan: "January", Feb: "February", Mar: "March", Apr: "April",
    May: "May", Jun: "June", Jul: "July", Aug: "August",
    Sep: "September", Oct: "October", Nov: "November", Dec: "December",
  };
  return `${map[mon] || mon} 20${yy}`;
};

const IncomeExpenditure = ({
  labels = ["Jan 25", "Feb 25", "Mar 25", "Apr 25", "May 25"],
  moveIn = [24, 27, 20, 26, 23],
  moveOut = [4, 17, 8,5, 16,4,7],

}) => {
  const data = {
    
    labels,
    datasets: [
      {
        label: "Income",
        data: moveIn,
        borderColor: "#10B981",
        backgroundColor: "rgba(16,185,129,0.15)",
        pointBackgroundColor: "#10B981",
        pointStyle: "rectRot",
        fill: false,
      },
      {
        label: "Expenditure",
        data: moveOut,
        borderColor: "#AB0000",
        backgroundColor: "rgba(124,58,237,0.15)",
        pointBackgroundColor: "#AB0000",
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
          padding: 20
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
          title: (items) => prettyMonth(items[0].label),
          label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y}`,
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
  
        <Line data={data} options={options}  />
  );
};

export default IncomeExpenditure;
