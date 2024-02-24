import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { Pedometer } from "expo-sensors";
import Animated, { useSharedValue, useAnimatedProps, withTiming } from "react-native-reanimated";
import SVG, { Circle } from "react-native-svg";

const ExerciseScreen = () => {
  const [stepCount, setStepCount] = useState(0);
  const [pastStepCount, setPastStepCount] = useState(0);

  const CircleProgress = Animated.createAnimatedComponent(Circle);
  const radius = 45;
  const circumference = radius * Math.PI * 2;

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
      strokeDashoffset: withTiming(strokeOffset.value, { duration: 2000 }),
    };
  });
  useEffect(() => {
    strokeOffset.value = 0;
  }, []);

  useEffect(() => {
    const subscription = getSteps();
    return () => subscription && subscription.remove();
  }, []);

  return (
    <View>
      <SafeAreaView>
        <Text>Exercise Screen</Text>
      </SafeAreaView>
      <View>
        <Text>Steps</Text>
        <Text>{stepCount + pastStepCount}</Text>
        <Text>Distance Traveled</Text>
        <Text>{(stepCount + pastStepCount) / 2000} MI</Text>
      </View>

      <SVG>
        <CircleProgress animatedProps={animatedCircleProps} />
      </SVG>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     padding: 12,
//   }
// });

export default ExerciseScreen;
