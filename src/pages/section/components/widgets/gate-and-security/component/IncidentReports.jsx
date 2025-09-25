import React from "react";
import Card from "../../componets/Card";
import { OpenInNewOutlined as OpenInNewOutlinedIcon } from "@mui/icons-material";
import { FaClock } from "react-icons/fa";

function IncidentReports() {
  return (
    <Card
      title="Incident Reports"
      period={
        <OpenInNewOutlinedIcon className="h-5 w-5 text-[#884EA7] cursor-pointer" />
      }
      className="h-[362px]"
    >
      <div className="flex w-full text-center gap-6">
        <div className="flex-1 py-4 bg-red-50">
          <div className="text-2xl font-semibold text-[#AB0000]">3</div>
          <div className="text-sm text-[#AB0000]">Open</div>
        </div>
        <div className="flex-1 py-4 bg-yellow-50">
          <div className="text-2xl font-semibold text-[#E7A015]">5</div>
          <div className="text-sm text-[#E7A015]">In-progress</div>
        </div>
        <div className="flex-1 py-4 bg-green-50">
          <div className="text-2xl font-semibold text-[#1FA05B]">12</div>
          <div className="text-sm text-[#1FA05B]">Closed</div>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between p-3 bg-[#FAFBFD] rounded-md border border-[#FAFBFD]">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full flex items-center justify-center bg-[#AB0000]">
              <div className="text-white text-xs font-bold">!</div>
            </div>
            <div className="text-gray-700 font-medium">INC 001</div>
          </div>
          <div className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 text-[#AB0000] bg-red-50">
            <div>4 - Danger</div>
            <div className="w-2 h-2 rounded-full bg-[#AB0000]" />
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-[#FAFBFD] rounded-md border border-[#FAFBFD]">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full flex items-center justify-center bg-[#E7A015]">
              <FaClock className="text-white text-[10px]" />
            </div>
            <div className="text-gray-700 font-medium">INC 002</div>
          </div>
          <div className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 text-[#E7A015] bg-yellow-50">
            <div>3 - High</div>
            <div className="w-2 h-2 rounded-full bg-[#E7A015]" />
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-[#FAFBFD] rounded-md border border-[#FAFBFD]">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full flex items-center justify-center bg-[#1FA05B]">
              <FaClock className="text-white text-[10px]" />
            </div>
            <div className="text-gray-700 font-medium">INC 003</div>
          </div>
          <div className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 text-[#1FA05B] bg-green-50">
            <div>1 - Low</div>
            <div className="w-2 h-2 rounded-full bg-[#1FA05B]" />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default IncidentReports;
