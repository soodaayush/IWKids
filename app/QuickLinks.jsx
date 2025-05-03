import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";

import Header from "../components/Header";
import Constants from "../constants/constants";

const quickLinks = [
  {
    label: "Call Emergency",
    url: "tel:911",
  },
  {
    label: "IWK Website",
    url: "https://www.iwk.nshealth.ca",
  },
  ,
  {
    label: "Patient and Visitor Guide",
    url: "https://iwkhealth.ca/patient-and-visitor-guide",
  },
  {
    label: "Mental Health Services",
    url: "https://www.iwk.nshealth.ca/page/mental-health-and-addictions",
  },
];

export default function QuickLinks() {
  const openLink = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      alert("Can't open this link.");
    }
  };

  return (
    <>
      <Header title="Quick Links" />
      <ScrollView contentContainerStyle={styles.container}>
        {quickLinks.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => openLink(item.url)}
          >
            <Text style={styles.label}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingHorizontal: 24,
    backgroundColor: Constants.backgroundDark,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    color: Constants.textDark,
    fontFamily: Constants.fontFamily,
  },
});
