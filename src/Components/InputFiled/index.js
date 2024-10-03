import React from "react";
import { StyleSheet, TextInput } from "react-native";

const InputField = ({
  style,
  placeholder,
  onChangeText,
  secureText,
  keyboardType,
  defaultValue,
  onFocus,
  onBlur,
  ref,
  isEdit,
  value,
  returnKeyType,
  multiline,
  textContentType,
}) => {
  return (
    <TextInput
      ref={ref}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      placeholder={placeholder}
      secureTextEntry={secureText}
      style={[styles.input, style]}
      placeholderTextColor={"#fff"}
      defaultValue={defaultValue}
      onFocus={onFocus}
      onBlur={onBlur}
      editable={isEdit}
      returnKeyType={returnKeyType}
      underlineColorAndroid="transparent"
      multiline={multiline}
      textContentType={textContentType}
      cursorColor={"white"}
    />
  );
};
const styles = StyleSheet.create({
  input: {
    height: 50,
    marginTop: 20,
    paddingHorizontal: 30,
    color: "#fff",
    backgroundColor: "#73737E",
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#1EF1F5",
    opacity: 0.8,
  },
});

export default InputField;
