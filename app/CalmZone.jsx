import { View, Text, StyleSheet, ScrollView } from "react-native";

import Constants from "../constants/constants";

import Header from "../components/Header";

import { useNavigation } from "@react-navigation/native";

export default function CalmZone() {
  const navigation = useNavigation();

  const activities = [
    {
      title: "🎮 Games",
      description: "Play exciting games and have fun!",
    },
    {
      title: "🎨 Coloring Pages",
      description: "Tap to color online or ask for printed pages.",
    },
    {
      title: "📺 Watch Cartoons",
      description: "Buddy’s favorite shows are ready to go!",
    },
    {
      title: "🌬️ Breathing Exercises",
      description: "Breathe in... breathe out... let’s calm together.",
    },
    {
      title: "🎵 Soft Music",
      description: "Relaxing music to ease your nerves.",
    },
  ];

  function tictactoe() {
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

        {activities.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text onPress={tictactoe} style={styles.cardTitle}>
              {item.title}
            </Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
          </View>
        ))}
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
