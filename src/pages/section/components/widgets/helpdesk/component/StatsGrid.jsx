import React from "react";
import { DescriptionOutlined as DescriptionOutlinedIcon } from "@mui/icons-material";
import Card from "../../componets/Card";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";

import { LuTicketCheck } from "react-icons/lu";

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
      title: "Open Complaints",
      value: 145,
      delta: "+11.0%",
      deltaLabel: "Compared to last month",
      positive: true,
      Icon: LuTicketCheck,
      iconColor: "text-[#AB0000]",
    },
    {
      title: "Pending Requests",
      value: 83,
      delta: "+2.0%",
      deltaLabel: "Compared to last month",
      positive: true,
      Icon: IoDocumentTextOutline,
      iconColor: "text-[#E7A015]",
    },
    {
      title: "Avg Response Time",
      value: "3h",
      delta: "+11.0%",
      deltaLabel: "Compared to last month",
      positive: true,
      Icon: FaRegClock,
      iconColor: "text-[#1FA05B]",
    },
    {
      title: "Resolution Rate",
      value: "93%",
      delta: "-8.0%",
      deltaLabel: "Compared to last month",
      positive: false,
      Icon: FaArrowTrendUp,
      iconColor: "text-[#329DFF]",
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
