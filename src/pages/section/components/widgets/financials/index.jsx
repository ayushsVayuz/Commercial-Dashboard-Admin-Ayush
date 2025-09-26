import AccountingCard from "./component/AccountingCard";
import ExpenseCategories from "./component/ExpenseCategories";
import CashBankBalance from "./component/CashBankBalance";
import DuesAgeing from "./component/DuesAgeing";
import Budgets from "./component/Budgets";
import Header from "../../../components/ui/Header";

function Financials() {
  return (
    <div>
      <Header title="Financials" description="Units, residents, and occupancy details" />
      <div className="px-5 grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,1fr)] gap-6 mt-6">
          <AccountingCard />
          <ExpenseCategories />
        </div>

      <div className="px-5 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,4fr)] gap-6 mt-6">
          <CashBankBalance />
          <DuesAgeing />
        </div>
      <div className="px-5 mt-6">
        <Budgets />
      </div>
    </div>
  );
}

export default Financials;
