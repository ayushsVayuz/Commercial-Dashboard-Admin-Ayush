import { useState } from "react";
import {FaHeadset} from "react-icons/fa";
import { LuBuilding } from "react-icons/lu";
import { LuWaves } from "react-icons/lu";
import { GoHome } from "react-icons/go";
import { LuDoorOpen } from "react-icons/lu";
import { LuMessageSquare } from "react-icons/lu";
import { LiaMoneyBillSolid } from "react-icons/lia";


const tabs = [
  { name: "Overview", icon: GoHome },
  { name: "Community", icon: LuBuilding },
  { name: "Financials", icon: LiaMoneyBillSolid },
  { name: "Facilities", icon: LuDoorOpen },
  { name: "Gate & Security", icon: LuWaves },
  { name: "Helpdesk", icon: FaHeadset },
  { name: "Engagement", icon: LuMessageSquare },
];

function MainHeader() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="flex gap-2 p-3">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.name;

        return (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center gap-2 rounded px-4 py-3 text-sm leading-[16px] font-medium transition 
              ${
                isActive
                  ? "bg-[#FBF5FF] text-[#884EA7]"
                  : "bg-white text-[#64748B] hover:bg-gray-50"
              }`}
          >
            <Icon className="h-[15px] w-[15px] font-bold"/>
            {tab.name}
          </button>
        );
      })}
    </div>
  );
}

export default MainHeader;
