import React from "react";
import {
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import usePropertyDetail from "@/hooks/usePropertyDetail";
import { productDetailStyle } from "@/styles/productDetailStyle";

const Detail = () => {
  const { currentProduct, isLoading, isNearby, handleUnlock } =
    usePropertyDetail();
  const styles = productDetailStyle;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          testID="product-image"
          source={{ uri: currentProduct?.data?.image }}
          style={[
            styles.productImage,
            { opacity: !currentProduct?.isUnlocked ? 0.5 : 1 },
          ]}
        />
        <View style={styles.unlockContainer}>
          {!currentProduct?.isUnlocked && (
            <Ionicons style={styles.lockIcon} name="lock-closed" size={40} />
          )}
          {!currentProduct?.isUnlocked && isNearby.status && (
            <TouchableOpacity
              testID="unlock-button"
              disabled={isLoading}
              style={styles.unlockButton}
              onPress={handleUnlock}
            >
              {isLoading ? (
                <ActivityIndicator style={styles.activityIndicator} />
              ) : (
                <Text style={styles.buttonText}>Unlock</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.addressText}>
          {currentProduct?.data?.address?.value}
        </Text>
        {currentProduct?.isUnlocked && (
          <Text style={styles.descriptionText}>
            {currentProduct?.data?.description}
          </Text>
        )}
        <Text style={styles.distanceText}>
          {`Distance from your location is ${
            isNearby.value !== -1
              ? isNearby.value?.toFixed(1) + " meters"
              : "loading..."
          }`}
        </Text>
      </View>
    </ScrollView>
  );
};

export default Detail;
