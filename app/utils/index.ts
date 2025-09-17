import { createNavigationContainerRef } from "@react-navigation/native";
import { Dimensions, Platform } from "react-native";

export const navigationRef = createNavigationContainerRef();
export const isIOS = Platform.OS === "ios";
export const isAndroid = Platform.OS === "android";
const { height, width } = Dimensions.get("window");
export const rhp = (val) => (val / 100) * height;
export const rwp = (val) => (val / 100) * width;
