import React from "react";
import { OpenInNewOutlined as OpenInNewOutlinedIcon } from "@mui/icons-material";
import Card from "../../components/Card";
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
    <div className={`rounded-lg p-4 ${bgColor} border border-[#EBEBEB] h-[126px]`}>
      <div className={`text-base leading-[20px] ${textColor}`}>{label}</div>
      <div className="mt-[16px] leading-[28px]  text-2xl font-medium text-[#121212]">{value}</div>
      <div className="mt-[8px] flex items-center gap-2 leading-[14px] text-[10px]">
        <div
          className={
            positive
              ? "text-[#1FA05B] font-medium"
              : "text-[#EF4444] font-medium"
          }
        >
          {delta}
        </div>
        <div className="text-[#64748B] ">{deltaLabel}</div>
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
      titleWeight="semi-bold"
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
      <div className="h-[254px] mt-[35.5px]">
        <IncomeExpenditure />
      </div>
    </Card>
  );
}
