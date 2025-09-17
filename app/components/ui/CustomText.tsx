import React from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface AppTextProps extends TextStyle {
  textStyle?: TextStyle;
  container?: ViewStyle;
  label?: string;
  numberOfLines?: number;
  onPress?: (event: GestureResponderEvent) => void;
}

const AppText: React.FC<AppTextProps> = ({
  textStyle,
  container,
  label,
  numberOfLines,
  onPress,
  ...textProps
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      disabled={!onPress}
      style={[styles.mainContainer, container]}
    >
      <Text
        numberOfLines={numberOfLines}
        allowFontScaling={false}
        style={[
          {
            fontSize: textProps.fontSize || 12,
            color: textProps.color || "black",
            alignSelf: textProps.alignSelf || "flex-start",
          },
          textProps,
          textStyle,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default AppText;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
  },
});
