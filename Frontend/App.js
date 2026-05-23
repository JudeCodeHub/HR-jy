import "react-native-gesture-handler";
import React from "react";
import { View, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AntDesign, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Attendance from "./Attendence/Attendance";
import AttendanceHome from "./Attendence/AttendanceHome";
import ChatScreen from "./Chat/ChatScreen.js";
import Chat from "./Chat/HRchat";
import Company from "./Companyprofile/companyprofile";
import EmpScreen from "./EmpScreens/EmpHome";
import EmpPerfor from "./EmpScreens/EmpPerfor.js";
import EmpTasks from "./EmpScreens/EmpTasks.js";
import Mark from "./EmpScreens/Mark";
import ViewEmployee from "./EmpScreens/ViewProfile";
import Mychat from "./EmpScreens/mychat.js";
import Loc from "./EmpScreens/newww";
import AddEmployee from "./Employee/AddEmployee";
import Employee from "./Employee/Employee";
import EmployeeDetails from "./Employee/EmployeeDetails";
import Update from "./Employee/Update";
import Home from "./Home";
import HomeScreen from "./Loginscreens/HomeScreen";
import LoginScreen from "./Loginscreens/LoginScreen";
import Signup from "./Loginscreens/Signup";
import CalculatePayroll from "./PayRoll/CalculationPage";
import Daterange from "./PayRoll/Daterange";
import PayRoll from "./PayRoll/PayRoll";
import EmployeeListP from "./Performance/EmployeeListP.js";
import Performance from "./Performance/Performance.js";
import RateEmployee from "./Performance/RateEmployee.js";
import EmployeesList from "./Taskmangement/EmployeesList";
import ListofTasks from "./Taskmangement/ListofTasks.js";
import Tasks from "./Taskmangement/Tasks.js";

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function Tab2({ route }) {
  const HR = route.params?.HR;
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
      barStyle={{ backgroundColor: "white", height: 30, marginBottom: 45 }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        initialParams={{ HR }}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: () => (
            <Ionicons name="home-outline" size={26} color="#0072b1" />
          ),
        }}
      />
      <Tab.Screen
        name="Employee"
        component={Employee}
        initialParams={{ HR }}
        options={{
          tabBarLabel: "Employees",
          tabBarIcon: () => (
            <SimpleLineIcons name="people" size={26} color="#0072b1" />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        initialParams={{ HR }}
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: () => (
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={28}
              color="#0072b1"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Companyprofile"
        initialParams={{ HR }}
        component={Company}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: () => <AntDesign name="user" size={28} color="#0072b1" />,
        }}
      />
    </Tab.Navigator>
  );
}

function Tab3({ route }) {
  const HR = route.params?.HR;
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="EmpScreen"
      barStyle={{ backgroundColor: "white", height: 30, marginBottom: 45 }}
    >
      <Tab.Screen
        name="EmpScreen"
        component={EmpScreen}
        initialParams={{ HR }}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: () => (
            <Ionicons name="home-outline" size={26} color="#0072b1" />
          ),
        }}
      />
      <Tab.Screen
        name="mychat"
        component={Mychat}
        initialParams={HR}
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: () => (
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={28}
              color="#0072b1"
            />
          ),
        }}
      />
      <Tab.Screen
        name="ViewEmployee"
        initialParams={HR}
        component={ViewEmployee}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: () => <AntDesign name="user" size={26} color="#0072b1" />,
        }}
      />
    </Tab.Navigator>
  );
}

function Login_Stack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="initial" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

function HR_Stack({ route }) {
  const user = route.params;
  const HR = user.user;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tab" component={Tab2} initialParams={{ HR }} />
      <Stack.Screen name="Home" component={Home} initialParams={{ HR }} />
      <Stack.Screen name="Employee" component={Employee} />
      <Stack.Screen name="AddEmployee" component={AddEmployee} />
      <Stack.Screen name="EmployeeDetails" component={EmployeeDetails} />
      <Stack.Screen name="UpdateProfile" component={Update} />
      <Stack.Screen name="PayRoll" component={PayRoll} />
      <Stack.Screen name="Daterange" component={Daterange} />
      <Stack.Screen name="Calculationpage" component={CalculatePayroll} />
      <Stack.Screen name="AttendanceHome" component={AttendanceHome} />
      <Stack.Screen name="Attendance" component={Attendance} />
      <Stack.Screen name="EmployeesList" component={EmployeesList} />
      <Stack.Screen name="ListofTasks" component={ListofTasks} />
      <Stack.Screen name="Tasks" component={Tasks} />
      <Stack.Screen name="EmployeeListP" component={EmployeeListP} />
      <Stack.Screen name="Performance" component={Performance} />
      <Stack.Screen name="RateEmployee" component={RateEmployee} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
}

function Employee_stack({ route }) {
  const user = route.params;
  const HR = user.user;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tab2" component={Tab3} initialParams={{ HR }} />
      <Stack.Screen
        name="EmpScreen"
        component={EmpScreen}
        initialParams={{ HR }}
      />
      <Stack.Screen name="Mark" component={Mark} />
      <Stack.Screen name="Loc" component={Loc} />
      <Stack.Screen name="ViewEmployee" component={ViewEmployee} />
      <Stack.Screen name="mychat" component={Mychat} />
      <Stack.Screen name="EmpTasks" component={EmpTasks} />
      <Stack.Screen name="EmpPerfor" component={EmpPerfor} />
    </Stack.Navigator>
  );
}

export default function App() {
  /* 
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", color: "#000000" }}>
        hello there
      </Text>
    </View>
  );
*/

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Logi" component={Login_Stack} />
          <Stack.Screen name="HR_Stack" component={HR_Stack} />
          <Stack.Screen name="Employee_stack" component={Employee_stack} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
