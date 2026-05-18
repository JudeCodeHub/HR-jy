import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function Home({route}) {


 const HR=route.params?.HR
 const HR_id=HR._id
 
 

  const{width,height}=Dimensions.get('window')

  const navigation = useNavigation();
  
  return (
    <LinearGradient colors={["#ffefef", "white"]} style={{ flex: 1 }}>
      <ScrollView>
      <SafeAreaView style={styles.container}>

        <View style={{height:158,borderBottomLeftRadius:30,borderBottomRightRadius:30,backgroundColor:"rgba(131, 112, 223,0.9)",elevation:2}}>
          <View style={{flexDirection:"row",alignItems:"center",marginTop:4,backgroundColor:"rgba(0, 114, 177,0.3)",padding:10}}>
            <View style={{alignItems:"center",flex:1}}>
              <Text style={{fontSize:26,fontWeight:800,color:"white"}}>MASTER HR</Text>
            </View>

           
          </View>

          <View style={{marginTop:28,margin:5,flexDirection:"row",borderBottomLeftRadius:30,borderBottomRightRadius:30}}>
            <View style={{height:58,width:58,borderRadius:29,justifyContent:"center",alignItems:"center",backgroundColor:"white"}}>
              <Image source={require('./assets/laptop.gif')} style={{width:40,height:40}}/>
            </View>

            <View style={{marginLeft:10,justifyContent:"center",marginTop:5}}>
              <Text style={{fontSize:18,fontWeight:"300",color:"white"}}>Welcome,</Text>
              <Text style={{fontSize:22,fontWeight:"500",color:"white"}}>{HR.Name}</Text>


            </View>

            <View style={{flex:1,marginRight:4,alignItems:"flex-end",justifyContent:"center"}}>
              <View style={{backgroundColor:"white",heigh:40,borderRadius:20,justifyContent:"center",alignItems:"center",flexDirection:"row",padding:5}}>
                <Text style={{fontWeight:600}}>PRO</Text>
              <MaterialCommunityIcons name="crown" size={32} color="gold" />
              </View>
            </View>

          </View>
        </View>


         
        <View style={{ height: 180, width: width * 0.96, borderRadius: 30, margin: 5, flexDirection: "row"}}>
      <TouchableOpacity style={{ flex: 1, margin:10}} onPress={()=>navigation.navigate("AttendanceHome",HR_id)}>
        <LinearGradient
          colors={["#EE9CA7", "#FFDDE1"]}
          start={{ x: 1, y: 0 }} 
          end={{ x: 0, y: 1 }} 
          style={{ flex: 1, borderRadius: 30,padding:8 }}
        >
          <View style={{ flex: 1, borderRadius: 30,justifyContent:"center" }}>
          <Text style={{fontSize:24,fontWeight:800,color:"white"}}>Attendance</Text>
          <Text style={{fontSize:24,fontWeight:800,color:"white"}}>Management</Text>
         {/* <Text style={{fontSize:16,fontWeight:400,color:"white",marginTop:10}}>Mark Attendance Manually & Manage Leaves</Text> */}
            
          </View>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity style={{ flex: 1, margin:10}} onPress={() => navigation.navigate("PayRoll",HR_id)}>
        <LinearGradient
          colors={["#4E65FF", "#92EFFD"]}
          start={{ x: 0, y: 0 }} // top-left corner
          end={{ x: 1, y: 1 }} // bottom-right corner
          style={{ flex: 1, borderRadius: 30,alignItems:"center"}}
        >
          <View style={{ flex: 1, borderRadius: 30,padding:8,justifyContent:"center"}}>
          <Text style={{fontSize:24,fontWeight:800,color:"white"}}>PayRoll</Text>
          <Text style={{fontSize:24,fontWeight:800,color:"white"}}>Management</Text>
         {/*} <Text style={{fontSize:16,fontWeight:400,color:"white",marginTop:10}}>Automatically generate Payslip for your Employee</Text>*/}
            
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>



      


        <Text style={{marginLeft:10,fontWeight:600,fontSize:20,color:"black"}}>Employee Mangement</Text>

          
          <TouchableOpacity onPress={() => navigation.navigate("Employee",{HR})} style={{width:width*0.97,margin:5,height:220,backgroundColor:"#66a4fd",flexDirection:"row",borderRadius:30}}>
          
          <View style={{flex:1,margin:10,marginTop:15,padding:5}}>
          <Text style={{fontSize:24,fontWeight:600,color:"white"}}>Manage</Text>
          <Text style={{fontSize:24,fontWeight:600,color:"white"}}>Employee's</Text>
         <Text style={{fontSize:16,fontWeight:300,color:"white",marginTop:10}}>Create,Remove,Edit&View your Employee's Profiles</Text>

          <View style={{height:38,borderRadius:19,justifyContent:"center",alignItems:"center",width:150,backgroundColor:"#4e81ca",marginTop:20}}>
            <Text style={{fontSize:22,fontWeight:"600",color:"white"}}>View</Text>

          </View>

          </View>

          <View style={{backgroundColor:"#E9D0FA",borderRadius:30}}>
            <Image source={require('./assets/pngwing.com.png')} style={{height:220,width:150}}/>
          </View>
          

          </TouchableOpacity >



          <Text style={{marginLeft:10,fontWeight:600,fontSize:20,color:"black"}}>Task Mangement</Text>

          
          <TouchableOpacity onPress={() => navigation.navigate("EmployeesList",HR_id)} style={{width:width*0.97,margin:5,height:220,backgroundColor:"#66a4fd",flexDirection:"row",borderRadius:30}}>
          <View style={{backgroundColor:"pink",borderRadius:30,width:170,padding:5}}>
            <Image source={require('./assets/new.png')} style={{height:215,width:170}}/>
          </View>
          
          <View style={{flex:1,margin:10,marginTop:15,padding:5}}>
          <Text style={{fontSize:24,fontWeight:600,color:"white"}}>Task</Text>
          <Text style={{fontSize:24,fontWeight:600,color:"white"}}>Management</Text>
          <Text style={{fontSize:16,fontWeight:300,color:"white",marginTop:10}}>Assign Tasks for your Employee's</Text>

          <View style={{height:38,borderRadius:19,justifyContent:"center",alignItems:"center",width:150,backgroundColor:"#4e81ca",marginTop:20}}>
            <Text style={{fontSize:22,fontWeight:"600",color:"white"}}>Manage</Text>

          </View>

          </View>

          

          </TouchableOpacity >


          <Text style={{marginLeft:10,fontWeight:600,fontSize:20,color:"black"}}>Rating & Performance</Text>

          
          <TouchableOpacity onPress={() => navigation.navigate("EmployeeListP",HR_id)}  style={{width:width*0.97,margin:5,height:220,backgroundColor:"#66a4fd",flexDirection:"row",borderRadius:30}}>
          
          <View style={{flex:1,margin:10,marginTop:15,padding:5}}>
          <Text style={{fontSize:24,fontWeight:600,color:"white"}}>Analyze</Text>
          <Text style={{fontSize:24,fontWeight:600,color:"white"}}>Rating & Performance</Text>
          <Text style={{fontSize:16,fontWeight:300,color:"white",marginTop:10}}>Create,Remove,Edit&View your Employee's Profiles</Text>

          <View style={{height:38,borderRadius:19,justifyContent:"center",alignItems:"center",width:150,backgroundColor:"#4e81ca",marginTop:20}}>
          <Text style={{fontSize:22,fontWeight:"600",color:"white"}}>View</Text>

          </View>

          </View>

          <View style={{backgroundColor:"pink",borderRadius:30}}>
            <Image source={require('./assets/pngwing.com.png')} style={{height:220,width:150}}/>
          </View>
          

          </TouchableOpacity >

         

     
         

     
      
         
          
      
           
        
      

       
       

        
     


     </SafeAreaView>

      </ScrollView>
    
     


    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1,marginTop:30},
  press: {
    backgroundColor: "rgba(184, 184, 243, 0.8)",
    
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  press1: {
    backgroundColor: "#B8B8F3",
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  press2: {
    backgroundColor: "rgba(184, 184, 243, 0.8)",
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: 115,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 6,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    marginTop: 4,
    fontWeight: "500",
    fontSize: 16,
  },
});
