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
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [patientNumber, setPatientNumber] = useState(null);
  const [position, setPosition] = useState(null);
  const [queue, setQueue] = useState([]);
  const [isAlreadyCheckedIn, setIsAlreadyCheckedIn] = useState(false);

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

  useEffect(() => {
    fetchFromStorage(QUEUE_KEY).then((entry) => {
      if (entry != null) {
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
    setIsAlreadyCheckedIn(true);

    sendSMSViaTwilio(
      phoneNumber,
      `Hi ${name}, you are checked in! Your number is: ${newNumber} Your estimated position in line: ${newNumber}. ER staff has been notified, thank you for your patience.`
    );

    setName("");
    setPhoneNumber("");

    await saveQueue(updatedQueue);
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
      return result;
    } catch (error) {
      console.error("Error sending SMS:", error);
      throw error;
    }
  };

  const formatPhoneNumber = (value) => {
    const cleaned = ("" + value).replace(/\D/g, "");

    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (!match) return value;

    let formatted = "";
    if (match[1]) formatted = `(${match[1]}`;
    if (match[2]) formatted += `) ${match[2]}`;
    if (match[3]) formatted += `-${match[3]}`;
    return formatted;
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
                keyboardType="phone-pad"
                maxLength={14}
                onChangeText={(text) => setPhoneNumber(formatPhoneNumber(text))}
              />
              <Button text="Check In" function={handleCheckIn} />
              <Text></Text>
              <Text style={styles.text}>
                Your phone number is used to provide you instant communication
                via SMS messaging. Your carrier charges may apply.
              </Text>
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
                confirmation momentarily. ER staff has been notified, thank you
                for your patience.
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
  text: {
    fontFamily: Constants.fontFamily,
    textAlign: "center",
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
