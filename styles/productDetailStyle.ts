import { StyleSheet } from "react-native";

export const productDetailStyle = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  imageContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    marginBottom: 20,
  },
  lockIcon: {
    color: "white",
    alignSelf: "center",
  },
  detailsContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addressText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  descriptionText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    lineHeight: 22,
  },
  distanceText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  unlockButton: {
    backgroundColor: "#ff6347",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: "center",
    minWidth: 70,
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  activityIndicator: {
    padding: 0,
    color: "#fff",
  },
  unlockContainer: {
    position: "absolute",
  },
});
