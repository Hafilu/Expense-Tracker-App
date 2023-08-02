import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../../constant/styles";

function Input({ label, textinputconfigure, style,invalid }) {
  const inputstyle = [styles.input];
  if (textinputconfigure && textinputconfigure.multiline) {
    inputstyle.push(styles.inputmultiline);
  }

  if(invalid){
    inputstyle.push(styles.invalidinput)
  }
  return (
    <View style={[styles.inputcontainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidlabel]}>{label}</Text>
      <TextInput style={inputstyle} {...textinputconfigure} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputcontainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputmultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidlabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidinput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
