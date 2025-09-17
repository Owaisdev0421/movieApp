import WatchComponent from "@/app/screens/watch/WatchComponent";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const WatchBottomTabStack = createNativeStackNavigator();

const WatchStack = () => {
  return (
    <WatchBottomTabStack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <WatchBottomTabStack.Screen
        name="Dashboard"
        component={WatchComponent}
        options={{ headerShown: false }}
      />
    </WatchBottomTabStack.Navigator>
  );
};

export default WatchStack;
