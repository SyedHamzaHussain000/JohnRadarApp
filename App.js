import { StyleSheet, Text, View, StatusBar } from "react-native";
import React, { useEffect } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import SplashScreen from "react-native-splash-screen";
import Route from "./src/Navigation/Route";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Toast from "react-native-toast-message";
import { store } from "./src/Redux/store";
import { persistStore } from "redux-persist";

const App = () => {

let persistor = persistStore(store)

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Route />
        <Toast />
      </PersistGate>
    </Provider>
  );
};

export default App;
