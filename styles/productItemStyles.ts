import { StyleSheet } from "react-native";

export const productItemStyles = StyleSheet.create({
  productContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  productInfo: {
    marginLeft: 10,
    flex: 1,
  },
  productTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#414542",
  },
  imageContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  lockIcon: {
    position: "absolute",
    color: "white",
  },
});
