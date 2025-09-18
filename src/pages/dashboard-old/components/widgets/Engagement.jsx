import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import TooltipBox from "./Tooltip";

const COLORS = ["#667CFF", "#FDB022", "#1FA05B", "#AB0000"];

const Engagement = ({ data }) => {
  const engagementData = data.engagement_data || [];

  return (
    <div className="flex flex-col gap-6">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={engagementData}
          layout="vertical"
          margin={{ top: 10, right: 20, left: 20, bottom: 0 }}
        >
          <XAxis type="number" fontSize={10} stroke="#64748B" />
          <YAxis
            dataKey="name"
            type="category"
            fontSize={10}
            stroke="#64748B"
          />
          <Tooltip content={<TooltipBox />} />
          <Bar dataKey="value" barSize={20}>
            {engagementData.map((entry, i) => (
              <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Engagement;