import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Modal, Pressable } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTint, faWalking, faBed } from "@fortawesome/free-solid-svg-icons";
import useUserData from "../hooks/useUserData";
import ProgressCircle from "../components/ProgressCircle";

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const userData = useUserData();

  const sleepScore = Math.min(Math.floor((8 / userData.sleepGoal) * 100), 100);
  const hydrateScore = Math.min(Math.floor((userData.hydrationGoal / 3) * 100));
  const exerciseScore = Math.min(Math.floor((4000 / userData.dailyStepGoal) * 100));
  const score = ((sleepScore + hydrateScore + exerciseScore) / 3).toFixed(1);

  const getGoalStatus = () => {
    if (score == 100) {
      return "Perfect";
    } else if (score >= 80) {
      return "Excellent";
    } else if (score >= 60) {
      return "Good";
    } else if (score >= 40) {
      return "Adequate";
    } else {
      return "Time to get started";
    }
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>👋 Welcome {userData.username}!</Text>
      </SafeAreaView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={[styles.modalTextTitle]}>Score Ratings</Text>
          <Text style={styles.modalText}>100% = Perfect</Text>
          <Text style={styles.modalText}>80%-99% = Excellent</Text>
          <Text style={styles.modalText}>60%-79% = Good</Text>
          <Text style={styles.modalText}>40%-59% = Adaquate</Text>
          <Text style={styles.modalText}>0%-39% = Need to get started</Text>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.scoreBox}>
        <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 5 }}>Overall Score</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 40 }}>{score}</Text>
          <Text>out of 100</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text>Rating: {getGoalStatus()}</Text>
          <TouchableOpacity style={{ marginLeft: 3, marginTop: 2 }} onPress={() => setModalVisible(true)}>
            <FontAwesome5 name="info-circle" size={14} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { marginTop: 20 }]}>My Activities</Text>
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

      <Text style={styles.sectionTitle}>My Goals</Text>
      <View style={styles.boxContainer}>
        <Text style={[styles.goalText, { backgroundColor: "#F1ECEC" }]}>{userData.sleepGoal} Hours </Text>
        <Text style={[styles.goalText, { backgroundColor: "#DEEBFF" }]}>{userData.hydrationGoal} Liters</Text>
        <Text style={[styles.goalText, { backgroundColor: "#E4F8EB" }]}>{userData.dailyStepGoal} Steps </Text>
      </View>

      <Text style={styles.sectionTitle}>My Daily Progress</Text>
      <View style={styles.boxContainer}>
        <View>
          <ProgressCircle radius={45} percentage={sleepScore} color={"orange"} />
          <Text style={{ textAlign: "center" }}>Sleep</Text>
        </View>
        <View>
          <ProgressCircle radius={45} percentage={hydrateScore} color={"blue"} />
          <Text style={{ textAlign: "center" }}>Hydrate</Text>
        </View>
        <View>
          <ProgressCircle radius={45} percentage={exerciseScore} color={"green"} />
          <Text style={{ textAlign: "center" }}>Exercise</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    margin: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#EC268F",
    marginBottom: 10,
    textAlign: "center",
    marginTop: 18,
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
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 35,
  },
  scoreBox: {
    backgroundColor: "white",
    padding: 10,
    marginVertical: 20,
    marginHorizontal: 50,
    borderRadius: 25,
  },
  modalView: {
    justifyContent: "center",
    alignItems: "center",
    margin: 45,
    marginTop: 100,
    backgroundColor: "#f8f8ff",
    borderRadius: 25,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
  },
  modalText: {
    margin: 2,
  },
  modalTextTitle: {
    textAlign: "center",
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginBottom: 20,
  },
  closeButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#EC268F",
    marginTop: 25,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  goalText: {
    padding: 10,
    width: "31%",
    textAlign: "center",
  },
});

export default HomeScreen;
