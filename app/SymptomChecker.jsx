import { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";

import { StatusBar } from "expo-status-bar";

import { useNavigation } from "@react-navigation/native";

import Constants from "../constants/constants";

import { API_KEY } from "@env";

import Header from "../components/Header";

export default function SymptomChecker() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef();

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
    };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content:
                  "You are a friendly medical assistant helping kids and families describe how they feel while waiting in the ER. Diagnose medical conditions and recommend they either go to ER or check with their family doctor. Keep language simple, comforting, and supportive, and keep the responses brief. You are in the IWK, which is a children's hospital in Halifax Nova Scotia. You should be able to accommodate people speaking English and French.",
              },
              ...updatedMessages.map((m) => ({
                role: m.sender === "user" ? "user" : "assistant",
                content: m.text,
              })),
            ],
            temperature: 0.7,
            max_tokens: 150,
          }),
        }
      );

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content.trim();
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: reply || "Hmm, I'm not sure what to say.",
        sender: "ai",
      };

      setMessages([...updatedMessages, aiMessage]);
    } catch (error) {
      console.error("OpenAI Error:", error);
      const failMessage = {
        id: (Date.now() + 1).toString(),
        text: "Oops! I had trouble thinking of a response.",
        sender: "ai",
      };
      setMessages([...updatedMessages, failMessage]);
    }

    setLoading(false);
  };

  const renderItem = ({ item }) => (
    <View
      style={{
        alignSelf: item.sender === "user" ? "flex-end" : "flex-start",
        backgroundColor: item.sender === "user" ? "#DCF8C6" : "#E2E2E2",
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        maxWidth: "75%",
      }}
    >
      <Text style={{ fontFamily: Constants.fontFamily, fontSize: 20 }}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar style="light" />
      <Header title="How can I help?" />
      <View
        style={{
          flex: 1,
          paddingHorizontal: 10,
          justifyContent: "space-between",
        }}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: 10, flexGrow: 1 }}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          showsVerticalScrollIndicator
          style={{ flex: 1 }}
        />

        {loading && (
          <ActivityIndicator
            size="small"
            color="#007AFF"
            style={{ margin: 10 }}
          />
        )}

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inputContainer}>
            <TextInput
              style={{
                flex: 1,
                borderWidth: 2,
                borderColor: "#ccc",
                borderRadius: 25,
                paddingHorizontal: 15,
                paddingVertical: 10,
                fontSize: 20,
                backgroundColor: "#F0F8FF",
                shadowColor: "#888",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 5,
                marginBottom: 20,
                maxHeight: 75,
                fontFamily: Constants.fontFamily,
              }}
              value={input}
              onChangeText={setInput}
              placeholder="Please describe your symptoms in a few words..."
              placeholderTextColor="#A9A9A9"
              multiline
              numberOfLines={3}
            />
            <TouchableOpacity
              style={{
                backgroundColor: Constants.buttonBackground,
                paddingVertical: 12,
                paddingHorizontal: 18,
                borderRadius: 25,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
                shadowColor: "#888",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.3,
                shadowRadius: 5,
                marginBottom: 20,
              }}
              onPress={handleSend}
            >
              <Text style={styles.sendText}>➤</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    padding: 16,
    textAlign: "center",
    fontFamily: Constants.fontFamily,
  },
  chatContainer: { flex: 1, paddingHorizontal: 16 },
  messageBubble: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 12,
    maxWidth: "75%",
    fontFamily: Constants.fontFamily,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
    fontFamily: Constants.fontFamily,
  },
  aiBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#EEE",
    fontFamily: Constants.fontFamily,
  },
  messageText: { fontSize: 16 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center", // key to keeping button small!
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    padding: 20,
    fontFamily: Constants.fontFamily,
    paddingHorizontal: 15,
  },
  sendButton: { justifyContent: "center", alignItems: "center", marginLeft: 8 },
  sendText: { fontSize: 18, color: "#fff" },
});
