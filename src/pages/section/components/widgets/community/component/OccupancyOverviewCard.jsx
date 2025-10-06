import React from "react";
import { GoPeople } from "react-icons/go";

const MiniPill = ({ value = 0, total = 1, colorClass = "", label = "" }) => {
  const pct = Math.max(0, Math.min(100, (value / (total || 1)) * 100));

  const valueTextColor =
    colorClass === "bg-[#8B5CF6]"
      ? "text-[#8B5CF6]"
      : colorClass === "bg-[#12B981]"
      ? "text-[#12B981]"
      : "text-slate-600";
  return (
    <div className="flex flex-col items-start">
      <div className="w-2/3 min-w-[80px] h-3 rounded-full overflow-hidden">
        <div
          className={`h-3 rounded-full ${colorClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className={`${valueTextColor} text-xs font-bold mt-1`}>{value}</div>
      <div className="text-xs text-[#64748B] mt-1">{label}</div>
    </div>
  );
};

const StatTile = ({ title, value, suffix, valueClass = "" }) => (
  <div className="bg-white border border-[#EBEBEB] rounded-xl shadow-[0_0_12px_0_#EAF2FF] h-[98px] p-4 flex flex-col justify-center">
    <div className="text-xs leading-[16px] text-[#121212] mb-1">{title}</div>
    <div className={`text-[28px] leading-[32px] flex item gap-1 font-medium ${valueClass}`}>
      {value}{" "}
      {suffix && (
        <div className="text-[28px] leading-[32px] font-medium">{suffix}</div>
      )}
    </div>
  </div>
);

const OccupancyOverviewCard = ({
  totalUnits = 847,
  occupiedUnits = 756,
  ownerCount = 700,
  tenantCount = 56,
  avgResidents = 4.4,
  avgLeaseMonths = 18,
}) => {
  const barTotal = ownerCount + tenantCount;

  return (
    <div>
      <div className="bg-white border border-[#EBEBEB] rounded-xl shadow-[0_0_12px_0_#EAF2FF] p-4 h-[128px]">
        <div className="flex items-center gap-3 mb-4">
          <GoPeople className="h-6 w-6 text-[#329DFF]" />
          <div className="font-medium text-[#121212]">Occupancy Overview</div>
        </div>

        <div className="flex items-center justify-between gap-">
          <div>
            <div className="text-xs leading-[16px] text-[#64748B]">
              Occupied Units
            </div>
            <div className="flex items-center gap-1">
              <div className="text-[28px] leading-[32px] font-medium text-[#121212]">
                {occupiedUnits}
              </div>
              <div className="text-[#64748B] text-xl leading-[32px]">
                /{totalUnits}
              </div>
            </div>
          </div>

          <div className="flex items-end">
            <MiniPill
              value={ownerCount}
              total={barTotal}
              colorClass="bg-[#8B5CF6]"
              label="Owner"
            />
            <MiniPill
              value={tenantCount}
              total={barTotal}
              colorClass="bg-[#12B981]"
              label="Tenant"
            />
          </div>
        </div>
      </div>

      <div className="mt-2.5 grid grid-cols-2 gap-3">
        <StatTile
          title="Avg Residents Per Unit"
          value={avgResidents}
          valueClass="text-[#8B5CF6]"
        />
        <StatTile
          title="Avg Lease Period"
          value={avgLeaseMonths}
          suffix="months"
          valueClass="text-[#E7A015]"
        />
      </div>
    </div>
  );
};

export default OccupancyOverviewCard;