import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";

import BottomTabs from "./bottomTabs";

const Drawer = createDrawerNavigator();
function MainDrawer() {
  return (
    <Drawer.Navigator
      //   drawerContent={(props) => <CustomDrawer {...props} />}
      initialRouteName="BottomTabs"
      screenOptions={{
        swipeEdgeWidth: 0,
        // drawerPosition: "right",
        drawerStyle: {
          //   width: rwp(43),
        },
      }}
    >
      <Drawer.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}

export default MainDrawer;
