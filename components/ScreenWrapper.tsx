import { StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenWrapperProps } from "@/types/detailTypes";

const ScreenWrapper = ({ children }: ScreenWrapperProps) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
