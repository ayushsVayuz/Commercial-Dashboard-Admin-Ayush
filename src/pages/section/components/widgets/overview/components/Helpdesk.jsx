import Card from "../../components/Card";
import { LuWrench } from "react-icons/lu";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RTooltip,
  ResponsiveContainer,
} from "recharts";

function Helpdesk({ isStatic, data }) {
  const Chip = ({ value }) => {
    if (value === null || value === undefined || isNaN(value)) {
      return null;
    }
    const isPositive = value >= 0;
    return (
      <span
        className={`p-1 rounded text-[10px] leading-[14px] font-medium ${
          isPositive
            ? "bg-[#F7FEFA] text-[#1FA05B]"
            : "bg-[#FFF2F2] text-[#AB0000]"
        }`}
      >
        {isPositive ? `+${value}%` : `${value}%`}
      </span>
    );
  };

  const helpdeskBreakup = [
    { name: "L1", value: Number(data?.today_L1 || 0) },
    { name: "L2", value: Number(data?.today_L2 || 0) },
    { name: "L3", value: Number(data?.today_L3 || 0) },
    { name: "No Level", value: Number(data?.today_NoLevel || 0) },
  ];

  const total = helpdeskBreakup.reduce((sum, d) => sum + d.value, 0);
  const chartData =
    total === 0 ? [{ name: "No Data", value: 1 }] : helpdeskBreakup;

  const COLORS = ["#1FA05B", "#E7A015", "#FA7E28", "#EF4444", "#CBD5E1"]; // last is for dummy slice

  const Dot = ({ color }) => (
    <span
      style={{
        display: "inline-block",
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        backgroundColor: color,
        marginRight: "6px",
      }}
    />
  );
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;
    return (
      <div className="bg-black text-white text-xs px-3 py-2 rounded-lg shadow-lg">
        {payload.map((item, i) => (
          <p key={i} className="capitalize leading-relaxed">
            <Dot color={item.color} />
            {item.name}: <span className="font-semibold">{item.value}</span>
          </p>
        ))}
      </div>
    );
  };

  return (
    <Card
      title="Helpdesk"
      period="Today"
      icon={<LuWrench className="text-2xl text-[#FA7E28]" />}
      className={`${
        isStatic && "max-h-[186px]"
      } h-[186px] overflow-hidden mb-4 break-inside-avoid`}
    >
      <div className="flex gap-3 h-fit">
        <div className="w-[50%] flex flex-col gap-7">
          <div className="flex flex-col gap-2">
            <div className="!m-0 !text-xs !leading-[16px] !text-[#64748B]">
              Open Complaints
            </div>
            <div className="!m-0 !text-[28px] !leading-[32px] !font-medium text-[#FA7E28]">
              {data?.today_open_complaints ?? 0}
            </div>
          </div>

          <div className="!m-0 !text-[10px] !leading-[14px] !text-[#64748B] space-x-1">
            <Chip value={data?.percent_change} />
            <span className="whitespace-nowrap">Compared to yesterday</span>
          </div>
        </div>
        <div className="w-[50%] h-[110px] flex justify-end">
          <ResponsiveContainer width="75%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={36}
                outerRadius={52}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index] || "#CBD5E1"} />
                ))}
              </Pie>
              <RTooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}

export default Helpdesk;
