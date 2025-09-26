import React from "react";
import { DescriptionOutlined as DescriptionOutlinedIcon } from "@mui/icons-material";
import { GoPeople } from "react-icons/go";
import { CiWarning } from "react-icons/ci";
import { PiShieldWarningBold } from "react-icons/pi";
import { LuCar } from "react-icons/lu";
import Card from "../../components/Card";

function StatCardGrid({
  title,
  value,
  delta,
  deltaLabel,
  positive = true,
  Icon = DescriptionOutlinedIcon,
  iconColor = "text-emerald-600",
  iconBg = "bg-emerald-50",
}) {
  return (
    <Card
      title={title}
      icon={
        <div className={`h-6 w-6 grid place-items-center`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
      }
    >
      <div className="text-4xl font-semibold tracking-tight text-[#121212]">
        {value}
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span
          className={
            positive
              ? "text-emerald-600 font-medium"
              : "text-rose-600 font-medium"
          }
        >
          {delta}
        </span>
        <span className="text-slate-500">{deltaLabel}</span>
      </div>
    </Card>
  );
}

function StatCard() {
  const cards = [
    {
      title: "Total Visitors",
      value: 160,
      delta: "+11.0%",
      deltaLabel: "Compared to last month",
      positive: true,
      Icon: GoPeople,
      iconColor: "text-[#329DFF]",
    },
    {
      title: "Active Incidents",
      value: 73,
      delta: "+2.0%",
      deltaLabel: "Compared to last month",
      positive: true,
      Icon: CiWarning,
      iconColor: "text-[#F69E0A]",
    },
    {
      title: "Missed Patrols",
      value: 3,
      delta: "+11.0%",
      deltaLabel: "Compared to last month",
      positive: true,
      Icon: PiShieldWarningBold,
      iconColor: "text-[#AB0000]",
    },
    {
      title: "Parking Usage",
      value: 5,
      delta: "-8.0%",
      deltaLabel: "Compared to last month",
      positive: false,
      Icon: LuCar,
      iconColor: "text-[#36AB6C]",
    },
  ];

  return (
    <div className="px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <StatCardGrid key={index} {...card} />
      ))}
    </div>
  );
}

export default StatCard;
