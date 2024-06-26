import React from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import ProductItem from "@/components/ProductItem";
import useProductList from "@/hooks/useProductList";
import ProductListLoader from "@/components/ProductListLoader";

const ProductList = () => {
  const {
    refreshing,
    isLoading,
    isError,
    error,
    productData,
    unlockFetchData,
    isFetching,
    onRefresh,
  } = useProductList();

  const renderProductItem = ({ item }: { item: string }) => (
    <ProductItem
      product={productData?.productsById[item]}
      unlockedProperties={unlockFetchData?.unlockedProperties}
      isLoading={isLoading}
      isFetching={isFetching}
    />
  );

  const err = error as { message: string };

  return (
    <ScreenWrapper>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Properties</Text>
      </View>
      {isError && (
        <View style={styles.errorContainer}>
          <Text>Error: {err?.message}</Text>
        </View>
      )}
      {isLoading || isFetching ? (
        <ProductListLoader />
      ) : (
        <FlatList
          style={{ opacity: isLoading || isFetching ? 0.5 : 1 }}
          refreshing={refreshing}
          onRefresh={onRefresh}
          data={productData?.productIds}
          keyExtractor={(item) => item}
          renderItem={renderProductItem}
        />
      )}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#f0f0f0",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default ProductList;
