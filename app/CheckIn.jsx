import { useState, useEffect } from "react";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import Constants from "../constants/constants";

import Header from "../components/Header";

import Button from "../components/Button";

import {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER,
} from "@env";

const QUEUE_KEY = "checkinQueue";

export default function CheckInScreen() {
  // AsyncStorage.clear();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [patientNumber, setPatientNumber] = useState(null);
  const [position, setPosition] = useState(null);
  const [queue, setQueue] = useState([]);
  const [isAlreadyCheckedIn, setIsAlreadyCheckedIn] = useState(false); // Track if user is already checked in
  const navigation = useNavigation();

  const fetchFromStorage = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // parse stringified object
        const parsedObject = JSON.parse(value);
        return parsedObject;
      }
    } catch (error) {
      console.error("Failed to fetch object:", error);
    }
    return null;
  };

  useEffect(() => {
    fetchFromStorage(QUEUE_KEY).then((entry) => {
      if (entry != null) {
        console.log(entry);
        setPatientNumber(entry[0].number);
        setPosition(entry[0].number);
        setIsAlreadyCheckedIn(true);
        return;
      }
    });

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

    const newNumber = queue.length + 1;
    const newEntry = { name, phoneNumber, number: newNumber };
    const updatedQueue = [...queue, newEntry];

    setQueue(updatedQueue);
    setPatientNumber(newNumber);
    setPosition(updatedQueue.length);
    setIsAlreadyCheckedIn(true); // Reset check-in status if it's a new check-in

    console.log(newEntry);

    // const isAvailable = await SMS.isAvailableAsync();
    // if (isAvailable) {
    //   const { result } = await SMS.sendSMSAsync(
    //     [`${phoneNumber}`], // recipient phone numbers
    //     `Hi ${name}, you are checked in! Your number: ${newNumber} Position in Line: ${position}`
    //   );
    //   console.log(result); // sent, cancelled
    // } else {
    //   alert("SMS service is not available on this device.");
    // }

    sendSMSViaTwilio(
      phoneNumber,
      `Hi ${name}, you are checked in! Your number is: ${newNumber} Your estimated position in line: ${position}`
    );

    setName("");
    setPhoneNumber("");

    await saveQueue(updatedQueue); // persist
  };

  const sendSMSViaTwilio = async (to, body) => {
    const accountSid = TWILIO_ACCOUNT_SID;
    const authToken = TWILIO_AUTH_TOKEN;
    const from = TWILIO_PHONE_NUMBER;

    const credentials = btoa(`${accountSid}:${authToken}`);

    const form = new URLSearchParams();
    form.append("To", to);
    form.append("From", from);
    form.append("Body", body);

    try {
      const response = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${credentials}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: form.toString(),
        }
      );

      const result = await response.json();
      console.log("Twilio Response:", result);
      return result;
    } catch (error) {
      console.error("Error sending SMS:", error);
      throw error;
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Header title="Check In" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          {!isAlreadyCheckedIn && (
            <View>
              <Text style={styles.title}>
                Please provide your contact information
              </Text>

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
              <Button text="Check In" function={handleCheckIn} />
            </View>
          )}
          {isAlreadyCheckedIn && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>✅ You're checked in!</Text>
              <Text style={styles.resultText}>
                Your check-in number:{" "}
                <Text style={styles.bold}>{patientNumber}</Text>
              </Text>
              <Text style={styles.resultText}>
                Position in Queue: <Text style={styles.bold}>{position}</Text>
              </Text>
              <Text></Text>
              <Text style={styles.resultText}>
                Thank you for checking in! You should be receiving a SMS
                confirmation momentarily.
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
  },
  inner: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    marginVertical: 30,
    fontWeight: "bold",
    color: Constants.headerColor,
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
    backgroundColor: Constants.buttonBackground,
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
    backgroundColor: Constants.modalBackground,
    padding: 20,
    borderRadius: 12,
  },
  resultText: {
    fontSize: 18,
    marginBottom: 6,
    color: Constants.modalTextColor,
    fontFamily: Constants.fontFamily,
  },
  bold: {
    fontWeight: "bold",
    color: Constants.modalTextColor,
    fontFamily: Constants.fontFamily,
  },
});
