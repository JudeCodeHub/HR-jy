import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Platform, Text, TouchableOpacity, View } from 'react-native';


import { useNavigation } from "@react-navigation/native";


const Daterange = ({route}) => {
  const navigation=useNavigation();
  const{employee,attendanceID,Payment}=route.params;
  console.log(attendanceID)
  
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  // Function to format date as YYYY-MM-DD
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // Format to YYYY-MM-DD
  };

  // Event handler for selecting the start date
  const onStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  // Event handler for selecting the end date
  const onEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

    
      const fetchAttendanceData = async () => {
        try {
          //  console.log(`Start: ${formatDate(startDate)}, End: ${formatDate(endDate)}`);
    
            // Dates object
            const Dates = {
                startDate: formatDate(startDate),
                endDate:formatDate(endDate)
            };
    
            // Fetch the attendance data using async/await
            const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/Attendance_record/workingdays/${attendanceID}`, {
                params: 
                   Dates   
            });
            
             Totalpresnt=response.data.Totalpresent,
             Totalhrs=response.data.totalhrs
             navigation.navigate('Calculationpage',{ employee, attendanceID ,Payment,Totalpresnt,Totalhrs,Dates})
            // Handle the successful response
           // console.log(response.data);
            
        } catch (err) {
            // Show an alert and log the error
            Alert.alert("Failed to fetch attendance data");
            console.error("Error fetching attendance data:", err);
        }
    };
    

  return (
    <View style={{marginTop:100}}>
    <View style={{margin:20}}>
      <Text>Select Start Date:</Text>
     
    
    <TouchableOpacity style={{ padding: 10, backgroundColor: "#0072c1", borderRadius: 5, marginBottom: 20}} onPress={() => setShowStartDatePicker(true)}>
        
    <Text style={{fontSize:20,color:"white"}}>{formatDate(startDate)}</Text>

    </TouchableOpacity>


      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={onStartDateChange}
        />
      )}

      <Text>Select End Date:</Text>
      <TouchableOpacity style={{ padding: 10, backgroundColor: "#0072c1", borderRadius: 5, marginBottom: 20}} onPress={() => setShowEndDatePicker(true)}>
        
        <Text style={{fontSize:20,color:"white"}}>{formatDate(endDate)}</Text>
    
        </TouchableOpacity>
   
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={onEndDateChange}
        />
      )}

        <TouchableOpacity style={{backgroundColor:"pink",padding:10,justifyContent:"center",alignItems:"center",borderRadius:10,margin:10}} onPress={() => fetchAttendanceData()}>
        
        <Text style={{fontSize:20}}>Next</Text>
    
        </TouchableOpacity>

     
    </View>
    </View>
  );
};

export default Daterange;

 
    






