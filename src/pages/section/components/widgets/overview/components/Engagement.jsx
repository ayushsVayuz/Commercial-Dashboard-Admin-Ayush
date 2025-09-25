import Card from "../../components/Card";
import { LuMessageSquare } from "react-icons/lu";
import {
  Cell,
  XAxis,
  YAxis,
  Tooltip as RTooltip,
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function Engagement({ isStatic, data }) {
  const engagementBars = [
    { name: "Notice", value: Number(data?.total_notices || 10) },
    { name: "Post", value: Number(data?.total_topics || 20) },
    { name: "Poll", value: Number(data?.total_polls || 30) },
    { name: "Survey", value: Number(data?.total_surveys || 40) },
  ];

  const COLORS = {
    Notice: "#8B5CF6",
    Post: "#22C55E",
    Poll: "#3B82F6",
    Survey: "#F59E0B",
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;
    return (
      <div className="bg-black text-white text-xs px-3 py-2 rounded-lg shadow-lg">
        {label && <div className="font-medium mb-1">{label}</div>}
        {payload.map((item, i) => (
          <div key={i} className="capitalize leading-relaxed">
            <span
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: item.color,
                marginRight: 6,
              }}
            ></span>
            {item.name}: <span className="font-semibold">{item.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card
      title="Engagement"
      period="This Month"
      icon={<LuMessageSquare className="text-2xl text-[#DBB467]" />}
      className={`${isStatic && "max-h-[303px]"} h-[303px]`}
    >
      <div className="w-full h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={engagementBars}
            layout="vertical"
            margin={{ top: 4, right: 8, left: 8, bottom: 0 }}
          >
            <CartesianGrid
              stroke="#e5e7eb"
              strokeDasharray="3 3"
              horizontal={false}
            />

            <YAxis
              type="category"
              dataKey="name"
              width={40}
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 10,
                lineHeight: 14,
                fill: "#121212",
                fontWeight: 400,
              }}
            />

            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 10,
                lineHeight: 14,
                fill: "#64748B",
                fontWeight: 400,
              }}
            />

            <RTooltip content={<CustomTooltip />} />

            <Bar dataKey="value" barSize={40} isAnimationActive={false}>
              {engagementBars.map((entry) => (
                <Cell key={entry.name} fill={COLORS[entry.name]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default Engagement;
