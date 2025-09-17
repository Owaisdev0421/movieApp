import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Text, TextInput } from "react-native";
import Index from "./app/index";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;

  TextInput.defaultProps = TextInput.defaultProps || {};
  TextInput.defaultProps.allowFontScaling = false;

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      setAppIsReady(true);
    }
    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  return <Index />;
}
