import React from "react";
import { Text } from "react-native";

export const TabBarLabel = ({ title, focused, color }) => {
  return <Text style={{ paddingTop: 4, color }}>{title}</Text>;
};
