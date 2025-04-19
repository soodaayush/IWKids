import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CalmZone() {
  const navigation = useNavigation();

  const activities = [
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

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      <Text style={styles.title}>🌈 Calm Zone</Text>
      <Text style={styles.subtitle}>
        Buddy is here to help you feel calm and cozy.
      </Text>

      {activities.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>
        </View>
      ))}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("index")}
      >
        <Text style={styles.buttonText}>🏠 Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF0F6",
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#D6336C",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
    marginBottom: 24,
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
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
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
  },
});
