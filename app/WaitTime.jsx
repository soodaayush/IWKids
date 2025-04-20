import { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import Header from "../components/Header";

import Constants from "../constants/constants";

export default function WaitTime() {
  const navigation = useNavigation();
  const [waitTime, setWaitTime] = useState(null);
  const [queuePosition, setQueuePosition] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setWaitTime("42 minutes");
      setQueuePosition(3);
    }, 1500);
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Checking Wait Times" />
      <View style={styles.content}>
        <Text style={styles.subtitle}>
          Buddy is checking with the hospital... 🧸
        </Text>

        {waitTime && queuePosition ? (
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              Estimated wait time:{" "}
              <Text style={styles.highlight}>{waitTime}</Text>
            </Text>
            <Text style={styles.infoText}>
              Your place in line:{" "}
              <Text style={styles.highlight}>#{queuePosition}</Text>
            </Text>
            <Text style={styles.smallText}>
              You’ll get SMS updates as things change 📱
            </Text>
          </View>
        ) : (
          <ActivityIndicator
            size="large"
            color="#FFA500"
            style={{ marginTop: 30 }}
          />
        )}
      </View>
      <Text style={styles.subtitle}>
        DISCLAIMER: The wait times presented here are an approximation
        determined from statistical data.
      </Text>
      <Text></Text>
      <Text style={styles.subtitle}>Actual wait times can vary.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
    fontFamily: Constants.fontFamily,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    fontFamily: Constants.fontFamily,
  },
  infoBox: {
    backgroundColor: "#3AAE2A",
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
    color: "#fff",
    fontFamily: Constants.fontFamily,
  },
  highlight: {
    fontWeight: "bold",
    color: "#fff",
    fontFamily: Constants.fontFamily,
  },
  smallText: {
    fontSize: 14,
    color: "#fff",
    marginTop: 10,
    textAlign: "center",
    fontFamily: Constants.fontFamily,
  },

  homeButton: {
    alignItems: "center",
  },
  homeButtonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    fontFamily: Constants.fontFamily,
  },
});
