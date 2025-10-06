import React, { useState } from 'react';
import Facilities from './components/Facilities';
import Community from './components/Community';
import Engagement from './components/Engagement';
import GateUpdates from './components/GateUpdates';
import FinanceSummary from "./components/FinanceSummary";
import Helpdesk from './components/Helpdesk';

function Dashboard() {
  return (
    <div className="p-6">

      <div className="!columns-1 sm:!columns-2 xl:!columns-3 gap-4">
        <FinanceSummary isStatic={true} />
        <GateUpdates isStatic={true} />
        <Facilities isStatic={true} />
        <Community isStatic={true} />
        <Helpdesk isStatic={true} />
        <Engagement isStatic={true} />
      </div>
    </div>
  );
}

export default Dashboard;
