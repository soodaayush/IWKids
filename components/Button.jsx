import { StyleSheet, Text, TouchableOpacity } from "react-native";

import Constants from "../constants/constants";

const Button = (props) => {
  return (
    <TouchableOpacity style={styles.optionButton} onPress={props.function}>
      <Text style={styles.buttonText}>{props.text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  optionButton: {
    backgroundColor: Constants.buttonBackground,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    fontFamily: Constants.fontFamily,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
    fontFamily: Constants.fontFamily,
  },
});
