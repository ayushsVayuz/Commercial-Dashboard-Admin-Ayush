import { useState } from "react";

const FinancialSummary = ({ data, formatCurrencyShort }) => {
  const [selectedView, setSelectedView] = useState("income");

  const incomeData = [
    {
      name: "Opening Balance",
      value: data.finance?.incomeSummary?.opening_balance || 0,
      color: COLORS.green,
    },
    {
      name: "Income",
      value: data.finance?.incomeSummary?.income || 0,
      color: COLORS.blue,
    },
    {
      name: "Collection",
      value: data.finance?.incomeSummary?.collection || 0,
      color: COLORS.purple,
    },
    {
      name: "Closing Balance",
      value: data.finance?.incomeSummary?.closing_balance || 0,
      color: COLORS.irishBlue,
    },
  ];

  const expData = [
    {
      name: "Expenditure",
      value: data.finance?.expenditureSummary?.expenditure || 0,
      color: COLORS.red,
    },
    {
      name: "Payment",
      value: data.finance?.expenditureSummary?.payment || 0,
      color: COLORS.amber,
    },
    {
      name: "Outstanding",
      value: data.finance?.expenditureSummary?.outstanding || 0,
      color: COLORS.gamboge,
    },
  ];

  const renderList = (list) => (
    <div className="text-sm text-gray-600 space-y-1">
      {list.map((item, idx) => (
        <div key={idx} className="flex justify-between">
          <span>{item.name}</span>
          <span className="font-medium text-gray-800">
            AED {formatCurrencyShort(item.value)}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex gap-6">
      <div className="w-1/2">{renderList(incomeData)}</div>
      <div className="w-1/2">{renderList(expData)}</div>
    </div>
  );
};

export default FinancialSummary;

export const COLORS = {
  white: "#FFFFFF",
  lightGray: "#f1f3f5",
  gray: "#e9ecef",
  darkGray: "#64748B",
  slate: "#f8f9fa",
  primary: "#4F46E5",
  green: "#10B981",
  red: "#EF4444",
};
