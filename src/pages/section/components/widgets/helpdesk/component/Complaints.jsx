import React from "react";
import Card from "../../../../../../components/ui/Card";
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
    >
      <div className="flex flex-col gap-3">
        {requests.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between bg-[#F9FAFB] rounded-lg p-3"
          >
            <div className="flex flex-col">
              <span className="text-sm font-medium text-[#121212]">
                {item.title}
              </span>
              <span className="text-xs text-[#64748B]">
                Total: {item.total}
              </span>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-sm font-semibold text-red-700">
                {String(item.pending).padStart(2, "0")}
              </span>
              <span className="text-xs text-[#64748B]">Pending</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default Complaints;
