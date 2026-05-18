import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Pressable, Text, TouchableOpacity, View } from "react-native";

export default function Performance({ route, navigation }) {
  const data = route.params;
  const employeeId = data._id;
  console.log(employeeId)

  const [tasks, setTasks] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [completedBeforeDue, setCompletedBeforeDue] = useState(0);
  const [lateCompletions, setLateCompletions] = useState(0);
  const [attendancePerformance, setAttendancePerformance] = useState(0);
  const [taskPerformance, setTaskPerformance] = useState(null);
  const [totalAttendanceDays, setTotalAttendanceDays] = useState(0);
  const [daysPresent, setDaysPresent] = useState(0);
  const [daysAbsent, setDaysAbsent] = useState(0);
  const [AttId, setAttId] = useState();
  const [Totalpresent1, setPresnt] = useState();
  

  const [performanceScore, setPerformanceScore] = useState(null);

  const formatDate = (date) => date.toISOString().split("T")[0];

  useEffect(() => {
    if (employeeId) {
      fetchTasks();
      fetchAttendance2();
    } 

    else {
      Alert.alert("Error", "Employee ID is missing.");
    }
  }, [employeeId]);


  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/tasks/${employeeId}`);
      // console.log("Fetched Tasks:", response.data);
      if (response.status === 200) {
        setTasks(response.data);
      } else {
        console.error("Error fetching tasks:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };


  const fetchAttendance2 = async () => {
    console.log(employeeId)
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/Attendance/${employeeId}`);
      if (response.ok) {
        const data = await response.json();
        setAttId(data[0]._id)
       // fetchAttendance(data[0]._id)
        return data;
      } else {
        console.error("Error:", response.json());
        return null;
      }
    } 
    catch (error) {
      console.error("Error fetching attendance data:", error);
      return null;
    }
  };



  const fetchAttendance = async (id,X,Y) => {
    console.log(id,X,Y)

    try {
      // // const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/Attendance_record`, { params: { AttendanceID: employeeId } ,});
      // const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/Attendance_record/workingdays/${id}`,);
      // console.log("Fetched Attendance:", response.data); // Log attendance data for debugging

            // Dates object
            const Dates = {
              startDate: X,
              endDate: Y
          };
  
          // Fetch the attendance data using async/await
          const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/Attendance_record/workingdays/${id}`, {
              params: 
                 Dates   
          });

      if (response.status === 200) {
        setAttendance(response.data);
        const data=response.data
        
        const A= data.Totalpresent

        setPresnt(A)

      } else {
        console.error("Error fetching attendance:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };




  const calculatePerformance = () => {
    const start = new Date(formatDate(startDate));
    const end = new Date(formatDate(endDate));
    
    fetchAttendance(AttId,start,end);

    const filteredTasks = tasks.filter((task) => {
      const taskEndDate = new Date(task.EndDate);
      return taskEndDate >= start && taskEndDate <= end;
    });

    const totalTasks = filteredTasks.length;
    const completedTaskCount = filteredTasks.filter((task) => task.completed).length;
    const completedBeforeDueCount = filteredTasks.filter(
      (task) => task.completed && new Date(task.completed_date) < new Date(task.EndDate)
    ).length;
    const lateCompletionCount = filteredTasks.filter(
      (task) => task.completed && new Date(task.completed_date) > new Date(task.EndDate)
    ).length;

    setTotalTasks(totalTasks);
    setCompletedTasks(completedTaskCount);
    setCompletedBeforeDue(completedBeforeDueCount);
    setLateCompletions(lateCompletionCount);

    const taskPerformance = totalTasks > 0 ? (completedBeforeDueCount / totalTasks) * 100 : 0;
    setTaskPerformance(taskPerformance);

    // const filteredAttendance = attendance.filter((attendance) => {
    //   const attendanceDate = new Date(record.Date);
    //   return attendanceDate >= start && attendanceDate <= end && record.status === "present";
    // });

    const presentDays = Totalpresent1;
    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    const absentDays = totalDays - presentDays;

    setDaysPresent(presentDays);
    setDaysAbsent(absentDays);
    setTotalAttendanceDays(totalDays);

    const attendancePerformance = totalDays > 0 ? (presentDays / totalDays) * 100 : 0;
    setAttendancePerformance(attendancePerformance);

    const overallPerformance = 0.7 * taskPerformance + 0.3 * attendancePerformance;
    setPerformanceScore(overallPerformance);
  };
  
  return (
    <View style={{ padding: 20 }}>
      {/* Header */}
      <View style={{ marginTop: 20, marginBottom: 30, flexDirection: "row", alignItems: "center" }}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{ backgroundColor: "#3498db", padding: 5, borderRadius: 20 }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <Text
          style={{
            marginLeft: -25,
            fontSize: 22,
            fontWeight: "600",
            color: "#0072c1",
            flex: 1,
            textAlign: "center",
          }}
        >
          PERFORMANCE
        </Text>
      </View>

      {/* Date Pickers */}
      <Text style={{ marginBottom: 10 }}>Select Start Date:</Text>
      <Pressable
        onPress={() => setShowStartDatePicker(true)}
        style={{ padding: 10, backgroundColor: "#0072c1", borderRadius: 5, marginBottom: 20 }}
      >
        <Text style={{ color: "white" }}>{startDate.toLocaleDateString()}</Text>
      </Pressable>
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowStartDatePicker(false);
            if (date) setStartDate(date);
          }}
        />
      )}

      <Text style={{ marginBottom: 10 }}>Select End Date:</Text>
      <Pressable
        onPress={() => setShowEndDatePicker(true)}
        style={{ padding: 10, backgroundColor: "#0072c1", borderRadius: 5, marginBottom: 20 }}
      >
        <Text style={{ color: "white" }}>{endDate.toLocaleDateString()}</Text>
      </Pressable>
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowEndDatePicker(false);
            if (date) setEndDate(date);
          }}
        />
      )}

      {/* Calculate Button */}
      <TouchableOpacity
        onPress={calculatePerformance}
        style={{
          alignSelf: "center",
          backgroundColor: "#0072c1",
          width: 250,
          padding: 15,
          borderRadius: 50,
          marginTop: 20,
          marginBottom: 50,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Calculate Performance</Text>
      </TouchableOpacity>

      {/* Performance Details */}
      {performanceScore !== null && (
        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Overall Performance: {performanceScore.toFixed(2)}%
          </Text>
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Task Performance: {taskPerformance.toFixed(2)}%</Text>
            <Text>Total Tasks Assigned: {totalTasks}</Text>
            <Text>Completed Tasks: {completedTasks}</Text>
            <Text>Completed Before Due Date: {completedBeforeDue}</Text>
            <Text>Late Completions: {lateCompletions}</Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Attendance Performance: {attendancePerformance.toFixed(2)}%</Text>
            <Text>Total Attendance Days: {totalAttendanceDays}</Text>
            <Text>Days Present: {daysPresent}</Text>
            <Text>Days Absent: {daysAbsent}</Text>
          </View>
        </View>
      )}

      {/* Rate Employee Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate("RateEmployee", { employee: data })}
        style={{
          alignSelf: "center",
          backgroundColor: "#0da47d",
          width: 250,
          padding: 15,
          borderRadius: 50,
          marginTop: 30,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Rate Employee</Text>
      </TouchableOpacity>
    </View>
  );
}
