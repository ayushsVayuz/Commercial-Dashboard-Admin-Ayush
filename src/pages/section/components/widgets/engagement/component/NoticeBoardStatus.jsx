import { OpenInNewOutlined as OpenInNewOutlinedIcon } from "@mui/icons-material";
import Card from "../../components/Card";
function StatusCard({ label, value, subLabel, bgColor, textColor }) {
  return (
    <div className={`rounded-lg p-4 ${bgColor}`}>
      <h3 className={`text-sm font-medium ${textColor}`}>{label}</h3>
      <div className="mt-1 text-2xl font-semibold text-[#121212]">{value}</div>
      <p className="text-xs text-slate-500 mt-1">{subLabel}</p>
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
      className="w-full"
    >
      <div className="grid grid-cols-2 gap-4">
        <StatusCard
          label="Active"
          value={138}
          subLabel="3 expiring soon"
          bgColor="bg-emerald-50"
          textColor="text-emerald-600"
        />
        <StatusCard
          label="Scheduled"
          value={13}
          subLabel="4 this week"
          bgColor="bg-amber-50"
          textColor="text-amber-600"
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
          bgColor="bg-slate-100"
          textColor="text-slate-600"
        />
      </div>
    </Card>
  );
}
