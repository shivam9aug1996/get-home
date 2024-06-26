import React from "react";
import { Stack } from "expo-router";

const HomeStack = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="detail" options={{ headerShown: true, title: "" }} />
    </Stack>
  );
};

export default HomeStack;
