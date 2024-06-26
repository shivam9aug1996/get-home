import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-root-toast";
import {
  setProduct,
  useUnlockProductMutation,
} from "@/redux/features/unlockProductSlice";
import * as Location from "expo-location";
import { getCachedLocation, getDistance } from "@/utils/functions";
import { DetailScreenRouteProp, IsNearby, Product } from "@/types/detailTypes";
import { useRoute } from "@react-navigation/native";

const usePropertyDetail = () => {
  const route = useRoute<DetailScreenRouteProp>();
  const userId = useSelector((state: any) => state?.auth?.userData?.userId);
  const currentProduct = useSelector(
    (state: any) => state?.unlockProduct?.currentProduct
  );
  const toastId = useRef(null);
  const dispatch = useDispatch();
  const [unlockProduct, { isLoading }] = useUnlockProductMutation();
  const [isNearby, setIsNearby] = useState<IsNearby>({
    status: false,
    value: -1,
  });

  const showToast = useCallback((message: string) => {
    toastId.current = Toast.show(message, {
      position: Toast.positions.BOTTOM,
    });
  }, []);

  const checkLocation = useCallback(
    async (product: Product, isUnlocked: boolean) => {
      dispatch(setProduct({ data: product, isUnlocked }));

      try {
        const location: Location.LocationObject | null =
          await getCachedLocation(showToast);
        const { latitude, longitude } = location?.coords || {};
        const { latitude: productLat, longitude: productLong } =
          product.address;

        const distance = getDistance(
          latitude,
          longitude,
          productLat,
          productLong
        );
        setIsNearby({ status: distance <= 30, value: distance });
      } catch {
        showToast("Error while accessing location");
      }
    },
    [dispatch, showToast]
  );

  useEffect(() => {
    if (route.params?.data) {
      const { product = {}, isUnlocked = false } = JSON.parse(
        route.params.data
      );
      checkLocation(product, isUnlocked);
    }
  }, [route.params, checkLocation]);

  const handleUnlock = async () => {
    hideToast();

    if (!userId) {
      showToast("Please login first!");
      return;
    }

    try {
      await unlockProduct({
        userId,
        propertyId: currentProduct?.data?._id,
      }).unwrap();
      dispatch(setProduct({ data: currentProduct?.data, isUnlocked: true }));
      showToast("Property unlocked successfully!");
    } catch (err) {
      const error: any = err;
      showToast(typeof error === "string" ? error : error?.data?.message);
    }
  };

  const hideToast = () => {
    if (toastId.current) Toast.hide(toastId.current);
  };

  return {
    currentProduct,
    isLoading,
    isNearby,
    handleUnlock,
  };
};

export default usePropertyDetail;
