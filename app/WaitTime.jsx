import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

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
      <Text style={styles.title}>⏳ Wait Time Checker</Text>
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

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate("index")}
      >
        <Text style={styles.homeButtonText}>🏠 Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7F0",
    paddingTop: 100,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
    textAlign: "center",
  },
  infoBox: {
    backgroundColor: "#E0F7FA",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
  },
  highlight: {
    fontWeight: "bold",
    color: "#00796B",
  },
  smallText: {
    fontSize: 14,
    color: "#777",
    marginTop: 10,
    textAlign: "center",
  },
  homeButton: {
    marginTop: 40,
    backgroundColor: "#FF9F1C",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 25,
  },
  homeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
