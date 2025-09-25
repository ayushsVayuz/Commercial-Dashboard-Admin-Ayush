import React from "react";
import { DescriptionOutlined as DescriptionOutlinedIcon } from "@mui/icons-material";
import { RiBillLine } from "react-icons/ri";
import { LuImagePlus } from "react-icons/lu";
import { CiBoxList } from "react-icons/ci";
import { HiOutlineClipboardList } from "react-icons/hi";
import Card from "../../../../components/ui/Card";

function StatCardGrid({ title, value, delta, deltaLabel, positive = true, Icon = DescriptionOutlinedIcon, iconColor = "text-emerald-600", iconBg = "bg-emerald-50" }) {
  return (
    <Card
      title={title}
      icon={
        <div className={`h-6 w-6 grid place-items-center rounded-md ${iconBg}`}>
          <Icon className={`h-4 w-4 ${iconColor}`} />
        </div>
      }
    >
      <div className="text-4xl font-semibold tracking-tight text-[#121212]">{value}</div>
      <div className="flex items-center gap-2 text-sm">
        <span className={positive ? "text-emerald-600 font-medium" : "text-rose-600 font-medium"}>
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
      title: "Notice",
      value: 160,
      delta: "+11.0%",
      deltaLabel: "Compared to last month",
      positive: true,
      Icon: RiBillLine,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
    },
    {
      title: "Post",
      value: 83,
      delta: "+2.0%",
      deltaLabel: "Compared to last month",
      positive: true,
      Icon: LuImagePlus,
      iconColor: "text-[#329DFF]",
      iconBg: "bg-emerald-50",
    },
    {
      title: "Poll",
      value: 3,
      delta: "+11.0%",
      deltaLabel: "Compared to last month",
      positive: true,
      Icon: CiBoxList,
      iconColor: "text-[#FA7E28]",
      iconBg: "bg-orange-100",
    },
    {
      title: "Poll",
      value: 5,
      delta: "-8.0%",
      deltaLabel: "Compared to last month",
      positive: false,
      Icon: HiOutlineClipboardList,
      iconColor: "text-[#DBB467]",
      iconBg: "bg-yellow-100",
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
