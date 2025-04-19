import { useState, useEffect } from "react";

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
import * as SMS from "expo-sms";

import Constants from "../constants/constants";

const QUEUE_KEY = "checkinQueue";

export default function CheckInScreen() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [patientNumber, setPatientNumber] = useState(null);
  const [position, setPosition] = useState(null);
  const [queue, setQueue] = useState([]);
  const [isAlreadyCheckedIn, setIsAlreadyCheckedIn] = useState(false); // Track if user is already checked in
  const navigation = useNavigation();

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

  const saveQueue = async (newQueue) => {
    try {
      await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(newQueue));
    } catch (error) {
      console.error("Error saving queue:", error);
    }
  };

  const handleCheckIn = async () => {
    if (!name.trim() || !phoneNumber.trim()) return;

    const existingEntry = queue.find(
      (entry) => entry.phoneNumber === phoneNumber
    );
    if (existingEntry) {
      setIsAlreadyCheckedIn(true);
      return;
    }

    const newNumber = queue.length + 1;
    const newEntry = { name, phoneNumber, number: newNumber };
    const updatedQueue = [...queue, newEntry];

    setQueue(updatedQueue);
    setPatientNumber(newNumber);
    setPosition(updatedQueue.length);
    setIsAlreadyCheckedIn(false); // Reset check-in status if it's a new check-in

    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const { result } = await SMS.sendSMSAsync(
        [`${phoneNumber}`], // recipient phone numbers
        `Hi ${name}, you are checked in! Your number: ${newNumber} Position in Line: ${position}`
      );
      console.log(result); // sent, cancelled
    } else {
      alert("SMS service is not available on this device.");
    }

    setName("");
    setPhoneNumber("");

    await saveQueue(updatedQueue); // persist

    navigation.navigate("index");
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
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />

          <TouchableOpacity
            style={styles.checkInButton}
            onPress={handleCheckIn}
          >
            <Text style={styles.checkInButtonText}>Check In</Text>
          </TouchableOpacity>

          {isAlreadyCheckedIn ? (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>
                ❌ You have already checked in!
              </Text>
            </View>
          ) : (
            patientNumber && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultText}>✅ You're checked in!</Text>
                <Text style={styles.resultText}>
                  Your number: <Text style={styles.bold}>{patientNumber}</Text>
                </Text>
                <Text style={styles.resultText}>
                  Position in line: <Text style={styles.bold}>{position}</Text>
                </Text>
              </View>
            )
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
    fontSize: 20,
    color: "#00A9E0",
    fontWeight: "bold",
    fontFamily: Constants.fontFamily,
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    marginVertical: 30,
    fontWeight: "bold",
    color: "#005DAA",
    fontFamily: Constants.fontFamily,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    padding: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 20,
    fontFamily: Constants.fontFamily,
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
    fontFamily: Constants.fontFamily,
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
    fontFamily: Constants.fontFamily,
  },
  bold: {
    fontWeight: "bold",
    color: "#005DAA",
    fontFamily: Constants.fontFamily,
  },
});
