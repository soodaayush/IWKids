import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import Constants from "../constants/constants";

export default function Home() {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require("../assets/IWK.png")} style={styles.mascot} />

      <Text style={styles.welcomeText}>Hi! I'm Buddy 🐻</Text>
      <Text style={styles.subtitle}>What would you like to do today?</Text>
      <View style={styles.buttonGrid}>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate("SymptomChecker")}
        >
          <Text style={styles.buttonText}>🧠 Tell me how you feel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate("CheckIn")}
        >
          <Text style={styles.buttonText}>✅ Check in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate("WaitTime")}
        >
          <Text style={styles.buttonText}>⏳ Check wait time</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate("CalmZone")}
        >
          <Text style={styles.buttonText}>
            🎨 Do something fun while waiting!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate("Feedback")}
        >
          <Text style={styles.buttonText}>📝 Give feedback</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 20,
    alignItems: "center",
    fontFamily: Constants.fontFamily,
  },
  mascot: {
    width: 166,
    height: 120,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 26,
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
  optionButton: {
    backgroundColor: "#B31E8C",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    fontFamily: Constants.fontFamily,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
    fontFamily: Constants.fontFamily,
  },
});
