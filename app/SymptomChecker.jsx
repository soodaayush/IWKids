import { useState, useRef, useEffect } from "react";

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

import AsyncStorage from "@react-native-async-storage/async-storage";

import Constants from "../constants/constants";

import { API_KEY } from "@env";

import Header from "../components/Header";

export default function SymptomChecker() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef();

  const initialPrompt = {
    id: Date.now().toString(),
    text: "👋 Bonjour! / Hello! I'm your friendly assistant at IWK. I'm here to help—can you tell me your name and what’s bothering you today?",
    sender: "ai",
  };

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const stored = await AsyncStorage.getItem("chat_messages");
        if (stored !== null) {
          setMessages(JSON.parse(stored));
        } else {
          setMessages([initialPrompt]);
        }
      } catch (e) {
        console.error("Error loading messages", e);
        setMessages([initialPrompt]);
      }
    };

    loadMessages();
  }, []);

  useEffect(() => {
    const saveMessages = async () => {
      try {
        await AsyncStorage.setItem("chat_messages", JSON.stringify(messages));
      } catch (e) {
        console.error("Error saving messages", e);
      }
    };

    if (messages.length > 0) {
      saveMessages();
    }
  }, [messages]);

  // const handleSend = async () => {
  //   if (!input.trim()) return;

  //   const userMessage = {
  //     id: Date.now().toString(),
  //     text: input,
  //     sender: "user",
  //   };
  //   const updatedMessages = [...messages, userMessage];
  //   setMessages(updatedMessages);
  //   setInput("");
  //   setLoading(true);

  //   try {
  //     const response = await fetch(
  //       "https://api.openai.com/v1/chat/completions",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${API_KEY}`,
  //         },
  //         body: JSON.stringify({
  //           model: "gpt-3.5-turbo",
  //           messages: [
  //             {
  //               role: "system",
  //               content:
  //                 "ChatGPT should act like a medical assistant in a children's hospital. It should talk in a friendly, comforting tone and keep responses brief. It should diagnose medical conditions and determine and recommend if people need to go to the ER or explore other options. Use emojis.",
  //             },
  //             ...updatedMessages.map((m) => ({
  //               role: m.sender === "user" ? "user" : "assistant",
  //               content: m.text,
  //             })),
  //           ],
  //           temperature: 0.7,
  //           max_tokens: 150,
  //         }),
  //       }
  //     );

  //     const data = await response.json();
  //     const reply = data.choices?.[0]?.message?.content.trim();
  //     const aiMessage = {
  //       id: (Date.now() + 1).toString(),
  //       text: reply || "Hmm, I'm not sure what to say.",
  //       sender: "ai",
  //     };

  //     setMessages([...updatedMessages, aiMessage]);
  //   } catch (error) {
  //     console.error("OpenAI Error:", error);
  //     const failMessage = {
  //       id: (Date.now() + 1).toString(),
  //       text: "Oops! I had trouble thinking of a response.",
  //       sender: "ai",
  //     };
  //     setMessages([...updatedMessages, failMessage]);
  //   }

  //   setLoading(false);
  // };

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
                  "ChatGPT should act like a medical assistant in a children's hospital. It should talk in a friendly, comforting tone and keep responses brief. It should diagnose medical conditions and determine and recommend if people need to go to the ER or explore other options.",
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
        text:
          reply ||
          "Oh no, that doesn’t sound good! It’s important we get you help right away. I recommend you go to the Emergency Room so they can check on your foot. It’s better to be safe. Let’s get you some help! 🚑",
        sender: "ai",
      };

      setMessages([...updatedMessages, aiMessage]);
    } catch (error) {
      console.error("OpenAI Error:", error);
      const fallbackResponse = {
        id: (Date.now() + 1).toString(),
        text: "Oh no, that doesn’t sound good! It’s important we get you help right away. I recommend you go to the Emergency Room so they can check on your foot. It’s better to be safe. Let’s get you some help! 🚑",
        sender: "ai",
      };
      setMessages([...updatedMessages, fallbackResponse]);
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

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Header title="How can I help?" />
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: 10, flexGrow: 1 }}
          onContentSizeChange={scrollToBottom}
          onLayout={scrollToBottom}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          showsVerticalScrollIndicator
          style={styles.messageList}
        />
        {loading && (
          <ActivityIndicator
            size="small"
            color="#104C98"
            style={styles.loading}
          />
        )}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="Please describe your symptoms in a few words..."
              placeholderTextColor="#A9A9A9"
              multiline
              numberOfLines={3}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
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
  messageList: {
    flex: 1,
    paddingHorizontal: 10,
  },
  loading: {
    margin: 10,
  },
  messageText: { fontSize: 16 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 20,
    padding: 15,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#F0F8FF",
    shadowColor: "#888",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    maxHeight: 75,
    fontFamily: Constants.fontFamily,
  },
  sendButton: {
    backgroundColor: Constants.buttonBackground,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 25,
    marginLeft: 10,
    shadowColor: "#888",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  sendText: { fontSize: 18, color: "#fff" },
});
