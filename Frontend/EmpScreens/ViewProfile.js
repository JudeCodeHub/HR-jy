import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ViewEmployee({ route }) {
    const Employee = route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>

            <View style={{ marginBottom: 20, marginTop: 20, flexDirection: "row", alignItems: "center" }}>
                <Pressable onPress={() => navigation.goBack()} style={{ backgroundColor: "#009bc1", padding: 5, borderRadius: 20 }}>
                <Ionicons name="arrow-back" size={24} color="white" />
                </Pressable>
                <Text style={{ fontSize: 22, fontWeight: "600", color: "#0072c1", flex: 1, textAlign: "center", marginBottom:20 }}>EMPLOYEE PROFILE</Text>
            </View>
            
            {/* Profile Image */}
            <View style={styles.profileImageContainer}>
                <Image
                    source={{ uri: Employee.image || "https://via.placeholder.com/150" }} // Placeholder if no image provided
                    style={styles.profileImage}
                />
            </View>
            {/* <Avatar.Image
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
              /> */}

            {/* Employee Name and Job Title */}
            <Text style={styles.name}>{Employee.Name}</Text>
            <Text style={styles.job}>{Employee.Job || "No Job Title Provided"}</Text>

            {/* Employee Details Section */}
            <View style={styles.infoSection}>
                {/* Email */}
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Email:</Text>
                    <Text style={styles.infoValue}>{Employee.email || "Not Provided"}</Text>
                </View>

                {/* Mobile */}
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Mobile:</Text>
                    <Text style={styles.infoValue}>{Employee.mobile || "Not Provided"}</Text>
                </View>

                {/* Gender */}
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Gender:</Text>
                    <Text style={styles.infoValue}>{Employee.gender || "Not Provided"}</Text>
                </View>

                {/* Rating */}
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Rating:</Text>
                    <Text style={styles.infoValue}>{Employee.rating !== null ? Employee.rating : "Not Rated"}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    profileImageContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: "#0072c1",
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        color: "#333",
        marginBottom: 5,
    },
    job: {
        fontSize: 18,
        textAlign: "center",
        color: "#0072c1",
        marginBottom: 20,
    },
    infoSection: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    infoLabel: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#555",
    },
    infoValue: {
        fontSize: 16,
        color: "#333",
    },
});
