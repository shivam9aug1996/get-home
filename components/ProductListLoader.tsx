import React from "react";
import { View } from "react-native";
import { Skeleton } from "react-native-skeletons";
import { productItemStyles } from "@/styles/productItemStyles";

const ProductListLoader = () => {
  const styles = productItemStyles;

  // Mock data for 4 items
  const mockData = Array.from({ length: 5 }).map((_, index) => ({
    id: index,
    key: `item-${index}`,
  }));

  return (
    <>
      {mockData.map((item) => (
        <View key={item.key} style={styles.productContainer} testID={item?.key}>
          <View style={styles.imageContainer}>
            <Skeleton style={styles.productImage} />
          </View>

          <View style={styles.productInfo}>
            <Skeleton style={{ height: 20 }} />
          </View>
        </View>
      ))}
    </>
  );
};

export default ProductListLoader;
