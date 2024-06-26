import { useLoginMutation } from "@/redux/features/authSlice";
import { validateLoginForm } from "@/utils/functions";
import { useRef, useState } from "react";
import Toast from "react-native-root-toast";
import { router } from "expo-router";

export const useLogin = () => {
  const [loginMutation, { isLoading }] = useLoginMutation();
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const toastId = useRef(null);

  const handleLogin = () => {
    if (toastId.current) Toast.hide(toastId.current);
    const validationError = validateLoginForm(mobileNumber, password);
    if (validationError) {
      toastId.current = Toast.show(validationError, {
        position: Toast.positions.TOP,
      });
      return;
    }
    loginMutation({ mobileNumber, password })
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
    mobileNumber,
    setMobileNumber,
    password,
    setPassword,
    isLoading,
    handleLogin,
  };
};
