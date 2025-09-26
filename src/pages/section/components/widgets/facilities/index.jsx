
import Header from '../../../components/ui/Header';
import AssetValueBreakdown from './component/AssetValueBreakdown';
import RevenuebyCategory from './component/RevenuebyCategory';
import Stats from "./component/StatsGrid"
function Facilities() {
    return (
        <div>
            <Header title="Facilities" description="Facility bookings overview" />
            <Stats isStatic={true}/>

             <div className="px-5 grid grid-cols-1 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,3.5fr)] gap-6 mt-6">
            <AssetValueBreakdown isStatic={true}/>
            <RevenuebyCategory isStatic={true}/>
        </div>
        </div>
    );
}

export default Facilities;
