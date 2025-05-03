import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";

import Footer from "../components/Footer";

const RootLayout = () => {
  let [fontsLoaded] = useFonts({
    FiraSans: require("../assets/font/FiraSans-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="SymptomChecker" options={{ headerShown: false }} />
        <Stack.Screen name="CheckIn" options={{ headerShown: false }} />
        <Stack.Screen name="WaitTime" options={{ headerShown: false }} />
        <Stack.Screen name="CalmZone" options={{ headerShown: false }} />
        <Stack.Screen name="Feedback" options={{ headerShown: false }} />
        <Stack.Screen name="QuickLinks" options={{ headerShown: false }} />
        <Stack.Screen name="Map" options={{ headerShown: false }} />
        <Stack.Screen name="TicTacToe" options={{ headerShown: false }} />
      </Stack>
      <Footer />
    </>
  );
};

export default RootLayout;
