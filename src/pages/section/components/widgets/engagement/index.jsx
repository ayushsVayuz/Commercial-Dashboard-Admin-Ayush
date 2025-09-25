import NoticeBoardStatus from './component/NoticeBoardStatus'
import EventsUtilisation from './component/EventsUtilisation'
import StatCardGrid from "./component/StatsGrid";
import Header from '../../../components/ui/Header';

function Engagement() {
    return (
        <div>
            <Header title="Engagement" description="Insights on community activity" />
            <StatCardGrid isStatic={true} />
            <div className="px-5 grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <NoticeBoardStatus isStatic={true}/>
                <EventsUtilisation isStatic={true}/>
            </div>
        </div>
    );
}

export default Engagement;
