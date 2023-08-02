import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constant/styles";
import { getFormatedDate } from "../../util/Date";

function Expenseitem({id, description, amount, date }) {
  const navigation = useNavigation();
  function expensePressHandler() {
    navigation.navigate("ManageExpense",{expenseid:id});
  }
  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.expenseitem}>
        <View>
          <Text style={[styles.textbase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textbase}>{getFormatedDate(date)}</Text>
        </View>
        <View style={styles.amountcontainer}>
          <Text style={styles.amount}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default Expenseitem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  expenseitem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 4,
  },
  textbase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountcontainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
});
