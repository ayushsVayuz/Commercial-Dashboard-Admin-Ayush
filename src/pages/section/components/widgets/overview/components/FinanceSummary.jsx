import Card from "../../../../../../components/ui/Card";
import { LuReceiptText } from "react-icons/lu";

function FinanceSummary({ isStatic, data }) {
  const income = data?.incomeSummary || {};
  const expenditure = data?.expenditureSummary || {};

  function formatCurrency(value) {
    if (value === null || value === undefined || isNaN(value)) return "0";

    const num = Number(value);

    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(2) + "B";
    } else if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(2) + "M";
    } else if (num >= 1_000) {
      return (num / 1_000).toFixed(2) + "K";
    } else {
      return num.toFixed(2);
    }
  }

  return (
    <Card
      title="Income"
      period="This Month"
      icon={<LuReceiptText className="text-2xl text-green-600" />}
      className="mb-4 break-inside-avoid "
    >
      <div className="grid grid-cols-4 text-xs text-gray-500 mb-2">
        <span>Opening</span>
        <span>Income</span>
        <span>Collection</span>
        <span>Closing</span>
      </div>

      <div className="grid grid-cols-4 text-sm font-medium text-gray-900 mb-4">
        <span>{formatCurrency(income.opening_balance)} AED</span>
        <span>{formatCurrency(income.income)} AED</span>
        <span>{formatCurrency(income.collection)} AED</span>
        <span>{formatCurrency(income.closing_balance)} AED</span>
      </div>

      <hr className="my-2 border-t border-dashed border-gray-300" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LuReceiptText className="text-2xl text-red-600" />
          <div
            style={{ fontWeight: 500, fontSize: "16px", lineHeight: "20px" }}
            className="!my-0 !font-medium !text-[16px] !leading-[20px] !text-[#121212]"
          >
            Expenditure
          </div>
        </div>

        <span className="!text-xs !leading-[16px] !text-[#64748B]">
          This Month
        </span>
      </div>

      <div className="grid grid-cols-4 text-xs text-gray-500 mb-2">
        <span>Opening</span>
        <span>Expenditure</span>
        <span>Payment</span>
        <span>Outstanding</span>
      </div>

      <div className="grid grid-cols-4 text-sm font-medium text-gray-900">
        <span>{formatCurrency(expenditure.opening_balance)} AED</span>
        <span>{formatCurrency(expenditure.expenditure)} AED</span>
        <span>{formatCurrency(expenditure.payment)} AED</span>
        <span>{formatCurrency(expenditure.outstanding)} AED</span>
      </div>
    </Card>
  );
}

export default FinanceSummary;
