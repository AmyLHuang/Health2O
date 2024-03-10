import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { Pedometer } from "expo-sensors";
import Animated, { useSharedValue, useAnimatedProps, withTiming } from "react-native-reanimated";
import SVG, { Circle } from "react-native-svg";

const CircleProgress = Animated.createAnimatedComponent(Circle);
const radius = 35;
const circumference = radius * Math.PI * 2;


const stepGoal = 500; // STEPS GOAL


const ExerciseScreen = () => {
  const [stepCount, setStepCount] = useState(0);
  const [pastStepCount, setPastStepCount] = useState(0);


  const getSteps = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();

    if (isAvailable) {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setUTCHours(0, 0, 0, 0);
      endDate.setUTCHours(23, 59, 59, 999);

      const pastStep = await Pedometer.getStepCountAsync(startDate, endDate);
      
      return Pedometer.watchStepCount((result) => {
        setStepCount(result.steps);
        if (pastStep) {
          setPastStepCount(pastStep.steps);
        }
      });
    }
  };

  const strokeOffset = useSharedValue(circumference);
  const animatedCircleProps = useAnimatedProps(() => {
    return {
      stokeDashoffset: withTiming(strokeOffset.value, {duration: 2000}),
    };
  });

  useEffect(() => {
    const steps = getSteps();
    return () => steps;
  }, []);


  const percentWalked = circumference-(circumference*(stepCount + pastStepCount)/stepGoal) % circumference;
  const distanceWalked = (stepCount + pastStepCount) / 2000;


  return (
    <SafeAreaView style={styles.background}>
      <View>
        <Text style={styles.title}>Exercise</Text>
      </View>
      <View style={styles.recommendBox}>
        <Text style={styles.recommendTitle}>Recommendation</Text>
        <View style={styles.recommendTextBox}>
          <Text style={styles.recommendText}>You're very close to your goal! Try going on a light 10 minute jog around your neighborhood!</Text>
        </View>
      </View>
      <View>
        <SVG height="95%" width="100%" viewBox="0 0 100 100">
          <Circle
            cx="50%"
            r={radius}
            stroke="transparent"
            strokeWidth="5"
            fill="#93DCCA"
          />
          <CircleProgress
            animatedProps={animatedCircleProps}
            cx="50%"
            r={radius}
            stroke="#ED6A6A"
            strokeWidth="5"
            strokeDasharray={`${radius * Math.PI * 2}`}
            strokeDashoffset={percentWalked}
            strokeLinecap="round"
            fill="transparent"
          />
        </SVG>
        <Text style={styles.stepDisplay}>{stepCount + pastStepCount}</Text>
        <Text style={styles.stepGoal}>STEPS{"\n\n"}GOAL {stepGoal}</Text>
      </View>
      <View style={styles.distanceContainer}>
        <Text style={styles.distanceCounter}>Distance traveled{"\n"}{distanceWalked} miles</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#E4F8EB",
  },

  title: {
    fontSize: 36,
    marginLeft: 10,
  },

  recommendBox: {
    backgroundColor: "#93DCCA",
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
    backgroundColor: "#E4F8EB",
    borderRadius: 10,
    margin: 10,
  },

  recommendText: {
    fontSize: 15,
    margin: 5,
  },

  stepDisplay: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: 85,
    fontWeight: "bold",
    position: "absolute",
    marginTop: "22%",
    alignSelf: "center",
  },

  stepGoal: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: 35,
    fontWeight: "bold",
    position: "absolute",
    marginTop: "42%",
    alignSelf: "center",
  },

  distanceContainer: {
    backgroundColor: "#93DCCA",
    marginHorizontal: 20,
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 10,
    bottom:  220,
    padding: 15,
  },

  distanceCounter: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },

});


export default ExerciseScreen;
