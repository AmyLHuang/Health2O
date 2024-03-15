import React, { useState } from "react";
import { View, Text, SafeAreaView, Button, StyleSheet, TextInput, Switch, ScrollView, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import useUserData from "../hooks/useUserData";
import RecommendationBox from "../components/RecommendationBox";
import { auth, firestore } from "../../FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const SleepScreen = () => {
  const { profileData, sleepData, exerciseData } = useUserData();
  const [wakeTime, setWakeTime] = useState(new Date(0, 0, 0, 7, 0));
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const [inputValue, setInputValue] = useState("");

  let sleepHours = sleepData.goal;
  let rec = "";

  const bedTime = new Date(wakeTime);
  bedTime.setHours(wakeTime.getHours() - sleepHours, wakeTime.getMinutes());

  let bedTimeString = bedTime.toLocaleTimeString().replace(/(.*)\D\d+/, "$1");
  let wakeTimeString = wakeTime.toLocaleTimeString().replace(/(.*)\D\d+/, "$1");

  const onChange = (event, selectedTime) => {
    setWakeTime(selectedTime);
  };

  const handleSubmit = async () => {
    if (inputValue.trim() === "") return;
    try {
      await setDoc(doc(firestore, "Sleep", auth.currentUser.email), { prevNight: inputValue }, { merge: true });
      setInputValue("");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleToggleChange = async (value) => {
    setIsSwitchOn(value);
    if (value) {
      try {
        await setDoc(doc(firestore, "Sleep", auth.currentUser.email), { prevNight: sleepHours }, { merge: true });
        setInputValue("");
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    }
  };

  const recommendation = () => {
    if (showTimePicker == true) {
      rec = "Be careful! Changing your sleep schedule too often can result in lower sleep quality and higher stress!";
    } else if (sleepHours < 7) {
      rec = "Sleeping less than 7 hours a day can lead to many health issues and lack of productivity throughout the day.";
    } else if (bedTime.getHours() < 18 && bedTime.getHours() > 6) {
      rec = "If you're planning on sleeping early in the day, darkening your room can help immensely in falling asleep and improving the quality of your sleep!";
    } else if (exerciseData.stepcount < exerciseData.goal) {
      if (bedTime.getHours() - new Date().getHours() > 4) {
        rec = "Regular physical activity helps aiding in sleep quality and duration!";
      } else {
        rec = "Try avoiding physical activity too close to bedtime as this can energize your body and delay your transition to sleep.";
      }
    } else {
      let randomnum = Math.floor(Math.random() * 5);
      if (randomnum == 0) {
        rec = "If you take naps during the day, try limiting them to <20 minutes a day and be careful not to nap too close to bedtime!";
      } else if (randomnum == 1) {
        rec = "Exposure to electronic screens before bedtime upsets your body's abilty to fall asleep. Try limiting screen time to an hour before your bedtime.";
      } else if (randomnum == 2) {
        if (profileData.age > 20) {
          rec = "Drinking alcohol close to bedtime can lead to disruptions to your sleep and decrease sleep quality. Try limiting alcohol consumption to 4 hours before bedtime!";
        } else {
          rec = "If you're having trouble falling asleep, try limiting your bed to sleeping times only. Try to avoid doing any other tasks such as reading, eating, or listening to music.";
        }
      } else if (randomnum == 3) {
        rec = "Be sure to stick to a sleeping routine to help condition your body into preparing itself for rest!";
      } else {
        rec = "Practicing gentle stretches before bed can help your body relax itself for sleep.";
      }
    }
    return rec;
  };

  return (
    <SafeAreaView style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Sleep Tracker</Text>

        <RecommendationBox color="#FFF7E0">{recommendation()}</RecommendationBox>
        <View style={styles.timeContainer}>
          <View style={styles.timeBox}>
            <Text style={styles.timeLabel}>Bedtime</Text>
            <Text style={styles.time}>{bedTimeString}</Text>
          </View>
          <View style={styles.separator}></View>
          <View style={styles.timeBox}>
            <Text style={styles.timeLabel}>Wake Up Time</Text>
            <Text style={styles.time}>{wakeTimeString}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => setShowTimePicker(!showTimePicker)}>
          <Text style={styles.buttonText}>Set Wake Time</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <View style={styles.centeredPicker}>
            <DateTimePicker mode={"time"} value={wakeTime} onChange={onChange} />
          </View>
        )}

        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Met my goal last night</Text>
            <Switch value={isSwitchOn} thumbColor={isSwitchOn ? "#FFB347" : "gray"} trackColor={{ false: "gray", true: "#FFEFCC" }} onValueChange={handleToggleChange} />
          </View>
          <View style={{ flexDirection: "row" }}>
            {!isSwitchOn && (
              <>
                <TextInput style={styles.input} keyboardType="numeric" placeholder="Hrs slept" value={inputValue} onChangeText={setInputValue} />
                <Button title="Submit" onPress={handleSubmit} />
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#F0F4F8",
    flex: 1,
  },
  scrollView: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#324A60",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: "#FFEFCC",
    borderRadius: 12,
    paddingVertical: 20,
  },
  timeBox: {
    alignItems: "center",
  },
  timeLabel: {
    fontSize: 18,
    color: "#324A60",
    marginBottom: 5,
  },
  time: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#324A60",
  },
  separator: {
    height: "80%",
    width: 1,
    backgroundColor: "#CBD5E1",
  },
  button: {
    backgroundColor: "#FFB347",
    borderRadius: 20,
    justifyContent: "center",
    marginHorizontal: 50,
    marginTop: 30,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 18,
    color: "#FFFFFF",
    textAlign: "center",
  },
  centeredPicker: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    padding: 20,
    marginTop: "40%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    marginRight: 10,
  },
  input: {
    width: "25%",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 25,
    padding: 10,
  },
});

export default SleepScreen;
