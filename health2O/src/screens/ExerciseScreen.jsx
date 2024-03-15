import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { Pedometer } from "expo-sensors";
import Animated, { useSharedValue, useAnimatedProps, withTiming } from "react-native-reanimated";
import SVG, { Circle } from "react-native-svg";
import useUserData from "../hooks/useUserData";
import { auth, firestore } from "../../FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import RecommendationBox from "../components/RecommendationBox";

const CircleProgress = Animated.createAnimatedComponent(Circle);
const radius = 35;
const circumference = radius * Math.PI * 2;

const ExerciseScreen = () => {
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [pastStepCount, setPastStepCount] = useState(0);
  const [recString, setRecString] = useState("");
  const { profileData, exerciseData } = useUserData();
  const [stepCount, setStepCount] = useState(exerciseData.stepcount);

  const stepGoal = exerciseData.goal;

  // get total number of steps taken today
  const getSteps = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();

    if (isAvailable) {
      var currentDate = new Date();
      var beginningOfDay = new Date(currentDate);
      beginningOfDay.setHours(0, 0, 0, 0);

      const stepsToday = await Pedometer.getStepCountAsync(beginningOfDay, currentDate);
      if (stepsToday) {
        setPastStepCount(stepsToday.steps);
        if (currentStepCount == 0) {
          updateExerciseDataStepCount(0);
        }
      }

      return Pedometer.watchStepCount((result) => {
        setCurrentStepCount(result.steps);
        updateExerciseDataStepCount(result.steps);
      });
    }
  };

  // update firestore data for stepcount
  const updateExerciseDataStepCount = async (count) => {
    setStepCount(count + pastStepCount);
    if (pastStepCount > 0) {
      try {
        await setDoc(doc(firestore, "Exercise", auth.currentUser.email), { stepcount: count + pastStepCount }, { merge: true });
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    }
  };

  useEffect(() => {
    getSteps();
    return () => setCurrentStepCount(0);
  }, [currentStepCount, stepCount]);

  const strokeOffset = useSharedValue(circumference);
  const animatedCircleProps = useAnimatedProps(() => {
    return {
      stokeDashoffset: withTiming(strokeOffset.value, { duration: 2000 }),
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRecString(recommendation());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const circleFilled = circumference - (((circumference * stepCount) / stepGoal) % circumference);
  const percentWalked = (circumference - circleFilled) / circumference;

  let userHeight = 67;
  if (profileData.height == undefined) {
    userHeight = profileData.heightFeet * 12 + profileData.heightInches;
  } else {
    userHeight = profileData.height.ft * 12 + profileData.height.in;
  }

  let stepLength = 0;
  if (profileData.gender == "Male") {
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
      <View style={styles.header}>
        <Text style={styles.title}>Exercise</Text>
      </View>
      <RecommendationBox color="#E8EFE7">{recString}</RecommendationBox>

      <View style={styles.progressContainer}>
        <SVG height="200" width="200" viewBox="0 0 100 100">
          <Circle cx="50" cy="50" r={radius} stroke="#D3D3D3" strokeWidth="5" fill="transparent" />
          <CircleProgress
            animatedProps={animatedCircleProps}
            cx="50"
            cy="50"
            r={radius}
            stroke="#4CAF50"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={circleFilled}
            strokeLinecap="round"
            fill="transparent"
          />
        </SVG>
        <View style={styles.textContainer}>
          <Text style={styles.stepInfo}>{stepCount}</Text>
          <Text style={styles.stepText}>Steps</Text>
          <Text style={styles.stepGoalText}>Goal: {stepGoal}</Text>
        </View>
      </View>

      <View style={styles.distanceContainer}>
        <Text style={styles.distanceTitle}>Progress</Text>
        <Text style={styles.distanceCounter}>{distanceWalked} miles walked</Text>
        <Text style={styles.remainingDistance}>{distanceToWalk} miles to goal</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  progressContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    position: "absolute",
    alignItems: "center",
  },
  stepInfo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  stepText: {
    fontSize: 22,
    marginTop: -6,
    marginBottom: 8,
  },
  stepGoalText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  distanceContainer: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 15,
    margin: 20,
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  distanceTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  distanceCounter: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4CAF50",
    textAlign: "center",
    marginTop: 10,
  },
  remainingDistance: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginTop: 5,
  },
});

export default ExerciseScreen;
