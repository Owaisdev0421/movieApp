import HomeComponent from "@/app/screens/home/HomeComponent";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const HomeBottomTabStack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <HomeBottomTabStack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <HomeBottomTabStack.Screen
        name="Dashboard"
        component={HomeComponent}
        options={{ headerShown: false }}
      />
    </HomeBottomTabStack.Navigator>
  );
};

export default HomeStack;
