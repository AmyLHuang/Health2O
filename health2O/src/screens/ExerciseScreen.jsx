import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { Pedometer } from "expo-sensors";
import Animated, { useSharedValue, useAnimatedProps, withTiming } from "react-native-reanimated";
import SVG, { Circle } from "react-native-svg";
import useUserData from "../hooks/useUserData";
import { auth, firestore } from "../../FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const CircleProgress = Animated.createAnimatedComponent(Circle);
const radius = 35;
const circumference = radius * Math.PI * 2;

const ExerciseScreen = () => {
  const [stepCount, setStepCount] = useState(0);
  const [recString, setRecString] = useState("");
  const userData = useUserData();
  // let rec = "";

  let stepGoal = 8000;
  if (!isNaN(userData.dailyStepGoal)) {
    stepGoal = userData.dailyStepGoal;
  }

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
          setStepCount(result.steps + pastStep.steps);
        }
        updateUserDataStepCount();
      });
    }
  };

  const strokeOffset = useSharedValue(circumference);
  const animatedCircleProps = useAnimatedProps(() => {
    return {
      stokeDashoffset: withTiming(strokeOffset.value, { duration: 2000 }),
    };
  });

  useEffect(() => {
    const steps = getSteps();
    return () => steps;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRecString(recommendation());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const updateUserDataStepCount = async () => {
    try {
      // Update the value in the specified document
      await setDoc(doc(firestore, "Users", auth.currentUser.uid), { stepcount: stepCount }, { merge: true });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const circleFilled = circumference - (((circumference * stepCount) / stepGoal) % circumference);
  const percentWalked = (circumference - circleFilled) / circumference;

  let userHeight = 67;
  if (userData.height == undefined) {
    userHeight = userData.heightFeet * 12 + userData.heightInches;
  } else {
    userHeight = userData.height.ft * 12 + userData.height.in;
  }

  let stepLength = 0;
  if (userData.gender == "Male") {
    stepLength = userHeight * 0.415;
  } else {
    stepLength = userHeight * 0.413;
  }

  const distanceWalked = ((stepCount * stepLength) / 63360).toFixed(3);
  const distanceToWalk = (((stepGoal - stepCount) * stepLength) / 63360).toFixed(3);

  const recommendation = () => {
    let rec = "";
    const currentTime = new Date();
    if (stepCount > stepGoal) {
      rec = "Congratulations on hitting your step goal for today! You can continue but be sure to not overexert yourself!";
    } else if (currentTime.getHours() < 10 && currentTime.getHours() > 4) {
      rec = "Start the day off with a light walk around your neighborhood!";
    } else if (currentTime.getHours() > 21) {
      rec = "It may be a good idea to rest for the rest of the day. Don't try to overexert yourself!";
    } else {
      let randomnum = Math.floor(Math.random() * 10);
      if (randomnum < 7) {
        if (randomnum == 0) {
          rec = "Finding a friend to exercise with you is a great motivator for sticking to a routine.";
        } else if (randomnum == 1) {
          rec = "If you're having trouble finding motivation to move around, try making it fun for yourself! You can walk one day, bike the next, or even just listen to music while doing it!";
        } else if (randomnum == 2) {
          rec = "Try exercising at the same time everyday. Turning it into a routine can help motivate your mind and help your body prepare for the upcoming stress.";
        } else if (randomnum == 3) {
          rec = "Don't forget to reward yourself! It is always good to reinforce your healthy habits and give you that extra motivation boost!";
        } else if (randomnum == 4) {
          rec = "Be sure to always set realistic goals for yourself. Even if you think they're too easy, the motivation boost from achieving them goes a long way in keeping up the habit!";
        } else if (randomnum == 5) {
          rec = "Be sure to always give yourself rest! Downtime is needed to let your muscles heal and prevent injuries.";
        } else if (randomnum == 6) {
          rec = "Planning out a time to exercise in your day is a great motivator to get up and move!";
        }
      } else {
        if (distanceToWalk < 0.5) {
          rec = "You're very close to hitting your goal! Try going on a quick 10 minute walk around.";
        } else if (percentWalked > 0.8) {
          rec = "You've almost reached your goal! Keep up the great work!";
        } else if (percentWalked > 0.5) {
          rec = "You're over halfway done with your goal! Don't forget to stay hydrated!";
        } else if (currentTime.getHours() > 20) {
          rec = "If you find your goal too difficult to reach, try adjusting it! You can always increase your goal later!";
        } else {
          rec = "A little progress throughout the day adds up to bigger results. Try stretching your legs around the room for 5 minutes!";
        }
      }
    }
    return rec;
  };

  setInterval(recommendation, 3000);

  return (
    <SafeAreaView style={styles.background}>
      <View>
        <Text style={styles.title}>Exercise</Text>
      </View>
      <View style={styles.recommendBox}>
        <Text style={styles.recommendTitle}>Recommendation</Text>
        <View style={styles.recommendTextBox}>
          <Text style={styles.recommendText}>{recString}</Text>
        </View>
      </View>
      <View>
        <SVG height="95%" width="100%" viewBox="0 0 100 100">
          <Circle cx="50%" r={radius} stroke="transparent" strokeWidth="5" fill="#93DCCA" />
          <CircleProgress
            animatedProps={animatedCircleProps}
            cx="50%"
            r={radius}
            stroke="#ED6A6A"
            strokeWidth="5"
            strokeDasharray={`${radius * Math.PI * 2}`}
            strokeDashoffset={circleFilled}
            strokeLinecap="round"
            fill="transparent"
          />
        </SVG>
        <Text style={styles.stepDisplay}>{stepCount}</Text>
        <Text style={styles.stepGoal}>
          STEPS{"\n\n"}GOAL {stepGoal}
        </Text>
      </View>
      <View style={styles.distanceContainer}>
        <Text style={styles.distanceCounter}>
          Distance traveled{"\n"}
          {distanceWalked} miles
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#E4F8EB",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#EC268F",
    marginBottom: 20,
    textAlign: "center",
    marginTop: 18,
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
    bottom: 220,
    padding: 15,
  },

  distanceCounter: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ExerciseScreen;
