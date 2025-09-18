import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import TooltipBox from "./Tooltip";

const COLORS = ["#1FA05B", "#AB0000"];

const CommunityStats = ({ data }) => {
  const communityData = [
    { name: "Move-In", value: data.community_stats?.move_in || 0 },
    { name: "Move-Out", value: data.community_stats?.move_out || 0 },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-around">
        <div className="text-center">
          <p className="text-lg font-semibold text-green-600">
            {data.community_stats?.move_in || 0}
          </p>
          <p className="text-xs text-gray-500">Move-In</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-red-600">
            {data.community_stats?.move_out || 0}
          </p>
          <p className="text-xs text-gray-500">Move-Out</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={communityData}
            cx="50%"
            cy="50%"
            outerRadius={60}
            dataKey="value"
          >
            {communityData.map((entry, i) => (
              <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<TooltipBox />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CommunityStats;
