import React from "react";
import Card from "../../components/Card";
import { OpenInNewOutlined as OpenInNewOutlinedIcon } from "@mui/icons-material";

function StaffAttendance() {
  return (
    <Card
      title="Staff Attendance"
      period={
        <OpenInNewOutlinedIcon className="h-5 w-5 text-[#884EA7] cursor-pointer" />
      }
      className="h-[362px]"
    >
      <div>    
      <div className="flex w-full text-center h-[76px] gap-4 mb-2">
        <div className="flex-1 py-4 bg-green-50 rounded-md">
          <div className="text-2xl leading-[18px] font-medium text-[#1FA05B] pb-[8px]">25</div>
          <div className="text-xs leading-[16px] text-[#1FA05B]">Present</div>
        </div>
        <div className="flex-1 py-4 bg-red-50 rounded-md">
          <div className="text-2xl leading-[18px] font-medium text-[#AB0000] pb-[8px]">1</div>
          <div className="text-xs leading-[16px] text-[#AB0000]">Absent</div>
        </div>
      </div>

      <div className="mt-[24px] ">
        <div className="flex justify-between items-center p-3 bg-[#FAFBFD] rounded-md">
          <div className=" font-medium text-xs leading-[18px]">Security guards</div>
          <div className="text-[#64748B] leading[20px] text-sm">12/12 Present</div>
        </div>

        <div className="flex justify-between items-center p-3 bg-[#FAFBFD] rounded-md">
          <div className=" font-medium text-xs leading-[18px]">Housekeeping</div>
          <div className="text-[#64748B] leading[20px] text-sm">7/8 Present</div>
        </div>

        <div className="flex justify-between items-center p-3 bg-[#FAFBFD] rounded-md">
          <div className=" font-medium text-xs leading-[18px]">Maintenance</div>
          <div className="text-[#64748B] leading[20px] text-sm">4/4 Present</div>
        </div>

        <div className="flex justify-between items-center p-3 bg-[#FAFBFD] rounded-md">
          <div className=" font-medium text-xs leading-[18px]">Gardening</div>
          <div className="text-[#64748B] leading[20px] text-sm">2/2 Present</div>
        </div>
        </div>
      </div>
    </Card>
  );
}

export default StaffAttendance;
