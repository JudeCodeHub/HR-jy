import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Employee({route}){
  const HR = route.params?.HR;
  console.log(HR)
  //console.log(HR_id._id)
   

  const [employees, setEmployees] = useState([]);
  const [input, setInput] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
   // console.log(employees)
  },[]);

  const fetchData = async () => {
    try {

      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/Employee/hr/${HR._id}`);
      //console.log(response)
   
      if (response.ok) {
        const data = await response.json();
        console.log("Success")
        setEmployees(data);
        setFilteredEmployees(data); // Initially, set filteredEmployees to all employeesr

      } else {
        console.error("Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };




  const handleSearch = (text) => {
    setInput(text);
    const filtered = employees.filter((employee) =>
      employee.Name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  return (
    <LinearGradient colors={["#746b9f", "#EEBBD5"]} style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.navigate("Home")}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
          <Text style={styles.title}>EMPLOYEES</Text>
        </View>
        
        <View style={styles.searchContainer}>
          <View style={styles.searchInput}>
            <AntDesign name="search" size={20} color="black" />
            <TextInput
              value={input}
              onChangeText={handleSearch}
              style={{ flex: 1 }}
              placeholder="Search"
            />
          </View>
          <TouchableOpacity style={{margin:5}} onPress={() => navigation.navigate("AddEmployee",HR)}>
            <AntDesign name="plus-circle" size={30} color="#0072b1" />
          </TouchableOpacity>
        </View>

        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={filteredEmployees}
          numColumns={2}
          keyExtractor={(item) => item._id}
          
          renderItem={({ item }) => (
            <TouchableOpacity
            
              style={styles.card}
              onPress={() => navigation.navigate("EmployeeDetails", { item })}
            >
              <Image style={styles.userImage} source={{ uri: item.image }} />
              <View style={styles.cardFooter}>
                <Text style={styles.name}>{item.Name}</Text>
                
                <TouchableOpacity
                  style={styles.followButton}
                  onPress={() => navigation.navigate("EmployeeDetails", { item })}
                >
                  <Text style={styles.followButtonText}>View</Text>
                </TouchableOpacity>

                
              </View>
            </TouchableOpacity>
          )}
        />
        {filteredEmployees.length === 0 && (
          <LinearGradient colors={["#2F284E", "#EEBBD5"]}>
              <View style={styles.noDataContainer}>
            <Text style={{color:"white"}}>No Data</Text>
            <Text>Press on the plus button and add your Employee</Text>
            <Pressable onPress={() => navigation.navigate("AddEmployee", HR)}>
              <AntDesign name="plus-circle" size={24} color="black" />
            </Pressable>
          </View>

          </LinearGradient>
        
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 50,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "white",
    flex: 1,
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 10,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  searchInput: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 7,
    gap: 10,
    backgroundColor: "white",
    borderRadius: 3,
    height: 40,
    flex: 1,
  },
  list: {
    paddingHorizontal: 5,
    marginTop:10,
    
  },
  card: {

    shadowOffset: {
      width:0 ,
      height: 6,
    },
    shadowOpacity: 0.8,
    shadowRadius: 7.49,
    elevation: 12,
    marginVertical: 8,
    backgroundColor: "#e5eaf5",
    flexBasis: "46%",
    marginHorizontal:8,
    borderRadius:20
  },
  userImage: {
    height: 120,
    width: 120,
    borderRadius: 60,
    alignSelf: "center",
    borderColor: "#0072b1",
    borderWidth: 3,
    marginTop:5
  },
  cardFooter: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
  
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    flex: 1,
    alignSelf: "center",
    color: "black",
    fontWeight: "bold",
  },
  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#0072b1",
  },
  followButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});


