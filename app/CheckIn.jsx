import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

// Key to store/retrieve queue
const QUEUE_KEY = "checkinQueue";

export default function CheckInScreen() {
  const [name, setName] = useState("");
  const [patientNumber, setPatientNumber] = useState(null);
  const [position, setPosition] = useState(null);
  const [queue, setQueue] = useState([]);
  const navigation = useNavigation();

  // Load queue from AsyncStorage on mount
  useEffect(() => {
    const loadQueue = async () => {
      try {
        const storedQueue = await AsyncStorage.getItem(QUEUE_KEY);
        if (storedQueue) {
          const parsed = JSON.parse(storedQueue);
          setQueue(parsed);
        }
      } catch (error) {
        console.error("Error loading queue:", error);
      }
    };
    loadQueue();
  }, []);

  // Save queue to AsyncStorage
  const saveQueue = async (newQueue) => {
    try {
      await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(newQueue));
    } catch (error) {
      console.error("Error saving queue:", error);
    }
  };

  const handleCheckIn = async () => {
    if (!name.trim()) return;

    const newNumber = queue.length + 1;
    const newEntry = { name, number: newNumber };
    const updatedQueue = [...queue, newEntry];

    setQueue(updatedQueue);
    setPatientNumber(newNumber);
    setPosition(updatedQueue.length);
    setName("");

    await saveQueue(updatedQueue); // persist
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          {/* Home Button */}
          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => navigation.navigate("index")}
          >
            <Text style={styles.homeButtonText}>← Home</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Check In</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />

          <TouchableOpacity
            style={styles.checkInButton}
            onPress={handleCheckIn}
          >
            <Text style={styles.checkInButtonText}>Check In</Text>
          </TouchableOpacity>

          {patientNumber && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>✅ You're checked in!</Text>
              <Text style={styles.resultText}>
                Your number: <Text style={styles.bold}>{patientNumber}</Text>
              </Text>
              <Text style={styles.resultText}>
                Position in line: <Text style={styles.bold}>{position}</Text>
              </Text>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F9FF",
  },
  inner: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingHorizontal: 20,
  },
  homeButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 30,
    left: 20,
  },
  homeButtonText: {
    fontSize: 16,
    color: "#00A9E0",
    fontWeight: "bold",
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    marginVertical: 30,
    fontWeight: "bold",
    color: "#005DAA",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    padding: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  checkInButton: {
    backgroundColor: "#00A9E0",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
  },
  checkInButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  resultContainer: {
    marginTop: 30,
    backgroundColor: "#E7F5FF",
    padding: 20,
    borderRadius: 12,
  },
  resultText: {
    fontSize: 18,
    marginBottom: 6,
  },
  bold: {
    fontWeight: "bold",
    color: "#005DAA",
  },
});
