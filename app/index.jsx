import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import { StatusBar } from "expo-status-bar";

import Constants from "../constants/constants";

import Button from "../components/Button";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "@react-navigation/native";

import * as ImagePicker from "expo-image-picker";

const QUEUE_KEY = "checkinQueue";

export default function Home() {
  const navigation = useNavigation();

  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [avatarUri, setAvatarUri] = useState(null);

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
        setIsCheckedIn(true);
        return;
      } else {
        setIsCheckedIn(false);
      }
    });

    const loadAvatar = async () => {
      const saved = await AsyncStorage.getItem("userAvatar");
      if (saved) setAvatarUri(saved);
    };

    loadAvatar();
    fetchFromStorage(QUEUE_KEY).then((entry) => {
      setIsCheckedIn(entry != null);
    });
  }, []);

  function navigateToPage(page) {
    navigation.navigate(page);
  }

  const pickAvatar = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      alert("Camera access is required.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setAvatarUri(uri);
      await AsyncStorage.setItem("userAvatar", uri);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Image source={require("../assets/IWK.png")} style={styles.mascot} />
      <View style={styles.content}>
        {avatarUri ? (
          <View style={styles.intro}>
            <Text style={styles.welcomeText}>Hi, I'm Buddy</Text>
            <TouchableOpacity onPress={pickAvatar} style={{ paddingLeft: 5 }}>
              <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.intro}>
            <Text style={styles.welcomeText}>Hi! I'm Buddy</Text>
            <TouchableOpacity onPress={pickAvatar} style={{ paddingLeft: 5 }}>
              <Text
                style={{
                  fontSize: 50,
                  borderWidth: 2,
                  borderRadius: 50,
                  borderColor: "",
                  padding: 10,
                }}
              >
                🐻
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity
          onPress={pickAvatar}
          style={styles.avatarContainer}
        ></TouchableOpacity>

        <Text style={styles.subtitle}>How may I help you today?</Text>
        <View style={styles.buttonGrid}>
          <Button
            text="🧘 Tell me how you feel"
            function={() => {
              navigateToPage("SymptomChecker");
            }}
          />
          <Button
            text="✅ Check in"
            function={() => {
              navigateToPage("CheckIn");
            }}
          />
          <Button
            text="⏳ Check wait time"
            function={() => {
              navigateToPage("WaitTime");
            }}
          />
          <Button
            text="🎨 Do something fun while waiting!"
            function={() => {
              navigateToPage("CalmZone");
            }}
          />
          <Button
            text="🔗 Quick Links"
            function={() => {
              navigateToPage("QuickLinks");
            }}
          />
          {isCheckedIn && (
            <Button
              text="📝 Provide feedback"
              function={() => {
                navigateToPage("Feedback");
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    alignItems: "center",
    fontFamily: Constants.fontFamily,
  },
  content: {
    marginTop: 30,
    width: "100%",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  mascot: {
    width: 166,
    height: 120,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 26,
    textAlign: "center",
    alignItems: "center",
    fontWeight: "bold",
    color: "#104C98",
    fontFamily: Constants.fontFamily,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: Constants.fontFamily,
  },
  buttonGrid: {
    width: "100%",
    gap: 12,
  },
  avatarImage: {
    width: 70,
    height: 70,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 60,
  },
  intro: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
});
