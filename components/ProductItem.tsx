import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ProductListItemProps } from "@/types/detailTypes";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { productItemStyles } from "@/styles/productItemStyles";

const ProductItem: React.FC<ProductListItemProps> = ({
  product,
  unlockedProperties,
  isLoading,
  isFetching,
}) => {
  const isUnlocked = unlockedProperties?.some(
    (unlock) => unlock.propertyId === product._id
  );
  const styles = productItemStyles;

  return (
    <Link
      href={{
        pathname: "/detail",
        params: {
          data: JSON.stringify({
            isUnlocked,
            product,
          }),
        },
      }}
      asChild
      style={{ pointerEvents: isLoading || isFetching ? "none" : "auto" }}
    >
      <TouchableOpacity style={styles.productContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={[styles.productImage, { opacity: isUnlocked ? 1 : 0.5 }]}
          />
          {!isUnlocked && (
            <Ionicons
              testID="lock-icon-2"
              style={styles.lockIcon}
              name="lock-closed"
              size={20}
            />
          )}
        </View>

        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{product.address.value}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default ProductItem;
