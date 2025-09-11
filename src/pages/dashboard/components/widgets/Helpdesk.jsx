import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import TooltipBox from "./Tooltip";

const COLORS = ["#667CFF", "#FDB022", "#1FA05B", "#AB0000"];

const Helpdesk = ({ data }) => {
  const helpdeskData = data.helpdesk_data || [];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-around">
        <div className="text-center">
          <p className="text-lg font-semibold text-blue-600">
            {data.helpdesk_open_complaints || 0}
          </p>
          <p className="text-xs text-gray-500">Open Complaints</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={helpdeskData}
            cx="50%"
            cy="50%"
            outerRadius={60}
            dataKey="value"
          >
            {helpdeskData.map((entry, i) => (
              <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<TooltipBox />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Helpdesk;
