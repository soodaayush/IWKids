import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import Constants from "../constants/constants";

import Header from "../components/Header";

import { useNavigation } from "@react-navigation/native";

export default function CalmZone() {
  const navigation = useNavigation();

  function openTicTacToe() {
    navigation.navigate("TicTacToe");
  }

  return (
    <View style={styles.container}>
      <Header title="Calm Zone" />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>🌈 Calm Zone</Text>
        <Text style={styles.subtitle}>
          Buddy is here to help you feel calm and cozy.
        </Text>
        <TouchableOpacity style={styles.card} onPress={openTicTacToe}>
          <Text style={styles.cardTitle}>🎮 Games</Text>
          <Text style={styles.cardDescription}>
            Play exciting games and have fun!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>🎨 Coloring Pages</Text>
          <Text style={styles.cardDescription}>
            Tap to color online or ask for printed pages.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>📺 Watch Cartoons</Text>
          <Text style={styles.cardDescription}>
            Buddy&apos;s favorite shows are ready to go!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>🌬️ Breathing Exercises</Text>
          <Text style={styles.cardDescription}>
            Breathe in... breathe out... let&apos;s calm together.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>🎵 Soft Music</Text>
          <Text style={styles.cardDescription}>
            Relaxing music to ease your nerves.
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#B31E8C",
    marginBottom: 8,
    textAlign: "center",
    fontFamily: Constants.fontFamily,
  },
  subtitle: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
    marginBottom: 24,
    fontFamily: Constants.fontFamily,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#444",
    fontFamily: Constants.fontFamily,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
    fontFamily: Constants.fontFamily,
  },
  button: {
    backgroundColor: "#FF9F1C",
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: Constants.fontFamily,
  },
});
