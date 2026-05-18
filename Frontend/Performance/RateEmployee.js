import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";

const RateEmployee = ({ route, navigation }) => {
    const { employee } = route.params; // Get employee data from route params
    console.log();
    if (!employee) {
        Alert.alert("Error", "Employee ID is missing.");
        navigation.goBack();
        return null;
    }

    const [rating, setRating] = useState(employee.rating?.toString() || ""); // Pre-fill with existing rating if available
    const [loading, setLoading] = useState(false); // Loading state
    const API_URL = process.env.EXPO_PUBLIC_API_URL;

    const handleRatingSubmit = async () => {
        const numericRating = Number(rating);
        if (!rating || isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
            Alert.alert("Invalid Rating", "Please provide a rating between 1 and 5.");
            return;
        }
    
        setLoading(true);
    
        try {
            // Use PATCH method instead of POST
            const response = await axios.post(`${API_URL}/Employee/rate/${employee._id}`, { rating: numericRating });
            console.log('Response Data:', response.data);
            if (response.status === 200) {
                Alert.alert("Success", "Employee rating updated successfully.");
                navigation.goBack();
            }
        } catch (error) {
            console.error("Error submitting rating:", error);
            Alert.alert("Error", error.response?.data?.message || "There was an error updating the employee rating.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ padding: 20 }}>
            {/* Header */}
            <View style={{ marginBottom: 20, marginTop: 20, flexDirection: "row", alignItems: "center" }}>
                <Pressable onPress={() => navigation.goBack()} style={{ backgroundColor: "#3498db", padding: 5, borderRadius: 20 }}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </Pressable>
                <Text style={{ marginLeft: 0, fontSize: 22, fontWeight: "600", color: "#0072c1", flex: 1, textAlign: "center" }}>
                    PERFORMANCE
                </Text>
            </View>

            {/* Title */}
            <Text style={{ fontSize: 24, marginTop: 50, marginBottom: 20, fontWeight: "bold" }}>Rate Employee</Text>

            {/* Rating Input */}
            <TextInput
                value={rating}
                onChangeText={setRating}
                placeholder="Enter rating (1-5)"
                keyboardType="numeric"
                style={{
                    height: 40,
                    borderColor: "#0072c1",
                    borderWidth: 1,
                    borderRadius: 5,
                    padding: 10,
                    marginBottom: 20,
                    color: "#0072c1",
                }}
            />

            {/* Loading Indicator */}
            {loading && <ActivityIndicator size="large" color="#0072c1" style={{ marginBottom: 20 }} />}

            {/* Submit Button */}
            <TouchableOpacity
                onPress={handleRatingSubmit}
                style={{
                    backgroundColor: "#0072c1",
                    padding: 15,
                    borderRadius: 5,
                    alignItems: "center",
                }}
                disabled={loading} // Disable button while loading
            >
                <Text style={{ color: "white", fontSize: 16 }}>{loading ? "Submitting..." : "Submit Rating"}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RateEmployee;
