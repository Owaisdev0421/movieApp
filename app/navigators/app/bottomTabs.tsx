import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Pressable, View } from "react-native";

import { colors } from "@/app/styles/colors";
import { TAB_CONFIG } from "@/app/utils/tab-config";
import { Image } from "react-native";
import { TabBarLabel } from "./TabBarLabel";
import { tabBarStyles } from "./styles";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const styles = tabBarStyles;

  return (
    <View style={{ flex: 1, backgroundColor: colors.light.background }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: styles.tabBarStyleContainer,
          tabBarActiveTintColor: colors.light.primary,
          tabBarInactiveTintColor: colors.light.grey,
        }}
      >
        {Object.entries(TAB_CONFIG).map(
          ([key, { label, component, activeIcon, inactiveIcon }]) => {
            return (
              <Tab.Screen
                key={key}
                name={key}
                component={component}
                options={{
                  tabBarLabel: ({ focused, color }) => (
                    <TabBarLabel
                      title={label}
                      focused={focused}
                      color={color}
                    />
                  ),
                  tabBarIcon: ({ focused }) => (
                    <Image
                      source={activeIcon}
                      style={{ width: 24, height: 24, resizeMode: "contain" }}
                      tintColor={focused ? "white" : "#847A88"}
                    />
                  ),
                  tabBarButton: (props) => (
                    <Pressable
                      {...props}
                      style={styles.tabBarButtonStyle}
                      onPress={(e) => {
                        console.log("screenname ", key);
                        props.onPress?.(e);
                      }}
                    />
                  ),
                }}
              />
            );
          }
        )}
      </Tab.Navigator>
    </View>
  );
};

export default BottomTabs;
