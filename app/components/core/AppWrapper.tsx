import { RootState } from "@/app/redux/store";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

type AppWrapperProps = {
  children: React.ReactNode;
  statusBarStyle?: "light" | "dark" | "auto";
  statusBarColor?: string;
  navBarColor?: string;
  backgroundColor?: string;
  // safeAreaEdges?: ("top" | "bottom" | "left" | "right")[];
  style?: ViewStyle;
  edgeToEdge?: boolean;
  translucentBars?: boolean;
};

export default function AppWrapper({
  children,
  statusBarStyle,
  statusBarColor,
  navBarColor,
  backgroundColor,
  style,
  translucentBars,
  edgeToEdge,
}: AppWrapperProps) {
  const ui = useSelector((state: RootState) => state.ui);

  const finalStatusBarStyle =
    statusBarStyle != undefined ? statusBarStyle : ui.statusBarStyle;
  const finalStatusBarColor = statusBarColor || ui.statusBarColor;
  const finalNavBarColor = navBarColor || ui.navBarColor;
  const finalBackgroundColor = backgroundColor || ui.backgroundColor;
  const finalTranslucentBars = translucentBars || ui.translucentBars;
  const finalEdgeToEdge = edgeToEdge != undefined ? edgeToEdge : ui.edgeToEdge;

  // Update nav bar on change
  // useEffect(() => {
  //   NavigationBar.setBackgroundColorAsync(finalNavBarColor);
  //   NavigationBar.setBehaviorAsync("overlay-swipe");
  // }, [finalNavBarColor]);

  return (
    <GestureHandlerRootView
      style={[styles.flex, { backgroundColor: finalBackgroundColor }]}
    >
      <SafeAreaProvider>
        {!finalEdgeToEdge && (
          <SafeAreaView
            style={{
              flex: 0,
              backgroundColor: finalStatusBarColor,
            }}
            edges={["top"]}
          />
        )}

        <SafeAreaView
          style={{
            ...styles.flex,
            backgroundColor: finalNavBarColor,
          }}
          edges={[]}
          // edges={!finalEdgeToEdge ? ["bottom"] : []}
        >
          <StatusBar
            style={finalStatusBarStyle}
            translucent={finalTranslucentBars}
          />
          <View
            style={[
              {
                flex: 1,
                backgroundColor: finalBackgroundColor,
                ...style,
              },
            ]}
          >
            {/* {!finalEdgeToEdge && (
            )} */}
            {children}
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
});
