import { View, Text, StyleSheet, Image } from "react-native";

import { StatusBar } from "expo-status-bar";

import Constants from "../constants/constants";

import Button from "../components/Button";

import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();

  function navigateToPage(page) {
    navigation.navigate(page);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Image source={require("../assets/IWK.png")} style={styles.mascot} />
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Hi! I'm Buddy 🐻</Text>
        <Text style={styles.subtitle}>How may I help you today?</Text>
        <View style={styles.buttonGrid}>
          <Button
            text="🧘 Tell me how you feel"
            function={() => {
              navigateToPage("SymptomChecker");
            }}
          />
          <Button
            text="✅ Check in"
            function={() => {
              navigateToPage("CheckIn");
            }}
          />
          <Button
            text="⏳ Check wait time"
            function={() => {
              navigateToPage("WaitTime");
            }}
          />
          <Button
            text="🎨 Do something fun while waiting!"
            function={() => {
              navigateToPage("CalmZone");
            }}
          />
          <Button
            text="📝 Provide feedback"
            function={() => {
              navigateToPage("Feedback");
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    alignItems: "center",
    fontFamily: Constants.fontFamily,
  },
  content: {
    width: "100%",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  mascot: {
    width: 166,
    height: 120,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 26,
    textAlign: "center",
    fontWeight: "bold",
    color: "#4A4A8C",
    fontFamily: Constants.fontFamily,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 18,
    color: "#888",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: Constants.fontFamily,
  },
  buttonGrid: {
    width: "100%",
    gap: 12,
  },
});
