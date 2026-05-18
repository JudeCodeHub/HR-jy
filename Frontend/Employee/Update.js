import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Avatar } from 'react-native-paper';
import Back from 'react-native-vector-icons/Ionicons';

import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import { RadioButton } from 'react-native-paper';


//NOte: Need to include all the value 

function Update({route}) {
    const {item}=route.params
    console.log(item.password)
    
    const navigation=useNavigation()





    const [image, setImage] = useState(item.image);
    const [name, setName] = useState(item.Name);
    const [email, setEmail] = useState(item.Name);
    const [gender, setGender] = useState(item.gender);
    const [job, setjob] = useState(item.job);
    const [mobile, setMobile] = useState(item.mobile);
    
    
    
   

    
   
    const selectPhoto = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4,4],
        quality: 1,
        base64:true

      });
  
      
  
      if (!result.canceled) {
        data=result.assets[0].base64
        setImage(`data:image/png;base64,${data}`);
      }
    };
    


   const updateProfile=()=>{
     

      const formData ={
        Name:name,
        mobile:mobile,
        image:image,
        Job:job,
        email:email
      }

      console.log(formData)

      axios.put(`${process.env.EXPO_PUBLIC_API_URL}/Employee/${item._id}`, formData)
    
  .then((res) => {
    console.log(res.data);
    Alert.alert('Updated Successfully');
   
  })
  .catch((err) => {
    console.log(err);
    Alert.alert('Update Failed');
  });
    }



  return (
    <ScrollView
      style={{marginTop:30}}
      keyboardShouldPersistTaps={'always'}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 40}}>
      <View>
        <View style={styles.header}>
          <View style={{flex: 1}}>
            <Back
              name="arrow-back"
              size={30}
              style={styles.backIcon}
               onPress={() => {
                 navigation.navigate("Employee",item.HR)
                 
               }}
            />
          </View>
          <View style={{flex: 3}}>
            <Text style={styles.nameText}>Edit Profile</Text>
          </View>
          <View style={{flex: 1}}></View>
        </View>
        <View style={styles.camDiv}>
          <View style={styles.camIconDiv}>
            <Back name="camera" size={22} style={styles.cameraIcon} />
          </View>

          <TouchableOpacity onPress={() =>selectPhoto()}>
            <Avatar.Image
              size={140}
              style={styles.avatar}
              source={{
                uri:
                 image==""|| image==null
                    ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAM1BMVEXFzeD////Byt7L0uPByd7Q1+b7/P3j5/Dv8fbe4+3r7vTFzuDL0+P19/rn6/LZ3urW2+lU+LHUAAAFLklEQVR4nO2dC3arMAxEQXwCcfjsf7XPkLw2tEka5AEziu8CeuKpJVmyLLIskUgkEkdFbsT+HXEQKbNqOPWN59y72D9nd/z/vWqbOv/mozSY9n116vIl1acYg1++G9v+5/rzvMs+QwL/7x/O9a/lT5zL2D9uF7wAzcP1e+pP2AQi4/mZAJ6TfQ3EtY9N4D+jdQ2k6F8K4OltayDFKyP4cghmI6PzVvDnHrDuEqR9UwFPY1IEufw+C72yh8LeIUFOaxSY6K0dFt2qTXDDVJCUi0IBT2vHHmTUSWAnPjgZtBJ4p2BjJ4RIYCSHlCpEAi+CAXMowiSwIIJoguKSE7k5rD8aPWDg3gnKg8EPLrGXEUL5tGC2ijr2OkIIjAlfEJdVBLMNcmprQEnAW09YUzT5C9aNADgbfMGaPQlOgrwj1cAlDZIGGVYD2ktIpAasiRNQgzxpkOektoCMjUkDT+zFaEFqwNqohtSgiL0YHcHlVAMaoCooM6SJo/qK7RGk+yBpkGVBl2w2NAi7aEwamNEAWE5MGiQNkgZJg6RB0sCEBoj+C3YN0j5IGkyks3LKnSegdaSkQdIgaUCtwcf7RJHy02OjVG3/+knvSlxJd+uK7Emb6eqOrQVBoJvgCtu16xYasF23QXsPWDVI+yArN9CALTyW6LhAqAE8NuaEcQH2fOMbtkNS+e7IC8MaYIuJM3TnRGwxcYbvPQ+0eDBD95TFIRv3rwyx17Qa/EGRbmqSAz1xvSP2ktaDvW3MOV9xoJ0i43tftEPgc4n4U1Ls9ajAbgTOkSCh02AW1GxJ4w2gCKwSIAspF0pLmIB5BNaXvhnwnMSXMn6DqrBzBoUrqKoiXdp8B6qqWMVeSADyzijhNyDeBiinyOwSUc95uAemYZ66sl0wLYGcFPmK6gsgCTRzZJxAlJe5TQFyQiA3hQxRVuSOChPBXrEW2trBf/RDts1sg+C8iXZA1oKwc9IY++dDCDojUKcKd5T67JF6ou4C9SHBhjO4os2hiWupv1Hm0JY00LpFKx5xQmsLpjRQdisy19R/om3MsaSB9rxsSgOdBKY00E5SZOxBeoa2kGJJA+01gyEN1JmjJQ20jxnYq+p3qPNGQxqo66qtHQ3UfUlJA0MalKJ+8NnyPfh/hFzOnbpFr6vP7JeNGaALw0BJMfzemT4+IhqSYq8hFESDInNj3ky4BPSXroieLPZDAuI7nuROsUS84iAvqKmT5gWxVxEIQgJuY8BsA+6NgPmyMXVkQHXuM+cMuBEIjO98Z4K78r5pOFtVpWiRn7Qd+aop5QU9AqJuMyYVRKoNJkT58OD/cuy1vYUX4LTBvLgrzVAcXwYpthPgSjcc2ybkgjoRvKQvjqrCVl7gEU11RJMQGTeYFvicbjyaCnsrMFG3R1JBsnZjR/hEhf4gJiHi0NOg1nCOL8OejvAJ3RBTBScy7O4GHlCfXCwV4hrBkvMlQmYpZXQjWLJ7sJTyEEawZNfMsowUC/+m38kxiNtgbDCMZgfHIMUuaVEA3cYnBnx5aAu8e9xMASkYFJjoNpo/K+7oVnBPg68xuKw8zoHoPXp0pCzHg0bDV0CTa3EsjmBJjUunsB9u35Ua08wkGecmuIEIEVIReoIFwTf38JHhEQgcxuqOlx4qCBFBCnY7uKH/uhV0SHRU9CNFUO1EB0A9TMKIIczoggP+QxpRUQ0cM+MMrmiezG7x0bmoKDYCZhLqgVjf8WvhfLhkfaPnFt/di8zq6XNbfIczMqsHDW3xTdrYPFvrP7kiUsVMV4ODAAAAAElFTkSuQmCC'
                    : image,
              }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: 50,
            marginHorizontal: 22,
          }}>
          <View style={styles.infoEditView}>
            <Text style={styles.infoEditFirst_text}>Username</Text>
            <TextInput

              defaultValue={item.Name}
              placeholder="Your Name"
              placeholderTextColor={'#999797'}
              style={styles.infoEditSecond_text}
              onChangeText={(e) =>{ if(e){
                setName(e)
              }
              else{
                setName(item.Name)
              }}}
            />
          </View>

          <View style={styles.infoEditView}>
            <Text style={styles.infoEditFirst_text}>Email</Text>
            <TextInput
            
              placeholder="Your Email"
              placeholderTextColor={'#999797'}
              defaultValue={item.email}
              style={styles.infoEditSecond_text}
              onChangeText={(e) =>{ if(e){
                setEmail(e)
              }
              else{
                setName(item.email)
              }}}

              
            />
          </View>

          <View style={styles.infoEditView}>
            <Text style={styles.infoEditFirst_text}>Gender</Text>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.radioView}>
                


                <RadioButton.Group onValueChange={(value) => setGender(value)} value={gender}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton value="Male" />
            <Text>Male</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton value="Female
            
            " />
            <Text>Female</Text>
          </View>
        </RadioButton.Group>
              </View>
            </View>
          </View>
          <View style={styles.infoEditView}>
            <Text style={styles.infoEditFirst_text}>Profession</Text>
            <TextInput
              placeholder="Profession"
              defaultValue={item.Job}
              placeholderTextColor={'#999797'}
              style={styles.infoEditSecond_text}
              onChangeText={(text)=>setjob(text)}
            />
          </View>

          <View style={styles.infoEditView}>
            <Text style={styles.infoEditFirst_text}>Mobile No</Text>
            <TextInput
              placeholder="Your Mobile No"
              placeholderTextColor={'#999797'}
              keyboardType="numeric"
              style={styles.infoEditSecond_text}
              defaultValue={item.mobile}
             
              onChangeText={(e)=>setMobile(e)}
            />
          </View>

          <View style={styles.infoEditView}>
            <Text style={styles.infoEditFirst_text}>Mobile No</Text>
            <TextInput
              placeholder="Your Mobile No"
              placeholderTextColor={'#999797'}
              keyboardType="numeric"
              style={styles.infoEditSecond_text}
              defaultValue={item.mobile}
             
              onChangeText={(e)=>setMobile(e)}
            />
          </View>
        </View>
        <View style={styles.button}>
          <TouchableOpacity onPress={()=>updateProfile()} style={styles.inBut}>
            <View>
              <Text style={styles.textSign}>Update Profile</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default Update;


const styles=StyleSheet.create({

    loading: {
      flex: 1,
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      opacity: 0.5,
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
      height: 1000,
    },
    button: {
      alignItems: 'center',
      marginTop: 0,
      alignItems: 'center',
      textAlign: 'center',
      marginTop: 30,
    },
    textSign: {
      fontSize: 18,
      fontWeight: '600',
      color: 'white',
    },
    inBut: {
      width: '70%',
      backgroundColor: '#0163D2',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 15,
      borderRadius: 50,
    },
    header: {
      backgroundColor: '#0163D2',
      flexDirection: 'row',
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatar: {
      borderRadius: 80,
      marginTop: 50,
      backgroundColor: 'white',
      height: 160,
      width: 160,
      padding: 8,
      borderColor: '#ccc',
      borderWidth: 1,
      elevation: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    camDiv: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    camIconDiv: {
      position: 'absolute',
      right: 142,
      zIndex: 1,
      bottom: 5,
      height: 36,
      width: 36,
      backgroundColor: '#0163D2',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 18,
    },
    cameraIcon: {
      color: 'white',
    },
    backIcon: {
      marginLeft: 20,
      color: 'white',
    },
    nameText: {
      color: 'white',
      fontSize: 24,
  
      fontStyle: 'normal',
 
      fontWeight: 'bold',
      textAlign: 'center',
    },
    infoEditView: {
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderColor: '#e6e6e6',
      borderBottomWidth: 1,
      paddingBottom: 5,
    },
    infoEditFirst_text: {
      color: '#7d7c7c',
      fontSize: 16,
      fontWeight: '400',
    },
    infoEditSecond_text: {
      color: 'black',
      fontStyle: 'normal',
    
      fontSize: 15,
      textAlignVertical: 'center',
      textAlign: 'right',
    },
    radioView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    radioText: {
      color: 'black',
      fontSize: 15,
    },
  });

  
