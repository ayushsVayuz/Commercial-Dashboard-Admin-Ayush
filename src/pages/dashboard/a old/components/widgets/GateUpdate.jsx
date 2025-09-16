import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import TooltipBox from "./Tooltip";

const GateUpdates = ({ data }) => {
  const gateData = data.gate_data || [];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-around">
        {[
          { label: "Visitors", value: data.gate_pass_visitors, color: "#667CFF" },
          { label: "Staff", value: data.gate_pass_staff, color: "#FDB022" },
          { label: "Delivery", value: data.gate_pass_delivery, color: "#667CFF" },
          { label: "Cabs", value: data.gate_pass_cabs, color: "#1FA05B" },
        ].map((item, i) => (
          <div key={i} className="text-center">
            <p className="text-lg font-semibold text-gray-900">{item.value}</p>
            <p className="text-xs text-gray-500">{item.label}</p>
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={gateData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <XAxis dataKey="date" fontSize={10} stroke="#64748B" />
          <YAxis fontSize={10} stroke="#64748B" />
          <Tooltip content={<TooltipBox />} />
          <Line type="monotone" dataKey="visitors" stroke="#667CFF" />
          <Line type="monotone" dataKey="staff" stroke="#FDB022" />
          <Line type="monotone" dataKey="delivery" stroke="#667CFF" />
          <Line type="monotone" dataKey="cabs" stroke="#1FA05B" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GateUpdates;
