import { Ionicons } from "@expo/vector-icons";
import * as turf from '@turf/turf';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import { ScrollView } from "react-native";

//Need to get location as initial parameter

const Mark = ({route}) => {



 // const { ids,location } = route.params;
  const { ids,HR_id} = route.params;
 



  //const location={"coords": {"accuracy": 59.56100082397461, "altitude": -84.9000015258789, "altitudeAccuracy": 4.988143444061279, "heading": 0, "latitude": 6.9287613, "longitude": 79.8929126, "speed": 0}, "mocked": false, "timestamp": 1718814999511}

  const fetchData = async () => {
    try {
      // 1. Fetch Location
      const locResponse = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/location/hr/${HR_id}`);
      if (locResponse.ok) {
        const locData = await locResponse.json();
        if (locData.length > 0) {
          setLocation(locData[0]); // Now stores the entire object including polygonPoints
        }
      }

      // 2. Fetch Attendance Profile ID
      const attResponse = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/Attendance/${ids}`);
      if (attResponse.ok) {
        const attData = await attResponse.json();
        if (attData.length > 0) {
          setattendanceID(attData[0]._id);
        }
      }
    } catch (error) {
      console.error("Error fetching initialization data:", error);
    }
  };










 const navigation=useNavigation();
 const [base64Image, setBase64Image] = useState('');
 const [response,setResponse]=useState('')
 const [response2,setResponse2]=useState('')
 const [currentLocation, setCurrentLocation] = useState(null);
 const [errorMsg, setErrorMsg] = useState(null);
 const [distance,setdistance]=useState(null)
 const  [withinLoc,setwithinLoc]=useState(false)
 const [currentTime, setCurrentTime] = useState('');
 const [currentDay, setCurrentDay] = useState('');
 const [attendanceID,setattendanceID]=useState('')
 const [location, setLocation] = useState(null);


//console.log(ids)
  useEffect(() => {
    requestPermissions();
    fetchData();

  }, []);


  ///Time and Date
  useEffect(() => {
    
    const updateCurrentTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const Year=now.getFullYear();
      const Month=now.getMonth();
      const Day=now.getDate()
      
      // Format the time to ensure two digits
      const formattedTime = `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
      const formattedDate = `${Year}-${Month.toString().padStart(2, '0')}-${Day.toString().padStart(2, '0')}`;

      setCurrentTime(formattedTime);
      setCurrentDay(formattedDate)
    };


    updateCurrentTime();
    const intervalId = setInterval(updateCurrentTime, 1000);
    return () => clearInterval(intervalId);
  }, []);



//Mark Attendance

//Checkin
 const Handleregister=()=>{
    
    const Attandance_record={
        AttendanceID:attendanceID,
        Date:currentDay,
        Checkin:currentTime,
        status:'present'
    }


 axios.post(`${process.env.EXPO_PUBLIC_API_URL}/Attendance_record`,Attandance_record)
 .then((res)=>{
     setattendanceID(res.data.id)
   //  console.log(res)
     Alert.alert(`Attendance MArked Succesfully on ${Attandance_record.Date} checkinTime:${Attandance_record.Checkin}` )
 })

 .catch((error)=>{
  if (error.response && error.response.status === 400) {
      console.log(error)
      const errorMessage = error.response.data.message;
      Alert.alert(errorMessage);
    } 
    else {
      console.log(error);
      Alert.alert('Failed, please retry')

     


   
 }

})


}


//Checkout
const UpdateRegister=()=>{
    
  const Attandance_record={
    
      Checkout:currentTime,
      
  }


 axios.post(`${process.env.EXPO_PUBLIC_API_URL}/Attendance_record/${attendanceID}`,Attandance_record)
 .then((res)=>{
     //console.log(res.data)
     Alert.alert(res.data.message )
 })

 .catch((error)=>{
  if (error.response && error.response.status === 400) {
      const errorMessage = error.response.data.message;
      Alert.alert(errorMessage);
    } 

    else {
      console.log(error);
      Alert.alert('Failed, please retry')

     


   
 }

})


}




////GEOFENCING///////////////
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
  
    const R = 6371e3; // Earth's radius in meters
    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lon2 - lon1);
  
    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = R * c; // Distance in meters
    return distance;
  };




  useEffect(() => {
    if (currentLocation && location && location.polygonPoints) {
      try {
        // 1. Prepare Polygon Coordinates [ [lng, lat], [lng, lat]... ]
        let coords = location.polygonPoints.map(p => [p.longitude, p.latitude]);

        // 2. Ensure polygon is closed (Turf requirement)
        if (coords[0][0] !== coords[coords.length - 1][0] || coords[0][1] !== coords[coords.length - 1][1]) {
          coords.push(coords[0]);
        }

        // 3. Create Turf objects
        const pt = turf.point([currentLocation.coords.longitude, currentLocation.coords.latitude]);
        const poly = turf.polygon([coords]);

        // 4. Check if point is inside
        const isInside = turf.booleanPointInPolygon(pt, poly);
        
        setwithinLoc(isInside); // Reverted bypass: use turf verification
        
        // Optional: Calculate distance to first point just for UI feedback
        const dist = calculateDistance(
          location.polygonPoints[0].latitude,
          location.polygonPoints[0].longitude,
          currentLocation.coords.latitude,
          currentLocation.coords.longitude
        );
        setdistance(Math.round(dist));

      } catch (err) {
        console.error("Geofencing error:", err);
        setwithinLoc(false);
      }
    }
  }, [currentLocation, location]);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (currentLocation) {
    text = JSON.stringify(currentLocation);
    
    
  }

///GEOFENCING COMPLETED





  //Request Permission
  const requestPermissions = async () => {

    let { status } = await Location.requestForegroundPermissionsAsync();
    const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraStatus.status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
    }

    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setCurrentLocation(location);

    //console.log(currentLocation)
  };
  


  const launchCamera = async () => {

  if(withinLoc){ //insted of  true need to add withloc
      let options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
       // allowsEditing: true,
        aspect: [2,2],
        quality:0.5,
        base64: true, 
        
      };
  
      try {
        let result = await ImagePicker.launchCameraAsync(options);
        if (!result.cancelled) {
          const x = result.assets[0].base64 ? `data:image/jpeg;base64,${result.assets[0].base64}` : '';
          setBase64Image(x);
  
          const ImageData={
            "image":x,
            "Id":ids
  
          };
          
            
            try {
                const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL2}/recognize`, ImageData, {
                  timeout: 10000 // 10 seconds timeout
                });
                console.log('Recognition Result:',Object.values(response.data)[0]);
                setResponse(Object.values(response.data)[1])
                setResponse2(Object.values(response.data)[0])
                console.log(response2)
                
               
               
            } catch (error) {
                console.error('Error:', error);
                Alert.alert("Server Error")
  
               
            }
  
  
          
        }
      } 
      
      catch (error) {
        console.error('Error launching camera: ', error);
      }

    }
 

    else{
      Alert.alert("Oops!You're in out of Range")
    }
    
   
  };

const renderFile=()=>{
  if(response){
    return(
      <View style={{marginTop:20}}>
       
        

        <Text style={{fontSize:18,fontWeight:400}}>ID:</Text>
        <Text style={{fontSize:22,fontWeight:600}}>{response2.Id}</Text>
         
        <Text style={{fontSize:18,fontWeight:400}}>Name:</Text>
        <Text style={{fontSize:22,fontWeight:600}}>{response2.name}</Text>
        
        <View style={{flexDirection:"row",marginTop:20}}>
            <TouchableOpacity onPress={Handleregister} style={{flex:1,backgroundColor:"#1A2980",padding:13,borderRadius:10,justifyContent:"center",alignItems:"center",marginRight:5}}>
              <Text style={{fontSize:16,color:'white',fontWeight:600}}>Check IN</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={UpdateRegister} style={{flex:1,backgroundColor:"#66a4fd",padding:13,borderRadius:10,justifyContent:"center",alignItems:"center",marginleft:5}}>
              <Text style={{fontSize:16,color:'#1A2980',fontWeight:600}}>Check Out</Text>
            </TouchableOpacity>
          </View>
      </View>

      

    )
  }

  else{
    return(
      <View>
        <Text style={{margin:20,fontSize:24,color:"red"}}> {response2}</Text>
        

      </View>
    )
  }


}


  const renderFileUri = () => {
    if (base64Image) {
      return ( 
      
      <View style={{justifyContent:"center",alignItems:"center",marginTop:30}}>

        <Image source={{uri:base64Image}} style={{justifyContent:"center",alignItems:"center",height:300,width:300,borderRadius:20,borderColor:"black",borderWidth:1}}/>
       

        <View style={{justifyContent:"center",alignItems:"center"}}>{renderFile()}</View>
        
        
      </View>)

    }

     else {
      return (
      <View>
         <Text style={{ textAlign: 'center', fontSize: 20, paddingBottom: 10 ,fontWeight:"600"}}>
            Take your selfie for mark your Attendance
          </Text>
          <Image
          source={require('../assets/young-smiling-man-taking-selfie-260nw-2413163751.png')
            
          }
          style={{justifyContent:"center",alignItems:"center",height:300,width:300,borderRadius:20}}
        />

        <View style={{alignItems:"center",marginTop:50}}>
          <Text style={{fontSize:18,fontWeight:"600", color: withinLoc ? "green" : "red"}}>
            Status: {withinLoc ? "Within Office Boundary" : "Outside Office Boundary"}
          </Text>
          <Text style={{fontSize:14, color: "gray", marginTop: 5}}>
            Approx. distance to center: {distance}m
          </Text>
          <Text style={{fontSize:12, color: "blue", marginTop: 5}}>
            My GPS: Lat {currentLocation?.coords?.latitude?.toFixed(6)}, Lng {currentLocation?.coords?.longitude?.toFixed(6)}
          </Text>
          {location?.polygonPoints && (
            <Text style={{fontSize:12, color: "purple", marginTop: 2, textAlign: 'center'}}>
              Boundary points: {location.polygonPoints.map((p, idx) => `[${p.latitude.toFixed(4)}, ${p.longitude.toFixed(4)}]`).join(' ')}
            </Text>
          )}
        </View>
           

            <TouchableOpacity onPress={launchCamera} style={{backgroundColor: withinLoc ? "#E3B5F7" : "#ccc", marginTop:10,padding:15,borderRadius:18,justifyContent:"center",alignItems:"center"}} disabled={!withinLoc}>
              <Text style={{color:'white',justifyContent:"center",alignItems:'center',fontSize:24,fontWeight:"600"}}>Launch Camera</Text>
            </TouchableOpacity>
         
      </View>
      );
    }
  };

  return (
  
      
      <SafeAreaView style={{backgroundColor:"white",flex:1}} >

        <View style={{flexDirection:"row",marginTop:50}} >

          <Pressable style={{margin:10,justifyContent:"center",alignItems:"center"}}  onPress={() => navigation.navigate("EmpScreen")}>
            <Ionicons name="arrow-back" size={26} color="White" />
          </Pressable>

          
         
        </View>

      
        <ScrollView>
        <View style={{margin:20,justifyContent:"center",alignItems:"center",paddingTop:20,paddingBottom:20,padding:10,borderRadius:20}}>
        
     
      <Text style={{fontSize:18,fontWeight:"400"}}>Date:  {currentDay}</Text>
      <Text style={{fontSize:18,fontWeight:"400"}}>Time:  {currentTime}</Text>
       
       
      
     
              <View >{renderFileUri()}</View>
           
  
           
          </View>

        </ScrollView>
        
       
       
      </SafeAreaView>
    
  );
};




const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
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
