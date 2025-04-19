import { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

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
      <View
        style={{
          backgroundColor: "#104C98",
          alignItems: "center",
          paddingTop: 50,
          paddingLeft: 10,
          paddingRight: 10,
          paddingBottom: 20,
        }}
      >
        <View style={{ alignItems: "flex-start", width: "100%" }}>
          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => navigation.navigate("index")}
          >
            <Text style={styles.homeButtonText}>← Home</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 24,
            marginTop: 20,
            color: "#fff",
            fontWeight: "bold",
            fontFamily: Constants.fontFamily,
          }}
        >
          ⏳ Wait Time Checker
        </Text>
      </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 50,
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
    marginBottom: 24,
    textAlign: "center",
    fontFamily: Constants.fontFamily,
  },
  infoBox: {
    backgroundColor: "#94D600",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: Constants.fontFamily,
  },
  highlight: {
    fontWeight: "bold",
    fontFamily: Constants.fontFamily,
  },
  smallText: {
    fontSize: 14,
    color: "#777",
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
