import { useSignupMutation } from "@/redux/features/authSlice";
import { validateSignupForm } from "@/utils/functions";
import { router } from "expo-router";
import { useRef, useState } from "react";
import Toast from "react-native-root-toast";

export const useSignup = () => {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [signupMutation, { isLoading }] = useSignupMutation();
  const toastId = useRef(null);

  const handleSignup = () => {
    if (toastId.current) Toast.hide(toastId.current);
    const validationError = validateSignupForm(name, mobileNumber, password);
    if (validationError) {
      toastId.current = Toast.show(validationError, {
        position: Toast.positions.TOP,
      });
      return;
    }
    signupMutation({ name, mobileNumber, password })
      .unwrap()
      .then(() => {
        router.replace("/");
      })
      .catch((err) => {
        toastId.current = Toast.show(
          typeof err === "string" ? err : err?.data?.message,
          { position: Toast.positions.TOP }
        );
      });
  };

  return {
    name,
    setName,
    mobileNumber,
    setMobileNumber,
    password,
    setPassword,
    isLoading,
    handleSignup,
  };
};
