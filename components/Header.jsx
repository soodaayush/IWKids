import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

import { useNavigation } from "@react-navigation/native";

import Constants from "../constants/constants";

const Header = (props) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: "#104C98",
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
      <View>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate("index")}
        >
          <Image style={styles.image} source={require("../assets/home.png")} />
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
  image: {
    width: 40,
    height: 40,
  },
});
