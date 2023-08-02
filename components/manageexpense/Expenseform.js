import { useState } from "react";
import {StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constant/styles";
import { getFormatedDate } from "../../util/Date";
import Button from "../ui/Button";
import Input from "./Input";

function Expenseform({ oncancel, submitbuttonLabel, onSubmit, defaultvalue }) {
  const [inputs, setinputs] = useState({
    amount: {
      value: defaultvalue ? defaultvalue.amount.toString() : "",
      isvalid: true,
    },
    date: {
      value: defaultvalue ? getFormatedDate(defaultvalue.date) : "",
      isvalid: true,
    },
    description: {
      value: defaultvalue ? defaultvalue.description : "",
      isvalid: true,
    },
  });

  function inputChangeHandler(inputidentifier, enterdinput) {
    setinputs((currentinputs) => {
      return {
        ...currentinputs,
        [inputidentifier]: { value: enterdinput, isvalid: true },
      };
    });
  }

  function submitHandler() {
    const expensedata = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountisvalid = !isNaN(expensedata.amount) && expensedata.amount > 0;
    const dateisvalid = expensedata.date.toString() !== "Invalid Date";
    const descriptionisvalid = expensedata.description.trim().length > 0;

    if (!amountisvalid || !dateisvalid || !descriptionisvalid) {
      //Alert.alert("Invalid Input", "Please Check Your Input Values");
      setinputs((currentinputs) => {
        return {
          amount: { value: currentinputs.amount.value, isvalid: amountisvalid },
          date: { value: currentinputs.date.value, isvalid: dateisvalid },
          description: {
            value: currentinputs.description.value,
            isvalid: descriptionisvalid,
          },
        };
      });
      return;
    }
    onSubmit(expensedata);
  }

  const formisinvalid = !inputs.amount.isvalid || !inputs.date.isvalid || !inputs.description.isvalid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputrow}>
        <Input
          style={styles.rowinput}
          label="Amount"
          invalid={!inputs.amount.isvalid}
          textinputconfigure={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.rowinput}
          label="Date"
          invalid={!inputs.date.isvalid}
          textinputconfigure={{
            placeholder: "YYYY-MM-DD",
            keyboardType: "decimal-pad",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isvalid}
        textinputconfigure={{
          multiline: true,
          // autoCapitalize : "none",
          // autoCorrect : false // default is true
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      {formisinvalid && <Text style={styles.errortext}>Invalid Input-Please Check Your Input Values</Text>}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={oncancel}>
          CANCEL
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitbuttonLabel}
        </Button>
      </View>
    </View>
  );
}

export default Expenseform;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 24,
  },
  inputrow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowinput: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errortext:{
    textAlign:"center",
    color:GlobalStyles.colors.error500,
    margin:8
  },
  
});
