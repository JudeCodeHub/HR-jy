import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar } from "react-native-paper";

export default function Chat({ route }) {
  const data = route.params;
  console.log(data);
  const HR = data.HR._id;
  const navigation = useNavigation();
  const [Employee, setEmployee] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/Employee/hr/${HR}`);
      if (response.ok) {
        const data = await response.json();
        setEmployee(data);
      } else {
        console.error("Errorrr:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View
        style={{
          marginTop: 50,
          marginHorizontal: 10,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          margin: 20,
        }}
      >
        <Pressable
          onPress={() => navigation.navigate("Home")}
          style={{ backgroundColor: "#66a4fd", padding: 3, borderRadius: 20 }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "600",
            color: "rgba(131, 112, 223,1)",
            flex: 1,
            textAlign: "center",
          }}
        >
          EMPLOYEE LIST
        </Text>
      </View>

      {Employee.map((employee, index) => (
        <TouchableOpacity
          key={index}
          style={{
            margin: 2,
            marginLeft: 7,
            marginRight: 7,
            padding: 2,
            borderRadius: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          onPress={() =>
            navigation.navigate("ChatScreen", {
              employeeId: employee._id,
              HR_Id: HR,
            })
          }
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar.Image
              size={80}
              style={{ margin: 5 }}
              source={{
                uri: !employee ? "data:image/png;base64,..." : employee.image,
              }}
            />

            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "600",
                  color: "black",
                  marginHorizontal: 10,
                }}
              >
                {employee.Name}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "600",
                  color: "black",
                  marginHorizontal: 10,
                }}
              >
                {employee._id}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
