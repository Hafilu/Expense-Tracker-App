import { useContext, useEffect, useState } from "react";
import Expensesoutput from "../components/expensesoutput/Expensesoutput";
import Erroroverlay from "../components/ui/Erroroverlay";
import Loadingoverlay from "../components/ui/Loadingoverlay";
import { Expensescontext } from "../store/Expenses-context";
import { getDateMinusDays } from "../util/Date";
import { fetchExpense } from "../util/http";

function Recentexpenses() {
  const expcontext = useContext(Expensescontext);
  const [isfetching, setIsFetching] = useState(true);
  const [error, setError] = useState()

  useEffect(() => {
    async function getExpense() {
      try{
        const expenses = await fetchExpense();
        expcontext.setExpenses(expenses);
      }catch(error){
        setError("Could not fetch expenses!")
      }
      setIsFetching(false)
      
    }
    getExpense();
  }, []);

  

  if(error && !isfetching){
    return <Erroroverlay message={error}  />
  }

  if(isfetching){
    return <Loadingoverlay/>
  }

  const recentexpenses = expcontext.expenses.filter((expense) => {
    const today = new Date();
    const date7daysago = getDateMinusDays(today, 7);
    return expense.date >= date7daysago && expense.date <= today;
  });
  return (
    <Expensesoutput
      expenses={recentexpenses}
      expensesperiod="Last 7 Days"
      fallbacktext="No expenses registerd for the last 7 days"
    />
  );
}

export default Recentexpenses;
