import { OpenInNewOutlined as OpenInNewOutlinedIcon } from "@mui/icons-material";
import Card from "../../components/Card";
function StatusCard({ label, value, subLabel, bgColor, textColor }) {
  return (
    <div className={`rounded-lg p-4 ${bgColor} h-[124px]`}>
      <div className={`text-base font-medium ${textColor} leading-[20px]` }>{label}</div>
      <div className="mt-4 text-[28px] leading-[32px] font-semibold text-[#121212]">{value}</div>
      <div className="text-xs leading-[16px] text-[#64748B] mt-2">{subLabel}</div>
    </div>
  );
}

export default function NoticeBoardStatus() {
  return (
    <Card
      title="Notice Board Status"
      period={
        <OpenInNewOutlinedIcon className="h-5 w-5 text-[#884EA7] cursor-pointer" />
      }
      className="w-full h-[360px]"
    >
      <div className="grid grid-cols-2 gap-4">
        <StatusCard
          label="Active"
          value={138}
          subLabel="3 expiring soon"
          bgColor="bg-[#F0FFF7]"
          textColor="text-[#1FA05B]"
        />
        <StatusCard
          label="Scheduled"
          value={13}
          subLabel="4 this week"
          bgColor="bg-[#FFFBF2]"
          textColor="text-[#E7A015]"
        />
        <StatusCard
          label="Recurring"
          value={3}
          subLabel="All active"
          bgColor="bg-[#EDF6FF]"
          textColor="text-[#329DFF]"
        />
        <StatusCard
          label="Expired"
          value={7}
          subLabel="4 recent"
          bgColor="bg-[#F6F6F6]"
          textColor="text-[#64748B]"
        />
      </div>
    </Card>
  );
}
