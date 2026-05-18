import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import React from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleSignIn = () => {
    navigation.navigate("Login");
  };

  const handleSignUp = () => {
    navigation.navigate("Signup");
  };

  return (
    <ImageBackground
      source={require("../assets/sky1.jpeg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <BlurView intensity={75} style={styles.box}>
          <View style={styles.header}>
            <Text style={styles.headerText1}>Master</Text>
            <Text style={styles.headerText2}>HR </Text>
          </View>

          <TouchableOpacity onPress={handleSignIn} style={styles.button1}>
            <MaterialIcons name="login" size={30} color="white" />
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSignUp} style={styles.button2}>
            <MaterialIcons name="person-add" size={30} color="white" />
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </BlurView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },

  box: {
    width: 350,
    height: 800,
    //backgroundColor: "white",
    padding: 15,
    marginTop: 50,
    alignSelf: "center",
    borderRadius: 25,
    overflow: "hidden",
  },

  header: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  headerText1: {
    color: "white",

    marginTop: 30,
    fontSize: 90,
    fontWeight: "900",
  },
  headerText2: {
    color: "white",

    //marginTop: ,
    fontSize: 90,
    fontWeight: "900",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  button1: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4C8EB2",
    padding: 10,

    marginVertical: 10,
    marginTop: 300,
    borderRadius: 25,
  },
  button2: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4C8EB2",
    padding: 10,
    marginVertical: 10,
    marginTop: 10,
    borderRadius: 25,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 18,
    color: "white",
    fontWeight: "500",
  },
});

export default HomeScreen;
