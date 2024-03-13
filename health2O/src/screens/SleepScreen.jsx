import React, {useState} from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import useUserData from "../hooks/useUserData";


const SleepScreen = () => {
  const userData = useUserData();
  const [wakeTime, setWakeTime] = useState(new Date(0, 0, 0, 7, 0));
  const [showTimePicker, setShowTimePicker] = useState(false);
  
  let sleepHours = userData.sleepGoal;
  let rec = "";

  const bedTime = new Date(wakeTime);
  bedTime.setHours(wakeTime.getHours() - sleepHours, wakeTime.getMinutes());

  let bedTimeString = bedTime.toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
  let wakeTimeString = wakeTime.toLocaleTimeString().replace(/(.*)\D\d+/, '$1');

  const onChange = (event, selectedTime) => {
    setWakeTime(selectedTime);
    
  };
  
  const recommendation = () => {
    if (showTimePicker == true) {
      rec = "Be careful! Changing your sleep schedule too often can result in lower sleep quality and higher stress!";
    }
    else if (userData.sleepGoal < 7) {
      rec = "Sleeping less than 7 hours a day can lead to many health issues and lack of productivity throughout the day.";
    }
    else if (bedTime.getHours() < 18 && bedTime.getHours() > 6) {
      rec = "If you're planning on sleeping early in the day, darkening your room can help immensely in falling asleep and improving the quality of your sleep!";
    }
    else if (userData.stepcount < userData.dailyStepGoal) {
      if (bedTime.getHours() - (new Date().getHours()) > 4) {
        rec = "Regular physical activity helps aiding in sleep quality and duration!";
      }
      else {
        rec = "Try avoiding physical activity too close to bedtime as this can energize your body and delay your transition to sleep.";
      }
    }
    else {
      let randomnum = Math.floor(Math.random() * 5);
      if (randomnum == 0) {
        rec = "If you take naps during the day, try limiting them to <20 minutes a day and be careful not to nap too close to bedtime!";
      }
      else if (randomnum == 1) {
        rec = "Exposure to electronic screens before bedtime upsets your body's abilty to fall asleep. Try limiting screen time to an hour before your bedtime.";
      }
      else if (randomnum == 2) {
        if (userData.age > 20) {
          rec = "Drinking alcohol close to bedtime can lead to disruptions to your sleep and decrease sleep quality. Try limiting alcohol consumption to 4 hours before bedtime!";
        }
        else {
          rec = "If you're having trouble falling asleep, try limiting your bed to sleeping times only. Try to avoid doing any other tasks such as reading, eating, or listening to music."
        }
      }
      else if (randomnum == 3) {
        rec = "Be sure to stick to a sleeping routine to help condition your body into preparing itself for rest!";
      }
      else {
        rec = "Practicing gentle stretches before bed can help your body relax itself for sleep.";
      }
    }
    return rec;
  }

  return (
    
    <SafeAreaView style={styles.background}>
      <ScrollView>
        <View>
          <Text style={styles.title}>Sleep</Text>
        </View>
        <View style={styles.recommendBox}>
          <Text style={styles.recommendTitle}>Recommendation</Text>
          <View style={styles.recommendTextBox}>
            <Text style={styles.recommendText}>{recommendation()}</Text>
          </View>
        </View>
          
        <View style={styles.sleepTimeContainer}>
          <Text style={styles.sleepText}>BedTime{"\n\n"}{bedTimeString}</Text>
          <View style={{height: "66%", width: 1, backgroundColor: "#EDEBF1"}}></View>
          <Text style={styles.sleepText}>Wake Up Time{"\n\n"}{wakeTimeString}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => setShowTimePicker(!showTimePicker)}>
            <Text style={styles.buttonText}>Set preferred wake time</Text>
          </TouchableOpacity>
          {
            showTimePicker && (
              <DateTimePicker
              mode={"time"}
              value={wakeTime}
              onChange={onChange}
            />
            )
          }

        </View>

      </ScrollView>
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#FEFFED",
    flex: 1,
  },

  title: {
    fontSize: 36,
    marginLeft: 10,
  },

  recommendBox: {
    backgroundColor: "#F3F6C8",
    justifyContent: "center",
    borderRadius: 10,
    margin: 10,
    marginHorizontal: 30,
    borderColor: "FFFFFF",
    borderWidth: 1,
  },

  recommendTitle: {
    fontSize: 20,
    margin: 10,
  },

  recommendTextBox: {
    backgroundColor: "#FEFFED",
    borderRadius: 10,
    margin: 10,
  },

  recommendText: {
    fontSize: 15,
    margin: 5,
  },

  sleepTimeContainer: {
    backgroundColor: "#BBA904",
    borderRadius: 10,
    flexDirection: "row",
    marginHorizontal: 50,
    marginTop: 5,
    marginBottom: 15,
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  sleepText: {
    fontSize: 20,
    margin: 10,
    color: "#EFEBF1",
    textAlign: "center",
  },

  buttonContainer: {
    justifyContent: "space-around",
    flexDirection: "row",
    marginHorizontal: 40,
  },

  button: {
    backgroundColor: "#FFC374",
    borderRadius: 10,
    justifyContent: "center",
  },

  buttonText: {
    fontSize: 20,
    textAlign: "center",
    margin: 7,
  },
});

export default SleepScreen;
