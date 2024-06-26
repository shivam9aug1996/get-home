import { RouteProp } from "@react-navigation/native";
import { ReactNode } from "react";
import { TextInputProps, TextStyle, ViewStyle } from "react-native/types";

export interface Product {
  _id: string;
  image: string;
  address: {
    value: string;
    latitude: number;
    longitude: number;
  };
  description: string;
}

export interface RouteParams {
  data: string;
}

export type DetailScreenRouteProp = RouteProp<
  Record<string, RouteParams>,
  string
>;

export type ProductListItemProps = {
  product: Product;
  unlockedProperties: { propertyId: string }[];
  isLoading: boolean;
  isFetching: boolean;
};

export interface ThemedInputProps extends TextInputProps {
  style?: object;
}

export interface ScreenWrapperProps {
  children: ReactNode;
}

export interface IsNearby {
  status: boolean;
  value: number;
}

export interface LinkButtonProps {
  href: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children: ReactNode;
}
