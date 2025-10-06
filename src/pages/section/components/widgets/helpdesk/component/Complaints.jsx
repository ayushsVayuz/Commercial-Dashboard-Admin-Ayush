import React from "react";
import Card from "../../components/Card";
import { OpenInNewOutlined as OpenInNewOutlinedIcon } from "@mui/icons-material";

const requests = [
  { title: "Maintenance", total: 25, pending: 8 },
  { title: "Security", total: 15, pending: 3 },
  { title: "Housekeeping", total: 12, pending: 4 },
  { title: "Utilities", total: 10, pending: 2 },
];

function Complaints() {
  return (
    <Card
      title={"Complaints"}
      period={<OpenInNewOutlinedIcon className="text-xl text-[#884EA7]" />}
      className="h-[362px]"
    >
      <div className="flex flex-col gap-3">
        {requests.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between bg-[#F9FAFB] rounded-lg p-3 h-[62px]"
          >
            <div className="flex flex-col">
              <div className="text-sm leading-[18px] font-medium text-[#121212]">
                {item.title}
              </div>
              <div className="text-xs leading-[16px] text-[#64748B]">Total: {item.total}</div>
            </div>

            <div className="flex flex-col items-end">
              <div className="text-sm leading-[18px] font-medium text-red-700">
                {String(item.pending).padStart(2, "0")}
              </div>
              <div className="text-xs leading-[16px] text-[#64748B]">Pending</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default Complaints;
