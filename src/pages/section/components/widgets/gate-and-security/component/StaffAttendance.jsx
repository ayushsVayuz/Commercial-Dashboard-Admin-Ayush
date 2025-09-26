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
      <div className="flex w-full text-center gap-6">
        <div className="flex-1 py-4 bg-green-50 rounded-md">
          <div className="text-2xl font-semibold text-green-600">25</div>
          <div className="text-sm text-green-600">Present</div>
        </div>
        <div className="flex-1 py-4 bg-red-50 rounded-md">
          <div className="text-2xl font-semibold text-[#AB0000]">1</div>
          <div className="text-sm text-[#AB0000]">Absent</div>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between items-center p-3 bg-[#FAFBFD] rounded-md">
          <div className="font-sm">Security guards</div>
          <div className="text-gray-500">12/12 Present</div>
        </div>

        <div className="flex justify-between items-center p-3 bg-[#FAFBFD] rounded-md">
          <div className="font-sm">Housekeeping</div>
          <div className="text-gray-500">7/8 Present</div>
        </div>

        <div className="flex justify-between items-center p-3 bg-[#FAFBFD] rounded-md">
          <div className="font-sm">Maintenance</div>
          <div className="text-gray-500">4/4 Present</div>
        </div>

        <div className="flex justify-between items-center p-3 bg-[#FAFBFD] rounded-md">
          <div className="font-sm">Gardening</div>
          <div className="text-gray-500">2/2 Present</div>
        </div>
      </div>
    </Card>
  );
}

export default StaffAttendance;
