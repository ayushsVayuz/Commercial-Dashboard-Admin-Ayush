import { DescriptionOutlined as DescriptionOutlinedIcon } from "@mui/icons-material";
import { RiBillLine } from "react-icons/ri";
import Card from "../../componets/Card";

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
      className="h-[132px]"
    >
      <div className="text-4xl font-semibold tracking-tight text-[#121212]">
        {value}
      </div>
      <div className="flex items-center gap-2 text-sm">
        <div
          className={
            positive
              ? "text-emerald-600 font-medium"
              : "text-rose-600 font-medium"
          }
        >
          {delta}
        </div>
        <div className="text-slate-500">{deltaLabel}</div>
      </div>
    </Card>
  );
}

function SingleStats({ data }) {
  const cards = [
    {
      title: data,
      value: 160,
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
