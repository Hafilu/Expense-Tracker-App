import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Expenseform from "../components/manageexpense/Expenseform";
import Erroroverlay from "../components/ui/Erroroverlay";
import Iconbutton from "../components/ui/Iconbutton";
import Loadingoverlay from "../components/ui/Loadingoverlay";
import { GlobalStyles } from "../constant/styles";
import { Expensescontext } from "../store/Expenses-context";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";

function Manageexpense({ route, navigation }) {
  const [issubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const expcontext = useContext(Expensescontext);
  const editedexpenseid = route.params?.expenseid;
  const isediting = !!editedexpenseid;

  const selectedexpense = expcontext.expenses.find(
    (expense) => expense.id === editedexpenseid
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isediting ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isediting]);

  async function deleteExpenseHnadler() {
    setIsSubmitting(true);
    try {
      await deleteExpense(editedexpenseid);
      expcontext.deleteExpense(editedexpenseid);
      navigation.goBack();
    } catch(error) {
      setError("Could not delete expense - Please try again later")
      setIsSubmitting(false)
    }
  }
  function cancelHandler() {
    navigation.goBack();
  }
  async function confirmHandler(expensedata) {
    setIsSubmitting(true);
    try{
       if (isediting) {
      await updateExpense(editedexpenseid, expensedata);
      expcontext.updateExpense(editedexpenseid, expensedata);
    } else {
      const id = await storeExpense(expensedata);
      expcontext.addExpense({ ...expensedata, id: id });
    }
    navigation.goBack();
    }catch(error){
      setError("Could not save expense - Please try again later")
      setIsSubmitting(false)
    }
  }
 

  if(error && !issubmitting){
    return <Erroroverlay message={error} />
  }

  if (issubmitting) {
    return <Loadingoverlay />;
  }
  return (
    <View style={styles.container}>
      <Expenseform
        submitbuttonLabel={isediting ? "UPDATE" : "ADD"}
        oncancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultvalue={selectedexpense}
      />
      {isediting && (
        <View style={styles.deletecontainer}>
          <Iconbutton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHnadler}
          />
        </View>
      )}
    </View>
  );
}

export default Manageexpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deletecontainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
