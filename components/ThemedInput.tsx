import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { ThemedInputProps } from "@/types/detailTypes";

const ThemedInput = ({ style, ...props }: ThemedInputProps) => {
  return (
    <TextInput
      style={[styles.input, { color: Colors["light"].text }, style]}
      placeholderTextColor={Colors["light"].text}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ThemedInput;
