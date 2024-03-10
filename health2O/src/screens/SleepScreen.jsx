import React, {useState} from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';


let sleepHours = 8; // User sleeps for 8 hours


const SleepScreen = () => {
  const [wakeTime, setWakeTime] = useState(new Date());

  let bedTime = new Date(wakeTime);
  bedTime.setHours(wakeTime.getHours() - sleepHours);

  let bedTimeString = bedTime.toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
  let wakeTimeString = wakeTime.toLocaleTimeString().replace(/(.*)\D\d+/, '$1');

  const onChange = (event, selectedTime) => {
    setWakeTime(selectedTime);
  };

  return (
    
    <SafeAreaView style={styles.background}>
      <ScrollView>
        <View>
          <Text style={styles.title}>Sleep</Text>
        </View>
        <View style={styles.recommendBox}>
          <Text style={styles.recommendTitle}>Recommendation</Text>
          <View style={styles.recommendTextBox}>
            <Text style={styles.recommendText}>You should sleep at 10 pm if you are planning to wake up at 6 am!</Text>
          </View>
        </View>
          
        <View style={styles.sleepTimeContainer}>
          <Text style={styles.sleepText}>In-Bed Time{"\n\n"}{bedTimeString}</Text>
          <View style={{height: "66%", width: 1, backgroundColor: "#EDEBF1"}}></View>
          <Text style={styles.sleepText}>Wake Up Time{"\n\n"}{wakeTimeString}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Set preferred wake time</Text>
          </View>

          <DateTimePicker
            mode={"time"}
            value={wakeTime}
            is24Hour={true}
            onChange={onChange}
          />
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
