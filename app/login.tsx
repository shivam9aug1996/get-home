import React from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
  View,
  Text,
} from "react-native";
import ThemedInput from "@/components/ThemedInput";
import { formStyles as styles } from "@/styles/formStyles";
import { useLogin } from "@/hooks/useLogin";

const LoginScreen = () => {
  const {
    mobileNumber,
    setMobileNumber,
    password,
    setPassword,
    isLoading,
    handleLogin,
  } = useLogin();

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.content}>
          <Text style={styles.title}>Login</Text>
          <View style={styles.formContainer}>
            <ThemedInput
              placeholder="Mobile Number"
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              value={mobileNumber}
              onChangeText={setMobileNumber}
              maxLength={10}
            />
            <ThemedInput
              placeholder="Password"
              secureTextEntry
              textContentType="password"
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              testID="login-button"
              style={styles.button}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator style={styles.loaderStyle} color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
