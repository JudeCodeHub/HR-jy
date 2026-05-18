import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions, Image, SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Avatar } from "react-native-paper";

const ads = [
  {
    text: "Ad 1: Enjoy the best deals!",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3LB2dxEnOsAj8625ux4pOUbZM04gYvVaaDPgNMbocrgcA8pLaEFZh4VHBwpnLSIdG9f0&usqp=CAU", // Replace with your image URL
    backgroundColor: "white",
  },
  {
    text: "Ad 2: Limited time offer!",
    image: "https://media.licdn.com/dms/image/C5612AQE6blo9Ts9VEw/article-cover_image-shrink_600_2000/0/1520175581142?e=2147483647&v=beta&t=Tt6x3Vvhy7VXdutamisNukW5biDMTcvlpA6sO4uHqQ4",
    backgroundColor: "white",
  },
  {
    text: "Ad 3: Shop now and save!",
    image: "https://www.shutterstock.com/image-vector/mobile-advertising-online-native-targeting-260nw-2511929605.jpg",
    backgroundColor: "#white",
  },
];

// Reusable component for swiping ad boxes
const SwipableAd = ({ currentAdIndex }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    // Reset the opacity when the current ad changes
    return () => {
      fadeAnim.setValue(0);
    };
  }, [currentAdIndex]);

  return (
    <Animated.View style={[{
      
      position: 'absolute',
      bottom: 20,
      backgroundColor: ads[currentAdIndex].backgroundColor,
      padding:8,
      borderRadius:25,
      width:350,
      
     
     justifyContent:"center",
     alignItems:"center",
     opacity: fadeAnim, // Bind opacity to fadeAnim for fade-in effect
     borderColor:'rgba(131, 112, 223,0.9)',
     borderWidth:2,
     //height:250
    
      
    }]}>
      <Image
        source={{ uri: ads[currentAdIndex].image }}
        style={{ width:320, height: 170, borderRadius: 10, marginBottom: 10 }} // Ad image
      />


      <Text style={{
        fontSize:15,

        color: 'black',
        fontWeight: '600',
        textAlign: 'center',
      }}>
        {ads[currentAdIndex].text}
      </Text>
    </Animated.View>
  );
};

export default function Home({ route }) {


  const Employee = route.params.HR;
  const ids = Employee._id;
  const HR_id=Employee.HR
  
  const [currentAdIndex, setCurrentAdIndex] = useState(0); // Track current ad index

  const Navigator = useNavigation();
  const { width } = Dimensions.get("window");

  useEffect(() => {
    // Change the ad every 3 seconds
    const adTimer = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length); // Cycle through ads
    }, 3000); // 3 seconds for each ad

    return () => clearInterval(adTimer); // Clean up the interval when component unmounts
  }, []);

  return (
    <LinearGradient colors={["#ffefef", "white"]} style={{ flex: 1 }}>
      <ScrollView>
        <SafeAreaView style={{ flex: 1, marginTop: 30 }}>
          {/* Header */}
          <View
            style={{
              height: 158,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
              backgroundColor: "#4e81ca",
              elevation: 2,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 4,
                backgroundColor: "#0015",
                padding: 5,
              }}
            >
              <View style={{ alignItems: "center", flex: 1 }}>
                <Text style={{ fontSize: 26, fontWeight: 800, color: "white" }}>
                  MASTER HR
                </Text>
              </View>
            </View>

            {/* Employee Info */}
            <View
              style={{
                marginTop: 28,
                margin: 5,
                flexDirection: "row",
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 30,
              }}
            >
              <Avatar.Image
                source={{ uri: Employee.image }}
                size={60}
                style={{
                  padding: 10,
                  borderColor: 'white',
                  borderWidth: 3,
                  elevation: 4,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              />
              <View style={{ marginLeft: 10, justifyContent: "center", marginTop: 5 }}>
                <Text style={{ fontSize: 18, fontWeight: "300", color: "white" }}>
                  Hi,
                </Text>
                <Text style={{ fontSize: 22, fontWeight: "500", color: "white" }}>
                  {Employee.Name}
                </Text>
              </View>
            </View>
          </View>

          {/* Single Swipable Ad */}
          <View style={{ marginTop: 250,justifyContent:"center",alignItems:"center" }}>
            <SwipableAd currentAdIndex={currentAdIndex} />
          </View>


          <Text style={{marginLeft:10,marginBottom:10,fontWeight:600,fontSize:20,color:"black"}}>Mark Your Attendance</Text>

          <TouchableOpacity  onPress={() => Navigator.navigate("Mark", { ids,HR_id })} style={{width:width*0.97, margin:5, height:220, backgroundColor:"#66a4fd", flexDirection:"row", borderRadius:30}}>
          
          <View style={{flex:1,margin:10,marginTop:15,padding:5}}>
          <Text style={{fontSize:24,fontWeight:600,color:"white"}}>Mark{"\n"}Attendance</Text>
          <Text style={{fontSize:16,fontWeight:300,color:"white",marginTop:10}}>Mark Your Attendance with Face Recognition and Your Location</Text>

          <View style={{height:38,borderRadius:15,justifyContent:"center",alignItems:"center",width:150,backgroundColor:"#4e81ca",marginTop:20}}>
            <Text style={{fontSize:22,fontWeight:"600",color:"white"}}>Mark</Text>

          </View>


          </View>

          <View style={{backgroundColor:"#0015",borderRadius:30}}>
            <Image source={require('../assets/Employee.png')} style={{height:220,width:140}}/>
          </View>
          </TouchableOpacity >
          

          <Text style={{marginLeft:10, marginBottom:10,marginTop:10, fontWeight:600,fontSize:20,color:"black"}}>My Tasks</Text>

          
          <TouchableOpacity onPress={() => Navigator.navigate("EmpTasks",Employee)} style={{width:width*0.97,margin:5,height:220,backgroundColor:"#66a4fd",flexDirection:"row",borderRadius:30}}>
          <View style={{backgroundColor:"#0015",borderRadius:30,width:170,padding:5}}>
            <Image source={require('../assets/EmployeeTask.png')} style={{height:215,width:150}}/>
          </View>
          
          <View style={{flex:1,margin:10,marginTop:15,padding:5}}>
          <Text style={{fontSize:24,fontWeight:600,color:"white"}}>View{"\n"}My Task</Text>
          <Text style={{fontSize:16,fontWeight:300,color:"white",marginTop:10}}>View Your Pending & Completed Tasks</Text>

          <View style={{height:38,borderRadius:15,justifyContent:"center",alignItems:"center",width:150,backgroundColor:"#4e81ca",marginTop:20}}>
            <Text style={{fontSize:22,fontWeight:"600",color:"white"}}>Tasks</Text>

          </View>

          </View>


          </TouchableOpacity >

          <Text style={{marginLeft:10, marginBottom:10,marginTop:10, fontWeight:600,fontSize:20,color:"black"}}>My Performance</Text>

          <TouchableOpacity onPress={() => Navigator.navigate("EmpPerfor", Employee)} style={{width:width*0.97,margin:5,height:220,backgroundColor:"#66a4fd",flexDirection:"row",borderRadius:30}}>
          
          <View style={{flex:1,margin:10,marginTop:15,padding:5}}>
          <Text style={{fontSize:24,fontWeight:600,color:"white"}}>Find Your{"\n"}Performance</Text>
          <Text style={{fontSize:16,fontWeight:300,color:"white",marginTop:10}}>Find Your Task & Attendance Perfomances</Text>

          <View style={{height:38,borderRadius:15,justifyContent:"center",alignItems:"center",width:150,backgroundColor:"#4e81ca",marginTop:20}}>
          <Text style={{fontSize:22,fontWeight:"600",color:"white"}}>Performance</Text>

          </View>

          </View>

          <View style={{backgroundColor:"#0015",borderRadius:30}}>
            <Image source={require('../assets/EmployeeRating.png')} style={{height:220,width:150}}/>
          </View>
          

          </TouchableOpacity >

            {/* <TouchableOpacity
              style={{ flex: 1, margin: 10 }}
              onPress={() => Navigator.navigate("EmpTasks",Employee)}
            >
              <LinearGradient
                colors={["#1A2980", "#92EFFD"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ flex: 1, borderRadius: 20, alignItems: "center" }}
              >
                <View
                  style={{
                    flex: 1,
                    borderRadius: 30,
                    padding: 8,
                    justifyContent: "center",
                    alignItems:"center",
                    margin:5
                   
                  }}
                >
                  <Ionicons  name="list-circle-outline" size={44} color="white" />
                  <Text style={{ margin:5,fontSize: 20, fontWeight: 800, color: "white" }}>
                    View My Tasks
                   
                  </Text>
                  
                </View>
              </LinearGradient>
            </TouchableOpacity> */}


            
      


          {/* <View
            style={{
              height: 170,
              width: width * 0.96,
              borderRadius: 30,
              margin: 5,
              flexDirection: "row",
            }}
          > */}
            {/* <TouchableOpacity
              style={{ flex: 1, margin: 10 }}
              onPress={() => Navigator.navigate("ViewProfile",Employee)}
            >
              <LinearGradient
                colors={["#753a88", "#F8CDDA"]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{ flex: 1, borderRadius: 30, padding: 8 }}
              >
                <View
                  style={{
                    flex: 1,
                    borderRadius: 30,
                    justifyContent: "center",
                    padding: 8,
                    alignItems:"center"
                  }}
                >
                  <MaterialCommunityIcons name="face-man" size={40} color="white" />
                  <Text style={{ margin:5,fontSize: 20, fontWeight: 800, color: "white" }}>
                    View Profile
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity> */}

            {/* <TouchableOpacity
              style={{ flex: 1, margin: 10 }}
              onPress={() => Navigator.navigate("EmpPerfor", Employee)}
            >
              <LinearGradient
                colors={["#b20a2c", "#fffbd5"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ flex: 1, borderRadius: 30, alignItems: "center" }}
              >
                <View
                  style={{
                    flex: 1,
                    borderRadius: 30,
                    padding: 8,
                    justifyContent: "center",
                    alignItems:"center"
                  }}
                >
                  <MaterialIcons name="stars" size={40} color="white" />
                  
                  <Text style={{ margin:5,fontSize: 20, fontWeight: 800, color: "white" }}>
                    See My Performance
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity> */}


            
          {/* </View> */}
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
}
