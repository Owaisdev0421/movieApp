import MediaLibraryComponent from "@/app/screens/media-library/MediaLibraryComponent";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const MediaBottomTabStack = createNativeStackNavigator();

const MediaStack = () => {
  return (
    <MediaBottomTabStack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <MediaBottomTabStack.Screen
        name="Dashboard"
        component={MediaLibraryComponent}
        options={{ headerShown: false }}
      />
    </MediaBottomTabStack.Navigator>
  );
};

export default MediaStack;
