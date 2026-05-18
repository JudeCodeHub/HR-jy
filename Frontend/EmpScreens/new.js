import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    Image,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';

const Mark = () => {

  const navigation=useNavigation();
  const [fileUri, setFileUri] = useState('');
  const [base64Image, setBase64Image] = useState('');

  useEffect(() => {
    requestPermissions();
  }, []);

  //Request Permission
  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }

    const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraStatus.status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
    }
  };

  
  const chooseImage = async () => {
    let options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true, // Add this option to get the base64 data
    };

    try {
      let result = await ImagePicker.launchImageLibraryAsync(options);
     // console.log('Full Response: ', result); // Log the entire response

      if (!result.cancelled) {
        const x = result.assets[0].base64 ? `data:image/jpeg;base64,${result.assets[0].base64}` : '';
        //console.log(base64)

        
           setBase64Image(x);
           console.log(base64Image)
      }
    } catch (error) {
      console.error('Error picking image: ', error);
    }
  };

  const launchCamera = async () => {
    let options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true, // Add this option to get the base64 data
    };

    try {
      let result = await ImagePicker.launchCameraAsync(options);
    //  console.log('Full Response: ', result); // Log the entire response

      if (!result.cancelled) {
        const x = result.assets[0].base64 ? `data:image/jpeg;base64,${result.assets[0].base64}` : '';
        //console.log(base64)

        
           setBase64Image(x);
           console.log(base64Image)
      }
    } catch (error) {
      console.error('Error launching camera: ', error);
    }
  };

  const renderFileUri = () => {
    if (base64Image) {
      return ( <View>
        <Image source={{uri:base64Image}} style={styles.images}/>
        <View style={styles.btnParentSection}>
            <TouchableOpacity  style={styles.btnSection}>
              <Text style={styles.btnText}>Check IN</Text>
            </TouchableOpacity>

            <TouchableOpacity  style={styles.btnSection}>
              <Text style={styles.btnText}>CheckOut</Text>
            </TouchableOpacity>
          </View>

      </View>)

    } else {
      return (
      <View>
          <Image
          source={{
            uri: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
          }}
          style={styles.images}
        />

      <View style={styles.btnParentSection}>
            <TouchableOpacity onPress={chooseImage} style={styles.btnSection}>
              <Text style={styles.btnText}>Choose File</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={launchCamera} style={styles.btnSection}>
              <Text style={styles.btnText}>Directly Launch Camera</Text>
            </TouchableOpacity>
          </View>
      </View>

      );
    }
  };

  return (
  
      
      <SafeAreaView>
        <View  >
          <Pressable onPress={() => navigation.navigate("EmpScreen")}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
         
        </View>
        <View style={styles.body}>
        
          <Text style={{ textAlign: 'center', fontSize: 20, paddingBottom: 10 }}>
            Take your selfie for mark your Attendance
          </Text>
          <View style={styles.ImageSections}>
            <View>{renderFileUri()}</View>
          </View>

         
        </View>
      </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
  body: {
    backgroundColor: 'white',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    height: Dimensions.get('screen').height - 20,
    width: Dimensions.get('screen').width,
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  images: {
    width: 250,
    height: 250,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10,
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Mark;
