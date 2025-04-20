import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { StatusBar } from "expo-status-bar";

import Constants from "../constants/constants";

import Home from "../assets/home.svg";

const Header = (props) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: Constants.headerFooterBackground,
        alignItems: "center",
        paddingTop: 70,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 20,
        display: "flex",
        flexDirection: "row",
        gap: 20,
      }}
    >
      <StatusBar style="light" />
      <View>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate("index")}
        >
          <Home style={styles.image} height={40} width={40} fill="#fff" />
        </TouchableOpacity>
      </View>
      <View>
        <Text
          style={{
            fontSize: 24,
            marginTop: 10,
            color: "#fff",
            fontWeight: "bold",
            fontFamily: Constants.fontFamily,
          }}
        >
          {props.title}
        </Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  homeButton: {
    alignItems: "center",
  },
});
