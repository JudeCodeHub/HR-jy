import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ChatScreen({ route }) {
  const data = route.params;
  const employeeId = data.employeeId;
  const HR_id = data.HR_Id;
  const [combinedMessages, setCombinedMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const responseEmployee = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/chat/${employeeId}`
      );
      const responseHR = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/chat/${HR_id}`);

      if (!responseEmployee.ok || !responseHR.ok) {
        throw new Error("Failed to fetch messages.");
      }

      const employeeMessages = await responseEmployee.json();
      const hrMessages = await responseHR.json();

      const allMessages = [
        ...employeeMessages.map((msg) => ({ ...msg, sender: "employee" })),
        ...hrMessages.map((msg) => ({ ...msg, sender: "HR" })),
      ].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

      setCombinedMessages(allMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      Alert.alert("Error", "Failed to fetch messages. Please try again later.");
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/chat/${employeeId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: newMessage,
            sender: "employee",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message.");
      }

      fetchMessages();
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      Alert.alert("Error", "Failed to send message. Please try again later.");
    }
  };

  const renderMessage = ({ item, index }) => {
    const isEmployee = item.sender === "employee";
    const currentMessageDate = new Date(item.timestamp).toDateString();
    const previousMessageDate =
      index > 0
        ? new Date(combinedMessages[index - 1].timestamp).toDateString()
        : null;

    const messageTime = new Date(item.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <>
        {currentMessageDate !== previousMessageDate && (
          <Text style={styles.dateLabel}>{currentMessageDate}</Text>
        )}
        <View
          style={[
            styles.messageContainer,
            isEmployee ? styles.employeeMessage : styles.hrMessage,
          ]}
        >
          <Text>{item.text}</Text>
          <Text style={styles.time}>{messageTime}</Text>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={combinedMessages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 15,
    maxWidth: "80%",
  },
  employeeMessage: {
    backgroundColor: "#8abcff",
    alignSelf: "flex-end",
  },
  hrMessage: {
    backgroundColor: "#cbb9fe",
    alignSelf: "flex-start",
  },
  dateLabel: {
    alignSelf: "center",
    marginVertical: 10,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 12,
    color: "gray",
  },
  time: {
    fontSize: 10,
    color: "gray",
    alignSelf: "flex-end",
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
