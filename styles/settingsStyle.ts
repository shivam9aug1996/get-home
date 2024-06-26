import { StyleSheet } from "react-native";

export const settingsStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  heading: {
    marginVertical: 20,
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  buttonsContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    backgroundColor: "#a679a6",
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  userInfoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "#ff6347",
  },
});
