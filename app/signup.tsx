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
import { useSignup } from "@/hooks/useSignUp";

const SignupScreen = () => {
  const {
    name,
    setName,
    mobileNumber,
    setMobileNumber,
    password,
    setPassword,
    isLoading,
    handleSignup,
  } = useSignup();

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.content}>
          <Text style={styles.title}>Signup</Text>
          <View style={styles.formContainer}>
            <ThemedInput
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
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
              testID="signup-button"
              style={styles.button}
              onPress={handleSignup}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator style={styles.loaderStyle} color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Signup</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
