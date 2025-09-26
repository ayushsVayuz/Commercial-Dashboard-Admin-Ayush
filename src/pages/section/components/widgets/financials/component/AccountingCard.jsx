import React from "react";
import { OpenInNewOutlined as OpenInNewOutlinedIcon } from "@mui/icons-material";
import Card from "../../componets/Card";
import IncomeExpenditure from "./IncomeExpenditure";

function StatusCard({
  label,
  value,
  positive,
  bgColor,
  delta,
  deltaLabel,
  textColor,
}) {
  return (
    <div className={`rounded-lg p-4 ${bgColor}`}>
      <div className={`text-sm font-medium ${textColor}`}>{label}</div>
      <div className="mt-1 text-2xl font-semibold text-[#121212]">{value}</div>
      <div className="mt-2 flex items-center gap-2 text-sm">
        <div
          className={
            positive
              ? "text-emerald-600 font-medium"
              : "text-rose-600 font-medium"
          }
        >
          {delta}
        </div>
        <div className="text-slate-500">{deltaLabel}</div>
      </div>
    </div>
  );
}

export default function AccountingCard() {
  return (
    <Card
      title="Accounting"
      className="w-full h-[523px]"
      period={
        <OpenInNewOutlinedIcon className="h-5 w-5 text-[#884EA7] cursor-pointer" />
      }
      childrenClassName="space-y-6"
    >
      <div className="grid grid-cols-2 gap-4">
        <StatusCard
          label="Total Income"
          value="AED 5.68M"
          delta="+4.4%"
          positive
          bgColor="bg-slate-50"
          deltaLabel="Compared to last month"
          textColor="text-[#1FA05B]"
        />
        <StatusCard
          label="Total Expenditure"
          value="AED 1.83M"
          delta="-1.1%"
          positive={false}
          bgColor="bg-slate-50"
          deltaLabel="Compared to last month"
          textColor="text-[#AB0000]"
        />
      </div>
      <div className="h-[70%]">
        <IncomeExpenditure />
      </div>
    </Card>
  );
}
