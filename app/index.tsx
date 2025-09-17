import React from "react";
import { Provider as ReduxProvider } from "react-redux";

import AppWrapper from "./components/core/AppWrapper";
import AppContainer from "./navigators";
import { store } from "./redux/store";

export default function Index() {
  return (
    <ReduxProvider store={store}>
      <AppWrapper>
        <AppContainer />
      </AppWrapper>
      {/* <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
            </SafeAreaProvider>
          </GestureHandlerRootView> */}
    </ReduxProvider>
  );
}
