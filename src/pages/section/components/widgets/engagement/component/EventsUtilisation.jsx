import { OpenInNewOutlined as OpenInNewOutlinedIcon } from "@mui/icons-material";
import Card from "../../../../../../components/ui/Card";
function EventItem({ title, date, rsvp, utilisation, status }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-[#121212]">{title}</h3>
        <span
          className={`text-xs font-medium px-2 py-0.5  ${
            status === "Completed"
              ? "text-[#36AB6C] bg-[#E6F7EE]"
              : status === "Upcoming"
              ? "text-[#329DFF] bg-[#E6F2FF]"
              : "text-slate-500 bg-slate-100"
          }`}
        >
          {status}
        </span>
      </div>

      <p className="text-xs text-slate-500">{date}</p>

      <div className="flex justify-between items-center text-xs mt-1">
        <span className="text-slate-600">{rsvp} RSVP</span>
        <span className="text-[#3C82F6] font-semibold">
          {utilisation}% utilisation
        </span>
      </div>

      <div className="w-full bg-slate-100 h-2 rounded mt-2">
        <div
          className="h-2 rounded bg-[#3C82F6]"
          style={{ width: `${utilisation}%` }}
        ></div>
      </div>
    </div>
  );
}

export default function EventsUtilisation() {
  return (
    <Card
      title="Events Utilisation"
      period={
        <OpenInNewOutlinedIcon className="h-5 w-5 text-[#884EA7] cursor-pointer" />
      }
      className="w-full"
    >
      <EventItem
        title="Holi Celebration"
        date="25 Jun 2025"
        rsvp="78/100"
        utilisation={71}
        status="Upcoming"
      />
      <EventItem
        title="Maintenance Meeting"
        date="25 Jun 2025"
        rsvp="45/60"
        utilisation={75}
        status="Completed"
      />
      <EventItem
        title="Security Briefing"
        date="25 Jun 2025"
        rsvp="45/60"
        utilisation={75}
        status="Completed"
      />
    </Card>
  );
}
