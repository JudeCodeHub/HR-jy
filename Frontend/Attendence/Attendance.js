import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from "react";
import { Alert, Pressable, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { Checkbox } from 'react-native-paper';



export default function Attendance({route})
{

  const navigation=useNavigation()
    const{AttendanceID}=route.params;
   // const [currentDateTime, setCurrentDateTime] = useState('');
    
      const [currentTime, setCurrentTime] = useState('');
      const [attendanceID, setattendanceID] = useState('');


    
    

      useEffect(() => {
        // Function to update current time
        const updateCurrentTime = () => {
          const now = new Date();
          const hours = now.getHours();
          const minutes = now.getMinutes();
          const seconds = now.getSeconds();
    
          // Format the time to ensure two digits
          const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
          setCurrentTime(formattedTime);
        };
    
        // Update time immediately when component mounts
        updateCurrentTime();
    
        // Update time every second (1000 milliseconds)
        const intervalId = setInterval(updateCurrentTime, 1000);
    
        // Clear interval on component unmount to avoid memory leaks
        return () => clearInterval(intervalId);
      }, []);

  
    const [attendanceStatus, setAttendanceStatus] = useState(null);
    const [selected, setSelected] = useState('');
    const [time,settime]=useState('')
  

    const Handleregister=()=>{
     
     
        if (!selected || !attendanceStatus) {
            Alert.alert('Please select a date and choose attendance status.');
            return;
          }
        
          settime(currentTime)
          console.log(time)
        

        const Attandance_record={
            AttendanceID:AttendanceID,
            Date:selected,
            Checkin:time,
            Checkout:time,
            status:attendanceStatus
        }
        axios.post(`${process.env.EXPO_PUBLIC_API_URL}/Attendance_record`,Attandance_record)
       
        .then((res)=>{
          console.log(res.data.id)
            setattendanceID(res.data.id)
            console.log(attendanceID)
            Alert.alert(`Attendance MArked Succesfully on ${Attandance_record.Date} checkinTime:${Attandance_record.Checkin}` )
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
    
       
      

//Checkout
const UpdateRegister=()=>{
  console.log(attendanceID)

    
  const Attandance_record={
    
      Checkout:currentTime,
      
  }


 axios.post(`${process.env.EXPO_PUBLIC_API_URL}/Attendance_record/${attendanceID}`,Attandance_record)

 .then((res)=>{
     console.log(res.data)
     Alert.alert(res.data.message )
     setattendanceID('')
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






    
    return(
   

     <LinearGradient colors={["white", "white"]} style={{flex:1}}>

       <View style={{ marginTop: 35,flexDirection: "row", justifyContent: "flex-start",alignItems: "center",padding:10}}>
          <Pressable onPress={() => navigation.navigate("AttendanceHome")}>
            <Ionicons name="arrow-back" size={26} color="black" />
          </Pressable>

          <Text style={{fontSize: 26,fontWeight: "600",color: "rgba(131, 112, 223,1)",flex: 1,textAlign: "center"}}>Mark Attendance</Text>

        </View>


        <View style={{justifyContent:"center",alignItems:"center",marginTop:28}}>
         <Text style={{ fontSize:20,fontWeight:500}}>Current Time: {currentTime}</Text>

        </View>
        

      <View style={{marginTop:12,margin:10}}>

        
        
     
  <Calendar
  // Customize the appearance of the calendar
  style={{
    borderWidth: 1,
    borderColor:'black',
    height: 400,
    borderRadius:20,
    backgroundColor:"#66a4fd",
    
  }}
  // Callback that gets called when the user selects a day
  onDayPress={day => {
   // console.log(day)
    setSelected(day.dateString)  
  }}

  markedDates={{
    [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
  }}
 
/>




<View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:"center",margin:10,backgroundColor:"#66a4fd",marginTop:30,borderRadius:10,padding:5}}>

       <View style={{ flexDirection: 'row', alignItems: 'center',flex:1,justifyContent:"center",backgroundColor:"white"}}>
          <Checkbox.Android
            status={attendanceStatus === 'present' ? 'checked' : 'unchecked'}
            onPress={() => setAttendanceStatus('present')}
          />
          <Text>Present</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' ,flex:1,justifyContent:"center",backgroundColor:"white"}}>
          <Checkbox.Android
            status={attendanceStatus === 'absent' ? 'checked' : 'unchecked'}
            onPress={() => setAttendanceStatus('absent')}
          />
          <Text>Absent</Text>
        </View>
</View>

<View style={{flexDirection:"row",marginTop:20}}>
            <TouchableOpacity onPress={()=>Handleregister()} style={{flex:1,backgroundColor:"#66a4fd",padding:10,borderRadius:10,justifyContent:"center",alignItems:"center",margin:10}}>
              <Text style={{fontSize:16,color:'white',fontWeight:600}}>Check IN</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>UpdateRegister()} style={{flex:1,backgroundColor:"#66a4fd",padding:10,borderRadius:10,justifyContent:"center",alignItems:"center",margin:10}}>
              <Text style={{fontSize:16,color:'white',fontWeight:600}}>Check Out</Text>
            </TouchableOpacity>
          </View>


       
   
        </View>

     </LinearGradient>
      
    )
}
