import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { View, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { Provider } from "react-redux";
import store from "@/redux/store";
import AppNavigator from "@/components/AppNavigator";
import { RootSiblingParent } from "react-native-root-siblings";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ThemeProvider value={DefaultTheme}>
        <Provider store={store}>
          <RootSiblingParent>
            <AppNavigator />
          </RootSiblingParent>
        </Provider>
      </ThemeProvider>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors["light"].background,
  },
});
