import React from "react";
import { RiBillLine } from "react-icons/ri";
import { DescriptionOutlined as DescriptionOutlinedIcon } from "@mui/icons-material";
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
        <div className={`h-6 w-6 grid place-items-center rounded-md ${iconBg}`}>
          <Icon className={`h-4 w-4 ${iconColor}`} />
        </div>
}
      className="h-[132px]">
      <div>
          <div className="text-[28px] leading-[32px] font-medium text-[#121212]">
        {value}
      </div>

      <div className="flex items-center gap-2 pt-[8px] text-xs leading-[16px]">
        <div
          className={
            positive
              ? "text-[#1FA05B] font-medium"
              : "text-rose-600 font-medium"
          }
        >
          {delta}
        </div>
        <div className="text-[#64748B]">{deltaLabel}</div>
      </div>
      </div>
    </Card>
  );
}

function SingleStats({ data }) {
  const cards = [
    {
      title: data?.title || "Total Bookings",
      value: 145,
      delta: "+11.0%",
      deltaLabel: "Compared to last month",
      positive: true,
      Icon: RiBillLine,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
    },
  ];

  return (
    <div className="h-full">
      {cards.map((card, index) => (
        <StatCardGrid key={index} {...card} />
      ))}
    </div>
  );
}

export default SingleStats;
