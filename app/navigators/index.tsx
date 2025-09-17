import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { navigationRef } from "../utils";

import AppNavigationStack from "./app";

const AppStack = createNativeStackNavigator();

function AppContainer() {
  const routeNameRef = React.useRef();
  const [statusBarColor, setStatusBarColor] = useState("red");

  useEffect(() => {}, [statusBarColor]);

  return (
    <NavigationContainer
      independent
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef?.current?.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const currentRouteName = navigationRef?.current?.getCurrentRoute().name;
      }}
    >
      <AppStack.Navigator
        screenOptions={{ headerShown: false, gestureEnabled: true }}
      >
        <AppStack.Screen
          name="App"
          component={AppNavigationStack}
          options={{ gestureEnabled: false }}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}

export default AppContainer;
