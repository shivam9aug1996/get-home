import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { useDispatch } from "react-redux";
import {
  loadAuthDataFromAsyncStorage,
  setAuth,
} from "@/redux/features/authSlice";

const AppNavigator = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const loadInitialAuthState = async () => {
      const { token, userData } = await loadAuthDataFromAsyncStorage();
      dispatch(setAuth({ token, userData: JSON.stringify(userData) }));
    };
    loadInitialAuthState();
  }, [dispatch]);
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
      <Stack.Screen name="login" options={{ headerShown: true, title: "" }} />
      <Stack.Screen name="signup" options={{ headerShown: true, title: "" }} />
    </Stack>
  );
};

export default AppNavigator;
