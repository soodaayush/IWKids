import { useEffect, useState } from "react";

import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "../components/Header";

import Constants from "../constants/constants";

const QUEUE_KEY = "checkinQueue";

export default function WaitTime() {
  const navigation = useNavigation();
  const [waitTime, setWaitTime] = useState(null);
  const [queuePosition, setQueuePosition] = useState(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const fetchFromStorage = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        const parsedObject = JSON.parse(value);
        return parsedObject;
      }
    } catch (error) {
      console.error("Failed to fetch object:", error);
    }
    return null;
  };

  function generateRandomWaitTime() {
    const totalMinutes = Math.floor(Math.random() * 120) + 1;

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0 && minutes > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ${minutes} minute${
        minutes > 1 ? "s" : ""
      }`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""}`;
    } else {
      return `${minutes} minute${minutes > 1 ? "s" : ""}`;
    }
  }

  useEffect(() => {
    fetchFromStorage(QUEUE_KEY).then((entry) => {
      if (entry != null) {
        setIsCheckedIn(true);
        setQueuePosition(entry[0].number);
        return;
      } else {
        setIsCheckedIn(false);
        setQueuePosition("N/A");
      }
    });

    setTimeout(() => {
      setWaitTime(generateRandomWaitTime());
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
              {isCheckedIn ? (
                <Text style={styles.highlight}>#{queuePosition}</Text>
              ) : (
                <Text
                  onPress={() => {
                    navigation.navigate("CheckIn");
                  }}
                  style={styles.link}
                >
                  Please check-in
                </Text>
              )}
            </Text>
            <Text style={styles.smallText}>
              You’ll get SMS updates as things change 📱
            </Text>
          </View>
        ) : (
          <ActivityIndicator
            size="large"
            color="#B31E8C"
            style={{ marginTop: 30, marginBottom: 30 }}
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
    backgroundColor: Constants.modalBackground,
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
  link: {
    fontWeight: "bold",
    color: "#fff",
    fontFamily: Constants.fontFamily,
    textDecorationLine: "underline",
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
