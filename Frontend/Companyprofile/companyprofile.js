import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import the FontAwesome icon pack

export default function Company({ route }) {
  const HR = route.params?.HR;

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        {/* Profile Picture - Local image using require */}
        <View style={styles.imageBox}>
          <Image
            source={require("../assets/avatar.jpg")} // Use the correct relative path
            style={styles.profileImage}
            resizeMode="cover"
          />
        </View>

        <Text style={styles.name}>{HR.Name}</Text>

        <View style={styles.detailBoxes}>
          <View style={styles.detailBox}>
            <View style={styles.fieldContainer}>
              <Icon
                name="id-card"
                size={20}
                color="#888888"
                style={styles.icon}
              />
              <Text style={styles.fieldLabel}>ID: {HR._id}</Text>
            </View>
          </View>
          <View style={styles.detailBox}>
            <View style={styles.fieldContainer}>
              <Icon
                name="building"
                size={20}
                color="#888888"
                style={styles.icon}
              />
              <Text style={styles.fieldLabel}>
                Company Name: {HR.companyname}
              </Text>
            </View>
          </View>
          <View style={styles.detailBox}>
            <View style={styles.fieldContainer}>
              <Icon
                name="envelope"
                size={20}
                color="#888888"
                style={styles.icon}
              />
              <Text style={styles.fieldLabel}>Email: {HR.email}</Text>
            </View>
          </View>
          <View style={styles.detailBox}>
            <View style={styles.fieldContainer}>
              <Icon
                name="map-marker"
                size={20}
                color="#888888"
                style={styles.icon}
              />
              <Text style={styles.fieldLabel}>Location: {HR.location}</Text>
            </View>
          </View>
        </View>
        <View style={styles.editProfile}>
          <Text style={styles.fieldLabel}>Edit Profile</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "pink",
  },
  profileCard: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 0,
  },
  imageBox: {
    width: "100%",
    height: 250,
    backgroundColor: "#507cb8",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 75,
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 150,
  },
  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginTop: 200,
  },
  detailBoxes: {
    width: "90%",
    marginTop: 50,
  },
  detailBox: {
    backgroundColor: "#507cb8",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  fieldContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 0,
    color: "#34609c",
    textAlign: "center",
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    marginLeft: 10,
  },
  icon: {
    color: "#ffffff",
    marginRight: 10,
  },
  editProfile: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#507cb8",
    padding: 15,
    borderRadius: 5,
    marginTop: 50,
    //elevation: 2,
  },
});
