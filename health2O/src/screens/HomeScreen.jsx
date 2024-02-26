import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch, faTint, faWalking, faBed, faWater, faHeartbeat } from "@fortawesome/free-solid-svg-icons";
import useUserData from "../hooks/userApi";

const HomeScreen = ({ navigation }) => {
  const userData = useUserData();

  return (
    <SafeAreaView edges={["right", "left", "top"]}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.greeting}>👋 Hi {userData.username}!</Text>

          {/* <View style={styles.searchSection}>
            <TextInput placeholder="Search..." style={styles.searchInput} />
            <TouchableOpacity style={styles.searchButton}>
              <FontAwesomeIcon icon={faSearch} />
            </TouchableOpacity>
          </View> */}

          <View style={styles.boxContainer}>
            <TouchableOpacity style={[styles.box, { backgroundColor: "#F1ECEC" }]} onPress={() => navigation.navigate("Sleep")}>
              <FontAwesomeIcon icon={faBed} size={24} color="#091F44" />
              <Text style={styles.boxText}>Sleep</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.box, { backgroundColor: "#DEEBFF" }]} onPress={() => navigation.navigate("Hydration")}>
              <FontAwesomeIcon icon={faTint} size={24} color="#091F44" />
              <Text style={styles.boxText}>Hydrate</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.box, { backgroundColor: "#E4F8EB" }]} onPress={() => navigation.navigate("Exercise")}>
              <FontAwesomeIcon icon={faWalking} size={24} color="#091F44" />
              <Text style={styles.boxText}>Exercise</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.activityTitle}>My Activity</Text>
          <View style={styles.activitySection}>
            <View style={styles.activityRow}>
              <ActivityBox icon={faBed} label="Sleep" value="8 hours" />
            </View>
            <View style={styles.activityRow}>
              <ActivityBox icon={faTint} label="Hydrate" value="0.8 liters" />
            </View>
            <View style={styles.activityRow}>
              <ActivityBox icon={faWalking} label="Steps" value="600" />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const ActivityBox = ({ icon, label, value }) => (
  <View style={styles.activityBox}>
    <FontAwesomeIcon icon={icon} size={20} style={styles.activityIcon} />
    <Text style={styles.activityLabel}>{label}</Text>
    <Text style={styles.activityValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f2",
  },
  greeting: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#EC268F",
    marginBottom: 20,
    textAlign: "center",
  },
  searchSection: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  searchInput: {
    flex: 1,
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 10,
    borderRadius: 30,
    fontSize: 16,
  },
  searchButton: {
    alignSelf: "center",
    paddingHorizontal: 10,
  },
  boxContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 7,
  },
  box: {
    width: "31%",
    height: 100,
    backgroundColor: "#e7eaf6", // Soft blue
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    shadowColor: "#17426B",
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  boxText: {
    color: "#091F44",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 8,
    textAlign: "center",
  },
  activityTitle: {
    fontSize: 22,
    fontWeight: "bold",

    marginTop: "5%",
  },
  activitySection: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },

  activityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
  },

  activityBox: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: "#F7BFD8",
    borderRadius: 25,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },

  activityIcon: {
    marginBottom: 10,
    fontSize: 30,
    color: "#EC268F",
  },

  activityLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#091F44",
  },

  activityValue: {
    fontSize: 16,
    color: "#333",
  },
});

export default HomeScreen;
