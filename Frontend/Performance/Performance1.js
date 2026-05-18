import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-paper";

export default function Performance1({route}){

    const HR=route.params
  
    const navigation=useNavigation();
    const [Employee,setEmployee]=useState([]);

    useEffect(()=>{
        fetchData();


    },[]);

    const fetchData = async () => {
        try {
          const response = await fetch(`http://192.168.229.100:3500/Employee/hr/${HR}`);
          if (response.ok) {
            const data = await response.json();
            setEmployee(data);
          
          } else {
            console.error("Errorrr:", response.status, response.statusText);
          }
        }
        
        catch (error) {
          console.error("Error:", error);
        }
      };
      return (

        <ScrollView style={{backgroundColor:"white"}}>
          <View style={{ marginTop: 50,marginHorizontal: 10,flexDirection: "row",justifyContent: "flex-start", alignItems: "center",margin:20}}>

          <Pressable onPress={() => navigation.navigate("Home")} style={{backgroundColor:"#66a4fd",padding:3,borderRadius:20}}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
          <Text style={{ fontSize: 22, fontWeight: "600",color: "rgba(131, 112, 223,1)",flex: 1,  textAlign: "center"}}>EMPLOYEE LIST</Text>



        </View>
          
          {Employee.map((employee, index) => (
            <TouchableOpacity key={index} style={{ margin:2,marginLeft:7,marginRight:7, padding: 2,backgroundColor:"#66a4fd", borderRadius: 10,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>

                <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                <Avatar.Image
              size={80}
              style={{margin:5}}
              source={{
                uri:
                 !employee
                    ?'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAM1BMVEXFzeD////Byt7L0uPByd7Q1+b7/P3j5/Dv8fbe4+3r7vTFzuDL0+P19/rn6/LZ3urW2+lU+LHUAAAFLklEQVR4nO2dC3arMAxEQXwCcfjsf7XPkLw2tEka5AEziu8CeuKpJVmyLLIskUgkEkdFbsT+HXEQKbNqOPWN59y72D9nd/z/vWqbOv/mozSY9n116vIl1acYg1++G9v+5/rzvMs+QwL/7x/O9a/lT5zL2D9uF7wAzcP1e+pP2AQi4/mZAJ6TfQ3EtY9N4D+jdQ2k6F8K4OltayDFKyP4cghmI6PzVvDnHrDuEqR9UwFPY1IEufw+C72yh8LeIUFOaxSY6K0dFt2qTXDDVJCUi0IBT2vHHmTUSWAnPjgZtBJ4p2BjJ4RIYCSHlCpEAi+CAXMowiSwIIJoguKSE7k5rD8aPWDg3gnKg8EPLrGXEUL5tGC2ijr2OkIIjAlfEJdVBLMNcmprQEnAW09YUzT5C9aNADgbfMGaPQlOgrwj1cAlDZIGGVYD2ktIpAasiRNQgzxpkOektoCMjUkDT+zFaEFqwNqohtSgiL0YHcHlVAMaoCooM6SJo/qK7RGk+yBpkGVBl2w2NAi7aEwamNEAWE5MGiQNkgZJg6RB0sCEBoj+C3YN0j5IGkyks3LKnSegdaSkQdIgaUCtwcf7RJHy02OjVG3/+knvSlxJd+uK7Emb6eqOrQVBoJvgCtu16xYasF23QXsPWDVI+yArN9CALTyW6LhAqAE8NuaEcQH2fOMbtkNS+e7IC8MaYIuJM3TnRGwxcYbvPQ+0eDBD95TFIRv3rwyx17Qa/EGRbmqSAz1xvSP2ktaDvW3MOV9xoJ0i43tftEPgc4n4U1Ls9ajAbgTOkSCh02AW1GxJ4w2gCKwSIAspF0pLmIB5BNaXvhnwnMSXMn6DqrBzBoUrqKoiXdp8B6qqWMVeSADyzijhNyDeBiinyOwSUc95uAemYZ66sl0wLYGcFPmK6gsgCTRzZJxAlJe5TQFyQiA3hQxRVuSOChPBXrEW2trBf/RDts1sg+C8iXZA1oKwc9IY++dDCDojUKcKd5T67JF6ou4C9SHBhjO4os2hiWupv1Hm0JY00LpFKx5xQmsLpjRQdisy19R/om3MsaSB9rxsSgOdBKY00E5SZOxBeoa2kGJJA+01gyEN1JmjJQ20jxnYq+p3qPNGQxqo66qtHQ3UfUlJA0MalKJ+8NnyPfh/hFzOnbpFr6vP7JeNGaALw0BJMfzemT4+IhqSYq8hFESDInNj3ky4BPSXroieLPZDAuI7nuROsUS84iAvqKmT5gWxVxEIQgJuY8BsA+6NgPmyMXVkQHXuM+cMuBEIjO98Z4K78r5pOFtVpWiRn7Qd+aop5QU9AqJuMyYVRKoNJkT58OD/cuy1vYUX4LTBvLgrzVAcXwYpthPgSjcc2ybkgjoRvKQvjqrCVl7gEU11RJMQGTeYFvicbjyaCnsrMFG3R1JBsnZjR/hEhf4gJiHi0NOg1nCOL8OejvAJ3RBTBScy7O4GHlCfXCwV4hrBkvMlQmYpZXQjWLJ7sJTyEEawZNfMsowUC/+m38kxiNtgbDCMZgfHIMUuaVEA3cYnBnx5aAu8e9xMASkYFJjoNpo/K+7oVnBPg68xuKw8zoHoPXp0pCzHg0bDV0CTa3EsjmBJjUunsB9u35Ua08wkGecmuIEIEVIReoIFwTf38JHhEQgcxuqOlx4qCBFBCnY7uKH/uhV0SHRU9CNFUO1EB0A9TMKIIczoggP+QxpRUQ0cM+MMrmiezG7x0bmoKDYCZhLqgVjf8WvhfLhkfaPnFt/di8zq6XNbfIczMqsHDW3xTdrYPFvrP7kiUsVMV4ODAAAAAElFTkSuQmCC'
                    : employee.image,
              }}
            />
                <View>
                <Text style={{fontSize:20,fontWeight:600,color:"white",marginHorizontal:10,color:"white"}}>{employee.Name}</Text>
                <Text style={{fontSize:10,fontWeight:600,color:"white",marginHorizontal:10,color:"white"}}>{employee._id}</Text>

                </View>
                
                

                </View>
       
              <View style={{alignItems:"center",justifyContent:"center"}}>

            
              </View>
             
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    }


