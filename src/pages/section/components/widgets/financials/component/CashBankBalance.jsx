import React from "react";
import Card from "../../components/Card";
import { OpenInNewOutlined as OpenInNewOutlinedIcon } from "@mui/icons-material";

const CashBankBalance = () => {
  const accounts = [
    { title: "Primary Account", amount: 2850000, subtitle: "Savings" },
    { title: "Emergency Fund", amount: 1200000, subtitle: "Fixed deposit" },
    { title: "Maintenance Fund", amount: 680000, subtitle: "Current" },
  ];

  const total = accounts.reduce((sum, acc) => sum + acc.amount, 0);

  const formatCurrency = (num) => {
    if (num >= 1000000) return `AED ${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `AED ${(num / 1000).toFixed(1)}K`;
    return `AED ${num}`;
  };

  return (
    <Card
      title="Cash & Bank Balance"
      className="w-full h-[362px]"
      period={
        <OpenInNewOutlinedIcon className="h-5 w-5 text-[#884EA7] cursor-pointer" />
      }
    >
      <div className="flex flex-col gap-3">
        {accounts.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between bg-[#F9FAFB] rounded-lg p-3"
          >
            <div className="flex flex-col">
              <div className="text-sm font-medium text-[#121212]">
                {item.title}
              </div>
              <div className="text-xs text-[#64748B]">{item?.subtitle}</div>
            </div>

            <div className="flex flex-col items-end">
              <div className="text-sm text-[#1FA05B] font-semibold">
                {formatCurrency(item.amount)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-[#EBEBEB] h-[68px] px-3">
        <div className="text-sm font-medium text-[#121212]">Total</div>
        <div className="text-base text-[#1FA05B] font-bold">
          {formatCurrency(total)}
        </div>
      </div>
    </Card>
  );
};

export default CashBankBalance;
