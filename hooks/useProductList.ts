import { useState, useCallback } from "react";
import { useFetchProductsQuery } from "@/redux/features/productSlice";
import { useFetchUnlockProductsQuery } from "@/redux/features/unlockProductSlice";
import { useSelector } from "react-redux";

const useProductList = () => {
  const userId = useSelector((state: any) => state.auth.userData?.userId);
  const [refreshing, setRefreshing] = useState(false);

  const {
    isLoading,
    isError,
    error,
    data: productData,
    refetch: refetchProducts,
    isFetching,
  } = useFetchProductsQuery({});

  const { data: unlockFetchData } = useFetchUnlockProductsQuery(
    {
      userId: userId,
    },
    { skip: !userId }
  );
  console.log(unlockFetchData);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetchProducts()?.finally(() => {
      setRefreshing(false);
    });
  }, [refetchProducts]);
  return {
    refreshing,
    isLoading,
    isError,
    error,
    productData,
    unlockFetchData: userId ? unlockFetchData : [],
    isFetching,
    onRefresh,
  };
};

export default useProductList;
