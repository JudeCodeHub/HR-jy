import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";

export default function EmpTasks({ route }) {
  const data = route.params;
  const employee=data._id
  const navigation = useNavigation();
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [completedBeforeDue, setCompletedBeforeDue] = useState([]);
  const [lateCompletion, setLateCompletion] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [completionDate, setCompletionDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [taskDetails, setTaskDetails] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/tasks/${employee}`);
      if (response.ok) {
        const data = await response.json();

        const sortedPendingTasks = data
          .filter(task => !task.completed)
          .sort((a, b) => new Date(a.EndDate) - new Date(b.EndDate));

        const sortedCompletedTasks = data
          .filter(task => task.completed)
          .sort((a, b) => new Date(b.completed_date) - new Date(a.completed_date));

        setPendingTasks(sortedPendingTasks);
        setCompletedTasks(sortedCompletedTasks);

        // New filtering logic for completed tasks
        const completedBeforeDueTasks = sortedCompletedTasks.filter(task => new Date(task.EndDate) >= new Date(task.completed_date));
        const lateCompletionTasks = sortedCompletedTasks.filter(task => new Date(task.EndDate) < new Date(task.completed_date));

        setCompletedBeforeDue(completedBeforeDueTasks);
        setLateCompletion(lateCompletionTasks);
      } else {
        console.error("Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const confirmDelete = (taskId) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure to delete this task?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => handleDelete(taskId),
        },
      ],
      { cancelable: true }
    );
  };

  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/tasks/${taskId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchTasks();
      } else {
        console.error("Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const openConfirmationModal = (task) => {
    setTaskDetails(task);
    setShowModal(true);
  };

  const handleFinish = async () => {
    if (!completionDate) {
      Alert.alert("Please input a valid Completion Date");
      return;
    }

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/tasks/${selectedTaskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: true, completed_date: completionDate }),
      });
      if (response.ok) {
        setCompletionDate(null);
        setSelectedTaskId(null);
        setShowDatePicker(false);
        setShowModal(false);
        fetchTasks();
        Alert.alert("Task Completed Successfully");
      } else {
        console.error("Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || completionDate;
    setShowDatePicker(false);
    setCompletionDate(currentDate);
  };

  return (
    <ScrollView style={{ backgroundColor: "white", padding: 20 }}>
      <View style={{ marginBottom: 20, marginTop: 20, flexDirection: "row", alignItems: "center" }}>
        <Pressable onPress={() => navigation.goBack()} style={{ backgroundColor: "#009bc1", padding: 5, borderRadius: 20 }}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <Text style={{ fontSize: 22, fontWeight: "600", color: "#0072c1", flex: 1, textAlign: "center" }}>TASK LIST</Text>
      </View>

      {/* <Pressable onPress={() => navigation.navigate("Tasks", employee)} style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#009bc1", padding: 15, borderRadius: 15, alignItems: "center", alignSelf: "center", marginTop: 10, marginBottom: 30 }}>
        <Ionicons name="add-circle-outline" size={30} color="white" />
        <Text style={{ color: "white", fontSize: 20 }}> Add New Task</Text>
      </Pressable> */}

      <Text style={{ fontSize: 18, fontWeight: "600", color: "#0072c1", marginBottom: 10 }}>Pending Tasks</Text>
      {pendingTasks.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 10, marginBottom: 20 }}>No pending tasks available.</Text>
      ) : (
        pendingTasks.map((task, index) => (
          <Pressable key={index}>
            <LinearGradient
              colors={["#009bc1", "#0072c1"]}
              start={{ x: 0, y: 1.5 }}
              end={{ x: 1, y: 0 }}
              style={{ flex: 1, borderRadius: 15, padding: 15, marginBottom: 10 }}
            >
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 0 }}>
                <Text style={{ color: "white", fontSize: 20, fontWeight: "600", lineHeight: 30 }}>{task.Title}</Text>
                {/* <Pressable onPress={() => confirmDelete(task._id)}>
                  <Ionicons name="trash-bin" size={24} color="#ffff" />
                </Pressable> */}
              </View>
              <Text style={{ color: "white", fontSize: 15, lineHeight: 20 }}>Description:</Text>
              <Text style={{ color: "white", fontSize: 12, fontWeight: "400", lineHeight: 17, marginBottom: 5 }}>{task.Descriptions}</Text>
              <Text style={{ color: "white", fontSize: 15, lineHeight: 20 }}>Start Date: {new Date(task.StartDate).toLocaleDateString()}</Text>
              <Text style={{ color: "white", fontSize: 15, lineHeight: 20 }}>Due Date: {new Date(task.EndDate).toLocaleDateString()}</Text>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                {/* <Pressable onPress={() => {
                  setSelectedTaskId(task._id);
                  openConfirmationModal(task);
                }} style={{ backgroundColor: "#00c1a1", padding: 10, borderRadius: 5 }}>
                  <Text style={{ color: "white", fontSize: 16 }}>Task Completed</Text>
                </Pressable> */}
              </View>
            </LinearGradient>
          </Pressable>
        ))
      )}

      <Text style={{ fontSize: 18, fontWeight: "600", color: "#0072c1", marginBottom: 10 }}>Completed Tasks</Text>
      {completedTasks.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 10, marginBottom: 20 }}>No completed tasks available.</Text>
      ) : (
        completedTasks.map((task, index) => (
          <View key={index} style={{ backgroundColor: "#229954", padding: 15, borderRadius: 15, marginBottom: 10 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 0 }}>
              <Text style={{ color: "white", fontSize: 20, fontWeight: "600", lineHeight: 30 }}>{task.Title}</Text>
              {/* <Pressable onPress={() => confirmDelete(task._id)}>
                <Ionicons name="trash-bin" size={24} color="#ffff" />
              </Pressable> */}
            </View>
            <Text style={{ color: "white", fontSize: 15, lineHeight: 20 }}>Description:</Text>
            <Text style={{ color: "white", fontSize: 12, fontWeight: "400", lineHeight: 17, marginBottom: 5 }}>{task.Descriptions}</Text>
            <Text style={{ color: "white", fontSize: 15, lineHeight: 20 }}>Start Date: {new Date(task.StartDate).toLocaleDateString()}</Text>
            <Text style={{ color: "white", fontSize: 15, lineHeight: 20 }}>Due Date: {new Date(task.EndDate).toLocaleDateString()}</Text>
            <Text style={{ color: "white", fontSize: 15, lineHeight: 20 }}>Completion Date: {new Date(task.completed_date).toLocaleDateString()}</Text>
          </View>
        ))
      )}

      <Text style={{ fontSize: 18, fontWeight: "600", color: "#0072c1", marginBottom: 10 }}>Completed Before Due Date</Text>
      {completedBeforeDue.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 10, marginBottom: 20 }}>No tasks completed before the due date.</Text>
      ) : (
        completedBeforeDue.map((task, index) => (
          <View key={index} style={{ backgroundColor: "#ffcc00", padding: 15, borderRadius: 15, marginBottom: 10 }}>
            <Text style={{ color: "white", fontSize: 20, fontWeight: "600" }}>{task.Title}</Text>
            <Text style={{ color: "white", fontSize: 15, lineHeight: 20 }}>Completion Date: {new Date(task.completed_date).toLocaleDateString()}</Text>
          </View>
        ))
      )}

      <Text style={{ fontSize: 18, fontWeight: "600", color: "#0072c1", marginBottom: 10 }}>Late Completion Tasks</Text>
      {lateCompletion.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 10, marginBottom: 20 }}>No late completion tasks available.</Text>
      ) : (
        lateCompletion.map((task, index) => (
          <View key={index} style={{ backgroundColor: "#ff3d00", padding: 15, borderRadius: 15, marginBottom: 10 }}>
            <Text style={{ color: "white", fontSize: 20, fontWeight: "600" }}>{task.Title}</Text>
            <Text style={{ color: "white", fontSize: 15, lineHeight: 20 }}>Completion Date: {new Date(task.completed_date).toLocaleDateString()}</Text>
          </View>
        ))
      )}

      {/* Date Picker Modal */}
      {/* <Modal visible={showModal} transparent={true} animationType="slide">
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <View style={{ width: 300, padding: 20, backgroundColor: "white", borderRadius: 10 }}>
            <Text style={{ fontSize: 18, marginBottom: 20 }}>Set Completion Date for {taskDetails?.Title}</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={{ fontSize: 16, color: "#0072c1", marginBottom: 20 }}>{completionDate ? new Date(completionDate).toLocaleDateString() : "Select Completion Date"}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={completionDate ? new Date(completionDate) : new Date()}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}
            <Pressable onPress={handleFinish} style={{ backgroundColor: "#00c1a1", padding: 10, borderRadius: 5 }}>
              <Text style={{ color: "white", textAlign: "center" }}>Finish Task</Text>
            </Pressable>
            <Pressable onPress={() => setShowModal(false)} style={{ backgroundColor: "#d9534f", padding: 10, borderRadius: 5, marginTop: 10 }}>
              <Text style={{ color: "white", textAlign: "center" }}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal> */}
    </ScrollView>
  );
}
