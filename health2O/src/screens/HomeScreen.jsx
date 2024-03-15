import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Modal, Image } from "react-native";
import { FontAwesome5, FontAwesome6, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTint, faWalking, faBed } from "@fortawesome/free-solid-svg-icons";
import ProgressCircle from "../components/ProgressCircle";
import useUserData from "../hooks/useUserData";
import useWeatherData from "../hooks/useWeatherData";

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { profileData, sleepData, hydrateData, exerciseData } = useUserData();
  const weatherData = useWeatherData();

  const sleepScore = Math.min(Math.floor((8 / sleepData.goal) * 100), 100);
  const hydrateScore = Math.min(Math.floor((hydrateData?.currentAmount / hydrateData?.goal) * 100), 100);
  const exerciseScore = Math.min(Math.floor((exerciseData.stepcount / exerciseData.goal) * 100), 100);

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
      return "Can do better";
    }
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>👋 Welcome {profileData.username}!</Text>
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
          <Text style={styles.modalText}>0%-39% = Can do better</Text>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.scoreBox}>
        <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 5 }}>Overall Score</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 38 }}>{score}</Text>
          <Text>out of 100</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text>Rating: {getGoalStatus()}</Text>
          <TouchableOpacity style={{ marginLeft: 3, marginTop: 2 }} onPress={() => setModalVisible(true)}>
            <FontAwesome5 name="info-circle" size={14} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.boxContainer}>
        <TouchableOpacity style={[styles.box, { backgroundColor: "#F1ECEC" }]} onPress={() => navigation.navigate("Sleep")}>
          <FontAwesomeIcon icon={faBed} size={24} color="#091F44" />
          <Text style={styles.boxText}>Sleep</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.box, { backgroundColor: "#DEEBFF" }]} onPress={() => navigation.navigate("Hydration")}>
          <FontAwesome6 name="glass-water" size={24} color="black" />
          <Text style={styles.boxText}>Hydrate</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.box, { backgroundColor: "#E4F8EB" }]} onPress={() => navigation.navigate("Exercise")}>
          <FontAwesomeIcon icon={faWalking} size={24} color="#091F44" />
          <Text style={styles.boxText}>Exercise</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>My Daily Activity</Text>
      <View style={styles.boxContainer}>
        {/* Weather */}
        <View style={styles.dailyActivityBox}>
          <Text style={{ fontWeight: "bold" }}>Weather</Text>
          {weatherData ? (
            <>
              <Text>City of {weatherData.name}</Text>
              {weatherData.weather[0].icon && <Image style={styles.weatherIcon} source={{ uri: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png` }} />}
              <Text>Temp: {Math.ceil(weatherData.main.temp)}°F</Text>
              <Text>Description: {weatherData.weather[0].description}</Text>
            </>
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
        {/* Sleep */}
        <View style={styles.dailyActivityBox}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontWeight: "bold" }}>Sleep</Text>
            <MaterialCommunityIcons name="sleep" size={20} color="black" />
          </View>
          <View style={styles.progCircle}>
            <ProgressCircle radius={40} percentage={sleepScore} color={"orange"} />
          </View>
          <Text style={{ textAlign: "center", marginTop: 10 }}>8 / {sleepData.goal} Hours</Text>
        </View>
      </View>
      <View style={[styles.boxContainer]}>
        {/* Hydrate */}
        <View style={styles.dailyActivityBox}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontWeight: "bold" }}>Hydrate</Text>
            <FontAwesomeIcon icon={faTint} size={20} color="#091F44" />
          </View>
          <View style={styles.progCircle}>
            <ProgressCircle radius={40} percentage={hydrateScore} color={"blue"} />
          </View>
          <Text style={{ textAlign: "center", marginTop: 10 }}>
            {hydrateData?.currentAmount} / {hydrateData?.goal} Liters
          </Text>
        </View>
        {/* Exercise */}
        <View style={styles.dailyActivityBox}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontWeight: "bold" }}>Exercise</Text>
            <Ionicons name="footsteps" size={20} color="black" />
          </View>
          <View style={styles.progCircle}>
            <ProgressCircle radius={40} percentage={exerciseScore} color={"green"} />
          </View>
          <Text style={{ textAlign: "center", marginTop: 10 }}>
            {exerciseData.stepcount} / {exerciseData.goal} Steps
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#EC268F",
    textAlign: "center",
    marginTop: 18,
  },
  boxContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10,
  },
  box: {
    width: "31%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    shadowColor: "#17426B",
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 5,
  },
  progCircle: {
    alignItems: "center",
    marginTop: 10,
  },
  weatherIcon: {
    width: 60,
    height: 60,
    backgroundColor: "lightblue",
    borderRadius: 25,
    margin: 5,
    alignSelf: "center",
  },
  dailyActivityBox: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 12,
    padding: 18,
    width: "45%",
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
    marginLeft: 15,
    marginTop: 10,
  },
  scoreBox: {
    backgroundColor: "white",
    padding: 10,
    paddingLeft: 18,
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
});

export default HomeScreen;
