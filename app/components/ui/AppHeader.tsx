import { LeftArrowIcon, SearchIcon } from "@/assets/images/svgs";
import { useNavigation } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "./CustomText";

interface AppHeaderProps {
  isBackArrow?: boolean;
  isLeftText?: boolean;
  isCenterText?: boolean;
  isSearchIcon?: boolean;
  label?: string;
  title?: string;
  onSearchPress?: () => void;
  backgroundColor?: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  isBackArrow,
  isLeftText,
  isCenterText,
  isSearchIcon,
  label = "Watch",
  title = "The King’s Man",
  onSearchPress,
  backgroundColor = "white",
}) => {
  const navigation = useNavigation();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor,
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.goBack()}
        style={styles.leftContainer}
      >
        {isBackArrow && <LeftArrowIcon />}
        {isLeftText && <AppText label={label} fontSize={16} fontWeight="500" />}
      </TouchableOpacity>
      s
      <View style={styles.centerContainer}>
        {isCenterText && (
          <AppText label={title} fontSize={16} fontWeight="500" />
        )}
      </View>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onSearchPress}
        style={styles.rightContainer}
      >
        {isSearchIcon && <SearchIcon />}
      </TouchableOpacity>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    paddingHorizontal: 20,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 15,
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  rightContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    width: 60,
  },
});
