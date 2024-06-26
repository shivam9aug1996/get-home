import ScreenWrapper from "@/components/ScreenWrapper";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/features/authSlice";
import { settingsStyle } from "@/styles/settingsStyle";
import LinkButton from "@/components/LinkButton";
import { unlockProductApi } from "@/redux/features/unlockProductSlice";

const SettingScreen = () => {
  const userData = useSelector((state: any) => state?.auth?.userData);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(unlockProductApi.util.resetApiState());
    dispatch(unlockProductApi.util.invalidateTags(["unlockProducts"]));
  };
  const styles = settingsStyle;

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.heading}>Settings</Text>
        {!userData ? (
          <View style={styles.buttonsContainer}>
            <LinkButton
              href="/login"
              style={styles.button}
              textStyle={styles.buttonText}
            >
              Login
            </LinkButton>
            <LinkButton
              href="/signup"
              style={styles.button}
              textStyle={styles.buttonText}
            >
              Sign Up
            </LinkButton>
          </View>
        ) : (
          <View style={styles.userInfoContainer}>
            <Text style={styles.welcomeText}>
              Welcome back, {userData?.name}!
            </Text>
            <TouchableOpacity
              style={[styles.button, styles.logoutButton]}
              onPress={handleLogout}
            >
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default SettingScreen;
