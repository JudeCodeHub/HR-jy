import axios from 'axios';
import { BlurView } from "expo-blur";
import { useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Alert } from 'react-native';


import * as Location from 'expo-location';
import React, { useEffect } from 'react';



const Signup = () => {
    const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName,setCompanyName] = useState('');

  const [password, setPassword] = useState('');
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
   // console.log(text)
    //const timestamp = 1718787205504;
//const date = new Date(timestamp);
//console.log(date);
  }



  const handleSubmit = async () => {

    if (name.trim() === "" || email.trim() === "" || password.trim() === "" || companyName.trim() === "") {
      Alert.alert("Error", "Please fill in all fields.");
      return; 
    }

    else{
      const hrData = {
        Name: name.trim(),
        email: email.trim(),
        password: password.trim(),
        companyname: companyName.trim(),
      };
  
  
      try {
         // console.log(hrData)
        const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/HR`, hrData);
        console.log(response.data)
        if (response.status === 200) {
          //Alert.alert('Success', 'HR created successfully!');
          // Optionally, reset the form here

          

          const lat = location.coords.latitude;
          const lng = location.coords.longitude;
          const offset = 0.0005; // Approximately 50 meters

          const locationData = {
            HR: response.data.NewHR._id,
            locationName: "Main Office",
            polygonPoints: [
              { latitude: lat + offset, longitude: lng + offset },
              { latitude: lat + offset, longitude: lng - offset },
              { latitude: lat - offset, longitude: lng - offset },
              { latitude: lat - offset, longitude: lng + offset }
            ]
          };
          console.log(locationData)

          axios.post(`${process.env.EXPO_PUBLIC_API_URL}/location`,locationData)
            .then((response) => {
                //console.log(response.data);

                Alert.alert("Registration Successful");
                setLocation("")

               


            })
            .catch((err) => {
                Alert.alert("Failed to Create HR");
                console.log(err);
            });




          setName('');
          setEmail('');
          setPassword('');
          setCompanyName('');
          
        }





      } catch (error) {
        console.error('Error creating HR:', error);
        Alert.alert('Error', 'Error creating HR. Please try again.');
      }
    };

    }
    
    

  return (
    <ImageBackground
      source={require("../assets/sky5.jpeg")}
      style={styles.background}
    >
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.header}>
          <Text style={styles.title}>Sign Up</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <BlurView intensity={150} style={styles.input}>
              <TextInput
                placeholder="Company Name"
                placeholderTextColor="black"
                value={companyName}
                onChangeText={setCompanyName}
                style={styles.textInput}
              />
            </BlurView>
          </View>
        
        

          <TouchableOpacity style={styles.inputContainer}>
          <BlurView intensity={150} style={{ fontSize: 18,
    width: 300,
    height: 180,
    fontWeight: "100",
    borderRadius: 25, // Makes the input fields oval
    paddingHorizontal: 20,
    color: "#4C8EB2",justifyContent:"center"}}>
             <Text style={{fontSize:16,paddingHorizontal: 20,marginBottom:10,fontWeight:"600"}} >Company Location:</Text>
             <Text style={{paddingHorizontal: 20,}} >{text}</Text>

            </BlurView>


          </TouchableOpacity>

          



          <View style={styles.inputContainer}>
            <BlurView intensity={150} style={styles.input}>
              <TextInput
                placeholder="HR name"
                placeholderTextColor="black"
                value={name}
                onChangeText={setName}
                style={styles.textInput}
              />
            </BlurView>
          </View>

          <View style={styles.inputContainer}>
            <BlurView intensity={150} style={styles.input}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="black"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.textInput}
              />
            </BlurView>
          </View>

          <View style={styles.inputContainer}>
            <BlurView intensity={150} style={styles.input}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="black"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                style={styles.textInput}
              />
            </BlurView>
          </View>

          <Pressable style={styles.button} onPress={()=>handleSubmit()}>
            <Text style={styles.buttonText}>Sign Up</Text>
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
  blur: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
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
  form: {
    marginTop: 50,
  },
  inputContainer: {
    marginBottom: 20,
    borderRadius: 25,
    overflow: "hidden",
    color: "#4C8EB2",
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "gray",
  },
  textInput: {
    fontSize: 16,
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
    textAlignVertical: "center", // Center vertically
  },
  input: {
    fontSize: 18,
    width: 300,
    height: 50,
    fontWeight: "100",
    borderRadius: 25, // Makes the input fields oval
    paddingHorizontal: 20,
    color: "#4C8EB2",
  },
  button: {
    width: 200,
    backgroundColor: "white",
    padding: 15,
    marginTop: 50,
    alignSelf: "center",
    borderRadius: 25, // Makes the button oval
  },
  buttonText: {
    color: "black",
    fontSize: 19,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Signup;
