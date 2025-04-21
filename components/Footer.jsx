import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { usePathname } from "expo-router";

import { useNavigation } from "@react-navigation/native";

import Phone from "../assets/phone.svg";
import Web from "../assets/web.svg";
import Map from "../assets/map.svg";

import Constants from "../constants/constants";

const Footer = () => {
  const navigation = useNavigation();
  const path = usePathname();

  async function openURL(url) {
    let result = await WebBrowser.openBrowserAsync(url);
  }

  function callPhoneNumber(phoneNumber) {
    Linking.openURL(`tel:${phoneNumber}`);
  }

  function openMap() {
    if (path !== "/Map") {
      navigation.navigate("Map");
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => callPhoneNumber("(902) 470-8888")}>
        <Phone
          height={25}
          width={25}
          style={styles.image}
          fill={Constants.headerFooterIconColor}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openURL("https://iwkhealth.ca/")}>
        <Web
          height={25}
          width={25}
          style={styles.image}
          fill={Constants.headerFooterIconColor}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={openMap}>
        <Map
          height={25}
          width={25}
          style={styles.image}
          fill={Constants.headerFooterIconColor}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: Constants.borderColor,
    paddingTop: 20,
    paddingRight: 60,
    paddingLeft: 60,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Constants.headerFooterBackground,
  },
});
