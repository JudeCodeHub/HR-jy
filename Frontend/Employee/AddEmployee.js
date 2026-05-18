import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import { Alert, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Avatar } from 'react-native-paper';

import { useNavigation } from "@react-navigation/native";


export default function AddEmployee({route})
{   
    const HR=route.params
    console.log(HR)
    const HR_id=HR._id

   // console.log(HR)
    const navigation=useNavigation();
    const [Name,SetName]=useState("");
    const [image,SetImage]=useState();
    const [mobile,Setmobile]=useState();
    const [Gender,SetGender]=useState();
    const [email,Setemail]=useState();
    const [password,Setpassword]=useState();
    const [JobRole,SetJobRole]=useState("");
    
    const [WorkingDays,SetWorkingDays]=useState("");
    const [AllowedLeave,SetAllowedLeave]=useState("");

    const [PaymentData, setPaymentData] = useState({
        Basicsalary: '',
        Costofliving: '',
        Foodallowance: '',
        Medicalallowance: '',
        Otherallowance:''
      });
    
      const handleInputChange = (field, value) => {
        setPaymentData(prevData => ({
            ...prevData,
            [field]: value
        }));
    };


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
          const data = result.assets[0].base64;
          SetImage(`data:image/png;base64,${data}`);
        }
      };
      

    const handleRegister = () => {
        if (!image || Name.trim() === "" || JobRole.trim() === "" || WorkingDays.trim() === "" || AllowedLeave.trim() === "" || 
        PaymentData.Basicsalary.trim() === "" || PaymentData.Costofliving.trim() === "" || 
        PaymentData.Foodallowance.trim() === "" || PaymentData.Medicalallowance.trim() === "" || 
        PaymentData.Otherallowance.trim() === "") {
        
        Alert.alert("Error", "Please fill in all fields and select an image.");
        return; 
    }
        const employeeData = {
            HR:HR_id,
            Name: Name,
            Job: JobRole,
            image:image,
            mobile:mobile,
            gender:Gender,
            email:email,
            password:password,
            
            

        
        };
        console.log(employeeData)
    
        axios.post(`${process.env.EXPO_PUBLIC_API_URL}/Employee`, employeeData)
     

            .then((response) => {

                const newEmployeeId = response.data.employee._id; 
                console.log(response.data);
                
              
                const attendanceData = {
                    WorkingDays: WorkingDays,
                    AllowedLeaves: AllowedLeave,
                    employee: newEmployeeId
                };

                const paymentData = {
                    Basicsalary: PaymentData.Basicsalary,
                    Costofliving:PaymentData.Costofliving,
                    Foodallowance:PaymentData.Foodallowance,
                    Medicalallowance:PaymentData.Medicalallowance,
                    Otherallowance:PaymentData.Otherallowance,
                    employee: newEmployeeId
                };
    
        
                axios.post(`${process.env.EXPO_PUBLIC_API_URL}/Attendance`, attendanceData)
                    .then((response) => {
                        console.log(response.data);
                        SetWorkingDays("");
                        SetAllowedLeave("");
                        
                    })
                    .catch((err) => {
                        Alert.alert("Failed to save attendance data");
                        console.log(err);
                    });
    
                

                axios.post(`${process.env.EXPO_PUBLIC_API_URL}/Payment`, paymentData)
                .then((response) => {
                    console.log(response.data);
                    Alert.alert("Registration Successful");

                    setPaymentData({
                        Basicsalary: '',
                        Costofliving: '',
                        Foodallowance: '',
                        Medicalallowance: '',
                        Otherallowance:''

                    })


                })
                .catch((err) => {
                    Alert.alert("Failed to save Payment data");
                    console.log(err);
                });


              
                SetName("");
                SetJobRole("");
                Setmobile();
                SetImage();
                Setemail();
                SetGender();
                Setpassword()
               
            })

            .catch((err) => {
                Alert.alert("Failed to register employee");
                console.log(err)
            });
    };
    
     
        


    
    return(
        

        <View style={{flex:1}}>
            <ScrollView>
            <View style={{ marginTop: 35,flexDirection: "row", justifyContent: "flex-start",alignItems: "center",padding:10,backgroundColor:'#66a4fd'}}>
          <Pressable onPress={() => navigation.navigate("Employee",{HR})}>
            <Ionicons name="arrow-back" size={26} color="white" />
          </Pressable>

          <Text style={{fontSize: 22,fontWeight: "600",color: "white",flex: 1,textAlign: "center"}}>EMPLOYEE REGISTTRATION</Text>

         
        </View>
            <View style={{margin:10,padding:20,backgroundColor:"#F9F4FD",borderRadius:20}}>


               
                <View style={{justifyContent:"center",alignItems:"center"}}>
                

                <TouchableOpacity onPress={() =>selectPhoto()}>
            <Avatar.Image
              size={140}
              style={{}}
              source={{
                uri:
                 image==""|| image==null
                    ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAM1BMVEXFzeD////Byt7L0uPByd7Q1+b7/P3j5/Dv8fbe4+3r7vTFzuDL0+P19/rn6/LZ3urW2+lU+LHUAAAFLklEQVR4nO2dC3arMAxEQXwCcfjsf7XPkLw2tEka5AEziu8CeuKpJVmyLLIskUgkEkdFbsT+HXEQKbNqOPWN59y72D9nd/z/vWqbOv/mozSY9n116vIl1acYg1++G9v+5/rzvMs+QwL/7x/O9a/lT5zL2D9uF7wAzcP1e+pP2AQi4/mZAJ6TfQ3EtY9N4D+jdQ2k6F8K4OltayDFKyP4cghmI6PzVvDnHrDuEqR9UwFPY1IEufw+C72yh8LeIUFOaxSY6K0dFt2qTXDDVJCUi0IBT2vHHmTUSWAnPjgZtBJ4p2BjJ4RIYCSHlCpEAi+CAXMowiSwIIJoguKSE7k5rD8aPWDg3gnKg8EPLrGXEUL5tGC2ijr2OkIIjAlfEJdVBLMNcmprQEnAW09YUzT5C9aNADgbfMGaPQlOgrwj1cAlDZIGGVYD2ktIpAasiRNQgzxpkOektoCMjUkDT+zFaEFqwNqohtSgiL0YHcHlVAMaoCooM6SJo/qK7RGk+yBpkGVBl2w2NAi7aEwamNEAWE5MGiQNkgZJg6RB0sCEBoj+C3YN0j5IGkyks3LKnSegdaSkQdIgaUCtwcf7RJHy02OjVG3/+knvSlxJd+uK7Emb6eqOrQVBoJvgCtu16xYasF23QXsPWDVI+yArN9CALTyW6LhAqAE8NuaEcQH2fOMbtkNS+e7IC8MaYIuJM3TnRGwxcYbvPQ+0eDBD95TFIRv3rwyx17Qa/EGRbmqSAz1xvSP2ktaDvW3MOV9xoJ0i43tftEPgc4n4U1Ls9ajAbgTOkSCh02AW1GxJ4w2gCKwSIAspF0pLmIB5BNaXvhnwnMSXMn6DqrBzBoUrqKoiXdp8B6qqWMVeSADyzijhNyDeBiinyOwSUc95uAemYZ66sl0wLYGcFPmK6gsgCTRzZJxAlJe5TQFyQiA3hQxRVuSOChPBXrEW2trBf/RDts1sg+C8iXZA1oKwc9IY++dDCDojUKcKd5T67JF6ou4C9SHBhjO4os2hiWupv1Hm0JY00LpFKx5xQmsLpjRQdisy19R/om3MsaSB9rxsSgOdBKY00E5SZOxBeoa2kGJJA+01gyEN1JmjJQ20jxnYq+p3qPNGQxqo66qtHQ3UfUlJA0MalKJ+8NnyPfh/hFzOnbpFr6vP7JeNGaALw0BJMfzemT4+IhqSYq8hFESDInNj3ky4BPSXroieLPZDAuI7nuROsUS84iAvqKmT5gWxVxEIQgJuY8BsA+6NgPmyMXVkQHXuM+cMuBEIjO98Z4K78r5pOFtVpWiRn7Qd+aop5QU9AqJuMyYVRKoNJkT58OD/cuy1vYUX4LTBvLgrzVAcXwYpthPgSjcc2ybkgjoRvKQvjqrCVl7gEU11RJMQGTeYFvicbjyaCnsrMFG3R1JBsnZjR/hEhf4gJiHi0NOg1nCOL8OejvAJ3RBTBScy7O4GHlCfXCwV4hrBkvMlQmYpZXQjWLJ7sJTyEEawZNfMsowUC/+m38kxiNtgbDCMZgfHIMUuaVEA3cYnBnx5aAu8e9xMASkYFJjoNpo/K+7oVnBPg68xuKw8zoHoPXp0pCzHg0bDV0CTa3EsjmBJjUunsB9u35Ua08wkGecmuIEIEVIReoIFwTf38JHhEQgcxuqOlx4qCBFBCnY7uKH/uhV0SHRU9CNFUO1EB0A9TMKIIczoggP+QxpRUQ0cM+MMrmiezG7x0bmoKDYCZhLqgVjf8WvhfLhkfaPnFt/di8zq6XNbfIczMqsHDW3xTdrYPFvrP7kiUsVMV4ODAAAAAElFTkSuQmCC'
                    : image,
              }}
            />
          </TouchableOpacity>
            </View>
            <View style={{marginTop:30}}>

            <View style={{}}>

            
            <Text style={{fontSize:15,fontWeight:600}} >
                Enter Employee's Name:
            </Text>
            <TextInput value={Name} onChangeText={(text)=>SetName(text)} style={{borderBottomWidth:1}}></TextInput>
            <Text style={{fontSize:15,fontWeight:600}}>
                Job Role:
            </Text>
            <TextInput value={JobRole} onChangeText={(text)=>SetJobRole(text)} style={{borderBottomWidth:1}}></TextInput>

            <Text style={{fontSize:15,fontWeight:600}}>
                Mobile:
            </Text>
            <TextInput value={mobile} onChangeText={(text)=>Setmobile(text)} style={{borderBottomWidth:1}}></TextInput>

            <Text style={{fontSize:15,fontWeight:600}}>
                email:
            </Text>
            <TextInput value={email} onChangeText={(text)=>Setemail(text)} style={{borderBottomWidth:1}}></TextInput>

            <Text style={{fontSize:15,fontWeight:600}}>
                Gender:
            </Text>
            <TextInput placeholder="Female or Male" value={Gender} onChangeText={(text)=>SetGender(text)} style={{borderBottomWidth:1}}></TextInput>
            <Text style={{fontSize:15,fontWeight:600}}>
                password:
            </Text>
            <TextInput value={password} onChangeText={(text)=>Setpassword(text)} style={{borderBottomWidth:1}}></TextInput>
            </View>

            <View style={{backgroundColor:"#EEE3CE",marginTop:15,borderRadius:10,padding:10}}>
                <Text style={{fontSize:20,fontWeight:600}}>Attendance Details</Text>
            <Text style={{fontSize:15,fontWeight:600}}>
                WorkingDays:
            </Text>
            <TextInput value={WorkingDays} onChangeText={(text)=>SetWorkingDays(text)} style={{borderBottomWidth:1}}></TextInput>

            <Text style={{fontSize:15,fontWeight:600}}>
                AllowedLeave:
            </Text>
            <TextInput value={AllowedLeave} onChangeText={(text)=>SetAllowedLeave(text)} style={{borderBottomWidth:1}}></TextInput>

            </View>

            <View style={{backgroundColor:"#D4D8EE",marginTop:15,borderRadius:10,padding:10}}>
                <Text style={{fontSize:20,fontWeight:600}}>Payment Details</Text>
            <Text style={{fontSize:15,fontWeight:600}}>
                Hourlysalary:
            </Text>
            <TextInput value={PaymentData.Basicsalary} onChangeText={(text)=>handleInputChange('Basicsalary',text)} style={{borderBottomWidth:1}}></TextInput>
            <View style={{borderColor:"#156D7E",borderWidth:2,padding:5,marginTop:10,borderRadius:10}}>
                <Text style={{fontSize:20,fontWeight:600,color:"#2E4D6C"}}>Allowance</Text>
                 

            <Text style={{fontSize:15,fontWeight:600}}>
                Cost of living:
            </Text>
            <TextInput value={PaymentData.Costofliving} onChangeText={(text)=>handleInputChange('Costofliving',text)} style={{borderBottomWidth:1}}></TextInput>
            <Text style={{fontSize:15,fontWeight:600}}>
                Foodallowance:
            </Text>
            <TextInput value={PaymentData.Foodallowance} onChangeText={(text)=>handleInputChange('Foodallowance',text)} style={{borderBottomWidth:1}}></TextInput>
            <Text style={{fontSize:15,fontWeight:600}}>
                Medicalallowance:
            </Text>
            <TextInput value={PaymentData.Medicalallowance} onChangeText={(text)=>handleInputChange('Medicalallowance',text)} style={{borderBottomWidth:1}}></TextInput>
            <Text style={{fontSize:15,fontWeight:600}}>
                Otherallowance:
            </Text>
            <TextInput value={PaymentData.Otherallowance} onChangeText={(text)=>handleInputChange('Otherallowance',text)} style={{borderBottomWidth:1}}></TextInput>

            </View>
          
            </View>

       

            </View>


            <View style={{justifyContent:"center",alignItems:"center"}}>

            

            <TouchableOpacity  onPress={handleRegister} style={{marginto:10}}>
            <View style={{margin:10,width:200,height:40,backgroundColor:"pink",borderRadius:10,justifyContent:"center",alignItems:"center"}}><Text>SUBMIT</Text></View>

            </TouchableOpacity>
           

            </View>
            

            
           
            
            
            </View>
            </ScrollView>


        
            
        </View>
      
    )
}

