import { useContext } from "react";
import Expensesoutput from "../components/expensesoutput/Expensesoutput";
import { Expensescontext } from "../store/Expenses-context";

function Allexpenses() {
  const expcontext = useContext(Expensescontext);
  return (
    <Expensesoutput
      expenses={expcontext.expenses}
      expensesperiod="Total"
      fallbacktext="No registerd expenses found"
    />
  );
}

export default Allexpenses;
