import React, { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { onAppStart } from "./helper/utility";
import store from "./store/store";
import { Provider, useDispatch } from "react-redux";
import Navigator from "./navigation/Navigator";
import RootComponent from "./RootComponent";
import { PermissionsAndroid, Platform } from "react-native";
import CodePushUpdater from "./helper/CodePush";

function App(): JSX.Element {


  useEffect(() => {
    onAppStart(store);
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    checkApplicationPermission();
  }, []);

  const checkApplicationPermission = async () => {
    if (Platform.OS === "android") {
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
      } catch (error) {
        console.log("error::::::", error);
      }
    }
  };

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <RootComponent>
          <CodePushUpdater/>
          <Navigator />
        </RootComponent>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
