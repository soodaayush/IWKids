import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";

import MapView, { Marker } from "react-native-maps";
import * as Linking from "expo-linking";

import Header from "../components/Header";

import Constants from "../constants/constants";

import Directions from "../assets/directions.svg";

export default function Map() {
  const latitude = 44.637675239464514;
  const longitude = -63.58368630265496;
  const latitudeDelta = Platform.OS === "android" ? 0.0025 : 0.0045;
  const longitudeDelta = Platform.OS === "android" ? 0.0025 : 0.0045;

  function openMap() {
    const url = Platform.select({
      ios: `maps:0,0?q=${latitude},${longitude}&dirflg=d`,
      android: `google.navigation:q=${latitude},${longitude}`,
    });

    Linking.openURL(url);
  }

  return (
    <>
      <Header title="Map" />
      <View style={styles.container}>
        <View style={styles.information}>
          <Image style={styles.image} source={require("../assets/IWK.png")} />
          <View style={styles.textContainer}>
            <Text style={styles.location}>IWK Hospital</Text>
            <Text style={styles.address}>
              5980 University Ave #5850, Halifax, NS B3K 6R8
            </Text>
            <TouchableOpacity onPress={openMap}>
              <Text style={styles.directions}>Directions</Text>
            </TouchableOpacity>
          </View>
        </View>
        <MapView
          style={styles.map}
          scrollEnabled={false}
          zoomEnabled={false}
          rotateEnabled={false}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
          }}
        >
          <Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
            title={"Target Location"}
            description={""}
          />
        </MapView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.backgroundDark,
  },
  information: {
    backgroundColor: Constants.backgroundDark,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  image: {
    height: 94,
    width: 130,
  },
  svg: {
    marginTop: 10,
  },
  textContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  location: {
    fontFamily: Constants.fontFamily,
    width: "100%",
    fontSize: 20,
  },
  address: {
    color: Constants.textColor,
    fontFamily: Constants.fontFamily,
  },
  directions: {
    marginTop: 10,
    color: Constants.textColor,
    fontFamily: Constants.fontFamily,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
