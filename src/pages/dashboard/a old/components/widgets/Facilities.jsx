import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import TooltipBox from "./Tooltip";

const Facilities = ({ data }) => {
  const facilityData = data.facility_data || [];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-around">
        {[
          { label: "Utilisation", value: data.facility_utilisation, color: "#667CFF" },
          { label: "Revenue", value: data.facility_revenue, color: "#1FA05B" },
        ].map((item, i) => (
          <div key={i} className="text-center">
            <p className="text-lg font-semibold text-gray-900">{item.value}</p>
            <p className="text-xs text-gray-500">{item.label}</p>
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={facilityData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <XAxis dataKey="date" fontSize={10} stroke="#64748B" />
          <YAxis fontSize={10} stroke="#64748B" />
          <Tooltip content={<TooltipBox />} />
          <Line type="monotone" dataKey="utilisation" stroke="#667CFF" />
          <Line type="monotone" dataKey="revenue" stroke="#1FA05B" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Facilities;
