import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="SymptomChecker" options={{ headerShown: false }} />
        <Stack.Screen name="WaitTime" options={{ headerShown: false }} />
        <Stack.Screen name="CalmZone" options={{ headerShown: false }} />
        <Stack.Screen name="Feedback" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default RootLayout;
