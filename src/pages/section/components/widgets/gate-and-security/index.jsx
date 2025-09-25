
import Header from '../../../components/ui/Header';
import Stats from "./component/StatsGrid"
import GuardPatrols from "./component/GuardPatrols"
import HourlyTrafficFlow from './component/HourlyTrafficFlow';
import IncidentReports from './component/IncidentReports';
import StaffAttendance from './component/StaffAttendance';
function GateandSecurity() {
    return (
        <div>
            <Header title="Gate & Security" description="Security & access Control" />
            <Stats/>

             <div className="px-5 grid grid-cols-1 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,3.5fr)] gap-6 mt-6">
            <GuardPatrols/>
            <HourlyTrafficFlow/>
        </div>
             <div className="px-5 grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <IncidentReports/>
            <StaffAttendance/>
        </div>
        </div>
    );
}

export default GateandSecurity;
