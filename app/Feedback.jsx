import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import Constants from "../constants/constants";

import Header from "../components/Header";

export default function Feedback() {
  const navigation = useNavigation();
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [comments, setComments] = useState("");

  const emojis = ["😄", "😢"];

  const handleSubmit = () => {
    Alert.alert("Thank you!", "Your feedback was sent to Buddy 🧸");
    setSelectedEmoji(null);
    setComments("");
    navigation.navigate("index");
  };

  return (
    <View style={styles.container}>
      <Header title="Help us get better" />
      <View style={styles.content}>
        <Text style={styles.title}>📝 How was your visit?</Text>
        <Text style={styles.subtitle}>
          Choose one that best describes how your experience:
        </Text>

        <View style={styles.emojiRow}>
          {emojis.map((emoji, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedEmoji(emoji)}
            >
              <Text
                style={[
                  styles.emoji,
                  selectedEmoji === emoji && styles.selectedEmoji,
                ]}
              >
                {emoji}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={styles.input}
          placeholder="Anything else you'd like to tell us?"
          multiline
          value={comments}
          onChangeText={setComments}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Feedback</Text>
        </TouchableOpacity>
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
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 10,
    textAlign: "center",
    fontFamily: Constants.fontFamily,
  },
  subtitle: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: Constants.fontFamily,
  },
  emojiRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 50,
    marginBottom: 30,
  },
  emoji: {
    fontSize: 34,
    opacity: 0.6,
  },
  selectedEmoji: {
    opacity: 1,
    transform: [{ scale: 1.5 }],
  },
  input: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    height: 100,
    textAlignVertical: "top",
    marginBottom: 24,
    fontSize: 16,
    borderColor: "#C8E6C9",
    borderWidth: 1,
    fontFamily: Constants.fontFamily,
  },
  button: {
    backgroundColor: "#3AAE2A",
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: "center",
    marginBottom: 16,
  },
  homeButton: {
    backgroundColor: "#66BB6A",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: Constants.fontFamily,
  },
});
