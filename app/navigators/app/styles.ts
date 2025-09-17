import { colors } from "@/app/styles/colors";
import { rhp } from "@/app/utils";
import { StyleSheet } from "react-native";

export const tabBarStyles = StyleSheet.create({
  tabBarStyleContainer: {
    height: rhp(10),
    borderTopWidth: 1,
    borderColor: colors.light.grey100,
    backgroundColor: colors.light.black,
  },
  tabBarButtonStyle: {
    height: rhp(9),
    justifyContent: "center",
    alignItems: "center",
  },
});
