import React, { useMemo } from "react";
import Card from "../../components/Card";
import { LuDoorOpen } from "react-icons/lu";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as RTooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function timeToMinutes(timeStr) {
  if (!timeStr) return 0;
  const [raw, meridian] = timeStr.split(" ");
  let [hours, minutes] = raw.split(":").map(Number);
  if (meridian === "PM" && hours !== 12) hours += 12;
  if (meridian === "AM" && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

function toTimeString(minutes) {
  let h = Math.floor(minutes / 60);
  const meridian = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h} ${meridian}`;
}

function groupSlotsIntoTwoHours(slots) {
  const bucketSize = 240;
  const grouped = {};

  for (let i = 0; i < slots.length; i++) {
    const slot = slots[i];
    const startMinutes = timeToMinutes(slot.slot_start_time);

    const bucketStart = Math.floor(startMinutes / bucketSize) * bucketSize;
    const bucketEnd = bucketStart + bucketSize;
    const key = `${bucketStart}-${bucketEnd}`;

    if (!grouped[key]) {
      grouped[key] = {
        time: toTimeString(bucketEnd),
        bookings: 0,
        total: 0,
      };
    }

    grouped[key].bookings += Number(slot?.slot_bookings || 0);
    grouped[key].total += Number(slot?.total_slots || 0);
  }

  return Object.values(grouped);
}

function Facilities({ isStatic, data }) {
  const totalBookings = Number(data?.totalBookings || 0);
  const totalSlots = Number(data?.totalSlots || 0);
  const utilizationRate = Number(data?.utilizationRate || 0);

  const chartData = useMemo(() => {
    if (!data?.slots?.length) return [];
    return groupSlotsIntoTwoHours(data.slots);
  }, [data]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;
    return (
      <div className="bg-black text-white text-xs px-3 py-2 rounded-lg shadow-lg">
        {label && <div className="font-medium mb-1">{label}</div>}
        {payload.map((item, i) => (
          <div key={i} className="capitalize flex gap-1 items-center leading-relaxed">
            <div
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: item.color,
                marginRight: 6,
              }}
            />
            {item.name}: <div className="font-semibold">{item.value}</div>
          </div>
        ))}
      </div>
    );
  };

  const maxY =
    chartData.length > 0 ? Math.max(...chartData.map((d) => d.total), 5) : 5;

  return (
    <Card
      title="Facilities"
      period="Today"
      icon={<LuDoorOpen className="text-2xl text-[#8B5CF6]" />}
      className={`${
        isStatic && "max-h-[305px]"
      } h-[305px] mb-4 break-inside-avoid`}
    >
      <div className="grid grid-cols-3 gap-6 mb-4">
        <div className="flex flex-col gap-1">
          <div className="!m-0 !text-xs !leading-[16px] !text-[#64748B]">
            Bookings
          </div>
          <div className="!m-0 !text-[24px] !leading-[28px] !font-medium text-[#8B5CF6]">
            {totalBookings}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="!m-0 !text-xs !leading-[16px] !text-[#64748B]">
            Total Slots
          </div>
          <div className="!m-0 !text-[24px] !leading-[28px] !font-medium text-[#F59E0B]">
            {totalSlots}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="!m-0 !text-xs !leading-[16px] !text-[#64748B]">
            Utilisation Rate
          </div>
          <div className="!m-0 !text-[24px] !leading-[28px] !font-medium !text-[#329DFF]">
            {Number.isFinite(utilizationRate)
              ? utilizationRate.toFixed(2)
              : "0.00"}
            %
          </div>
        </div>
      </div>

      <div className="w-full h-[150px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#EBEBEB" />
            <XAxis
              dataKey="time"
              tick={{
                fontSize: 10,
                lineHeight: 14,
                fill: "#121212",
                fontWeight: 400,
              }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              yAxisId="left"
              domain={[0, maxY]}
              tick={{
                fontSize: 10,
                lineHeight: 14,
                fill: "#64748B",
                fontWeight: 400,
              }}
              axisLine={false}
              tickLine={false}
            />
            <RTooltip content={<CustomTooltip />} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="bookings"
              name="Bookings"
              stroke="#8B5CF6"
              strokeWidth={2}
              dot={false}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="total"
              name="Total Slots"
              stroke="#F59E0B"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default Facilities;
