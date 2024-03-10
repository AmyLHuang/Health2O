import React from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";

let inBedTime = "10:30pm";
let wakeUpTime = "08:00pm";

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const currentDay = new Date().getDay();

let sleepHourLog = [5, 7, 6, 9, 10, 7];
let bedTimeLog = [8, 11, 8, 10, 9, 8];

const chartConfig = {
    backgroundGradientFrom: "#FEFFED",
    backgroundGradientTo: "#FEFFED",
    color: (opacity = 1) => "#FFC374",
    labelColor: (opacity = 1) => "black",
    barPercentage: 0.5,
    fillShadowGradientFrom: "#FFC374",
    fillShadowGradientFromOpacity: 1,
    fillShadowGradientTo: "#FFC374",
    fillShadowGradientToOpacity: 1,
    decimalPlaces: false,
};

const SleepScreen = () => {
  const bedTimeLogData = {
    labels: [dayNames[currentDay - 6], dayNames[currentDay - 5], dayNames[currentDay - 4], dayNames[currentDay - 3], dayNames[currentDay - 2], dayNames[currentDay - 1]],
    datasets: [
      {
        data: bedTimeLog,
      },
    ],
  };

  const sleepLogData = {
    labels: [dayNames[currentDay - 6], dayNames[currentDay - 5], dayNames[currentDay - 4], dayNames[currentDay - 3], dayNames[currentDay - 2], dayNames[currentDay - 1]],
    datasets: [
      {
        data: sleepHourLog,
      },
    ],
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
          <Text style={styles.sleepText}>In-Bed Time{"\n\n"}{inBedTime}</Text>
          <View style={{height: "66%", width: 1, backgroundColor: "#EDEBF1"}}></View>
          <Text style={styles.sleepText}>Wake Up Time{"\n\n"}{wakeUpTime}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Change sleep times</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Log Sleep</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.sleepChartTitle}>Bed Time</Text>
        <LineChart
          data={bedTimeLogData}
          width={400}
          height={300}
          chartConfig={chartConfig}
          segments={Math.max(...bedTimeLog) - Math.min(...bedTimeLog)}
          bezier
        />

        <Text style={styles.sleepChartTitle}>Sleep Hours</Text>
        <BarChart
          data={sleepLogData}
          width={400}
          height={300}
          chartConfig={chartConfig}
          segments={Math.max(...sleepHourLog) - Math.min(...sleepHourLog)}
        />
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

  sleepChartTitle: {
    fontSize: 30,
    fontStyle: "bold",
    margin: 10,
  }

});

export default SleepScreen;
