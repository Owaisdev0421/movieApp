import MoreComponent from "@/app/screens/more/MoreComponent";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const MoreBottomTabStack = createNativeStackNavigator();

const MoreStack = () => {
  return (
    <MoreBottomTabStack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <MoreBottomTabStack.Screen
        name="Dashboard"
        component={MoreComponent}
        options={{ headerShown: false }}
      />
    </MoreBottomTabStack.Navigator>
  );
};

export default MoreStack;
