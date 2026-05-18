import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "HR", value: "HR" },
    { label: "Employee", value: "Employee" },
  ]);

  const navigation = useNavigation();

  const handleLogin = () => {
    if (!email || !password || !role) {
      Alert.alert("Login Error", "Please fill all the fields.");
      return;
    }

    axios
      .post(`${process.env.EXPO_PUBLIC_API_URL}/login`, { email: email.trim(), password: password.trim(), role })
      .then((response) => {
        const { token, role, user } = response.data;
        if (token && role) {
          AsyncStorage.setItem("authToken", token);
          if (role === "HR") {
            navigation.navigate("HR_Stack", { user: user });
          } else if (role === "Employee") {
            navigation.navigate("Employee_stack", { user: user });
          } else {
            Alert.alert("Login Error", "Unknown role received from server");
          }
        } else {
          Alert.alert("Login Error", "No token received from server");
        }
      })
      .catch((error) => {
        console.log("Error setting up request:", error.message);
        Alert.alert("Login Error", "Invalid input!");
      });
  };

  return (
    <ImageBackground
      source={require("../assets/sky5.jpeg")}
      style={styles.background}
    >
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.header}>
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.subtitle}>Sign In to Your Account</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <DropDownPicker
              open={open}
              value={role}
              items={items}
              setOpen={setOpen}
              setValue={setRole}
              setItems={setItems}
              placeholder="Select User Role"
              placeholderStyle={{ color: "gray", fontSize: 16 }}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              listMode="SCROLLVIEW" // Ensures dropdown items are scrollable
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Email"
              placeholderTextColor="gray"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.textInput}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder="Password"
              placeholderTextColor="gray"
              secureTextEntry={true}
              style={styles.textInput}
            />
          </View>

          <Pressable onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ADD8E6",
  },

  header: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    color: "white",
    fontSize: 50,
    fontWeight: "900",
  },
  subtitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 5,
  },
  form: {
    marginTop: 50,
  },
  inputContainer: {
    marginBottom: 20,
  },
  textInput: {
    fontSize: 16,
    width: 300,
    height: 50,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 25,
    backgroundColor: "white",
  },
  dropdown: {
    width: 300,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  dropdownContainer: {
    width: 300,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "white",
  },
  button: {
    width: 200,
    backgroundColor: "white",
    padding: 15,
    marginTop: 50,
    alignSelf: "center",
    borderRadius: 25,
  },
  buttonText: {
    color: "black",
    fontSize: 19,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default LoginScreen;
