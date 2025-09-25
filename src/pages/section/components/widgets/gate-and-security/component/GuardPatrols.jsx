import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import Card from "../../../../../../components/ui/Card";
import { OpenInNewOutlined as OpenInNewOutlinedIcon } from "@mui/icons-material";

const data = [
  { name: "Completed", value: 46, color: "#10B981" },
  { name: "Delayed", value: 2, color: "#F59E0B" },
  { name: "Missed", value: 2, color: "#EF4444" },
];

function GuardPatrols() {
  const total = 50;
  const completed = data.find((d) => d.name === "Completed")?.value || 0;

  return (
    <Card
      title="Guard Patrols"
      period={
        <OpenInNewOutlinedIcon className="h-5 w-5 text-[#884EA7] cursor-pointer" />
      }
    >
      <div className="flex flex-col items-center justify-center">
        <div className="w-[215px] h-[182px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                nameKey="name"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(val) => val.toLocaleString()} />
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="font-semibold text-base">
              {completed}/{total}
            </span>
            <span className="text-xs text-gray-500">Completed</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-4 w-full px-6 text-sm">
          {data.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between text-xs text-gray-600"
            >
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-2 h-2 rotate-45"
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.name}</span>
              </div>
              <span>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default GuardPatrols;
