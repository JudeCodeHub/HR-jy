import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Tasks({ route }) {
    const employee= route.params;
     
    const navigation = useNavigation();
    const [Title, setTitle] = useState("");
    const [Descriptions, setDescriptions] = useState("");
    const [StartDate, setStartDate] = useState(new Date());
    const [EndDate, setEndDate] = useState(new Date());
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

    // Debugging: Check employee data
    console.log("Employee Data:", employee);

    // Function to handle task creation
    const handleCreateTask = () => {
        // Validate inputs before sending request
        if (!Title || !Descriptions || !StartDate || !EndDate) {
            Alert.alert("Error", "All fields are required");
            return;
        }

        // Prepare task data
        const formattedStartDate = StartDate.toISOString();
        const formattedEndDate = EndDate.toISOString();
        const taskData = { employee, Title, Descriptions, StartDate: formattedStartDate, EndDate: formattedEndDate };

        // Send task data using axios
        axios.post(`${process.env.EXPO_PUBLIC_API_URL}/Tasks`, taskData)
        .then((response) => {
            console.log("Response data:", response.data);
            if (response.status === 200 || response.status === 201) {
                Alert.alert("Success", "Task created successfully");
                navigation.navigate("ListofTasks", { employee }); // Navigate to task list after creation
            } else {
                Alert.alert("Error", "Failed to create task");
            }
        })
        .catch((error) => {
            console.error("Error:", error.response ? error.response.data : error.message);
            Alert.alert("Error", "An error occurred while creating the task");
        });
    };


    return (
        <ScrollView style={{ backgroundColor: "white" }}>
            <View style={{ marginTop: 50, marginHorizontal: 10, flexDirection: "row", justifyContent: "flex-start", alignItems: "center", margin: 20 }}>
                <Pressable onPress={() => navigation.navigate("ListofTasks", { employee })} style={{ backgroundColor: "#66a4fd", padding: 5, borderRadius: 20 }}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </Pressable>
                <Text style={{ fontSize: 22, fontWeight: "600", color: "#6066C6", flex: 1, textAlign: "center" }}>New Task Details</Text>
            </View>

            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="Title" value={Title} onChangeText={setTitle} />
                <TextInput style={styles.input2} placeholder="Descriptions" value={Descriptions} onChangeText={setDescriptions} multiline />
                
                <TouchableOpacity onPress={() => setShowStartPicker(true)}>
                    <Text style={styles.dateText}>Start Date: {StartDate.toLocaleDateString()}</Text>
                </TouchableOpacity>
                {showStartPicker && (
                    <DateTimePicker
                        value={StartDate}
                        mode="date"
                        display="default"
                        onChange={(event, date) => {
                            setShowStartPicker(false);
                            if (date) setStartDate(date);
                        }}
                    />
                )}

                <TouchableOpacity onPress={() => setShowEndPicker(true)}>
                    <Text style={styles.dateText}>End Date: {EndDate.toLocaleDateString()}</Text>
                </TouchableOpacity>
                {showEndPicker && (
                    <DateTimePicker
                        value={EndDate}
                        mode="date"
                        display="default"
                        onChange={(event, date) => {
                            setShowEndPicker(false);
                            if (date) setEndDate(date);
                        }}
                    />
                )}

                <Pressable onPress={handleCreateTask} style={styles.button}>
                    <Text style={styles.buttonText}>Create Task</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    input2: {
        height: 150,
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignContent: "flex-start",
        alignItems: "flex-start",
    },
    dateText: {
        padding: 15,
        marginBottom: 10,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        textAlign: "center",
        backgroundColor: "#f0f0f0",
    },
    button: {
        backgroundColor: "#66a4fd",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
    },
});
