import React, { Component, useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, Animated, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback, SafeAreaView } from "react-native";
import { auth, firestore } from "../../FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { Overlay } from "@rneui/base";
import useUserData from "../hooks/useUserData";
import { BarChart } from "react-native-chart-kit";
import RecommendationBox from "../components/RecommendationBox";

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const day = daysOfWeek[new Date().getDay()];
const chartConfig = {
  backgroundGradientFrom: "#CBE9FF",
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: "#A5DEFF",
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

class WaterBottle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      waterLevel: new Animated.Value(0),
      currentAmount: 0,
    };
  }

  fillBottle = () => {
    const waterLevel = this.state.waterLevel;
    if (waterLevel._value < 1.0 && this.props.target) {
      Animated.timing(waterLevel, {
        toValue: waterLevel._value + 0.125,
        duration: 500,
        useNativeDriver: false,
      }).start(() => {
        this.setState({ currentAmount: Math.round(waterLevel._value * this.props.target) });
        this.updateHydrationData();
      });
    }
  };

  updateHydrationData = async () => {
    const waterLevel = this.state.waterLevel;
    await setDoc(doc(firestore, "Hydrate", auth.currentUser.email), { currentAmount: Math.round(waterLevel._value * this.props.target) }, { merge: true });
    if (this.state.waterLevel._value >= 1) {
      await setDoc(doc(firestore, "Hydrate", auth.currentUser.email), { hydration: { [day]: { date: Math.floor(Date.now() / 1000), amount: this.props.target } } }, { merge: true });
    }
  };

  targetReached = () => {
    if (this.state.waterLevel._value >= 1) {
      return "Congrats, you have reached today's target!";
    }
  };

  render() {
    const waterLevel = this.state.waterLevel.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "100%"],
    });

    const { currentAmount } = this.state;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.fillBottle}>
          <View style={styles.bottle}>
            <Animated.View style={[styles.water, { height: waterLevel }]} />
            <Text style={styles.currentAmountText}>
              {currentAmount}/{this.props.target || 3} Liters
            </Text>
            <Text style={[styles.currentAmountText, { top: "10%", color: "white" }]}>{this.targetReached()}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const HydrationScreen = () => {
  const { profileData, hydrateData, exerciseData } = useUserData();
  const [amount, setAmount] = useState(hydrateData.goal);
  const [selectedUnit, setSelectedUnit] = useState("Liters");
  const animated = new Animated.Value(1);

  const updateHydrationGoalAmount = async (amount) => {
    setAmount(amount);
    await setDoc(doc(firestore, "Hydrate", auth.currentUser.email), { goal: amount }, { merge: true });
  };

  const formatData = () => {
    if (hydrateData.hydration == undefined) {
      return <Text>Loading...</Text>;
    }
    const hydrationMap = hydrateData.hydration;
    const days = Array.from(Object.keys(hydrationMap)).sort((a, b) => daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b));
    const amounts = days.map((day) => hydrationMap[day].amount);
    const data = {
      labels: days,
      datasets: [
        {
          data: amounts,
        },
      ],
    };
    return <BarChart data={data} width={280} height={480} chartConfig={chartConfig} verticalLabelRotation={90} />;
  };

  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const fadeIn = () => {
    Animated.timing(animated, {
      toValue: 0.4,
      duration: 100,
      useNativeDriver: true,
    }).start();
    toggleOverlay();
  };
  const fadeOut = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const recommendation = () => {
    if (profileData.height == undefined) {
      return "Drinking water first thing in the morning can help get your metabolism running and give you an energizing effect. - Dr. Luckey";
    }
    const height = profileData.height.ft * 12 + profileData.height.in;
    const activityLevel = exerciseData.goal / 3000;
    let weight = 0;
    if (profileData.gender == "female") {
      weight = 100 + 5 * (height - 60);
    } else {
      weight = 106 + 6 * (height - 60);
    }
    const waterIntakeOunces = (weight * 0.5 + activityLevel * 12) | 0;
    const waterIntakeLiters = (waterIntakeOunces / 33.814) | 0;
    return "Based on your profile, your recommended water intake for today is " + waterIntakeLiters + " Liters.";
  };

  return (
    <ScrollView style={styles.screen}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          <SafeAreaView>
            <Text style={styles.title}>Hydration</Text>
          </SafeAreaView>
          <RecommendationBox color="#CCE0E9">{recommendation()}</RecommendationBox>

          <View style={{ flex: 1.2, flexDirection: "row" }}>
            <View style={styles.target}>
              <Text style={styles.subtitle}>Target</Text>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.targetbg}>
                  <TextInput
                    style={styles.targettext}
                    keyboardType="numeric"
                    placeholder={String(hydrateData.goal)}
                    value={amount}
                    onChangeText={(amount) => updateHydrationGoalAmount(amount)}
                    onEndEditing={() => Keyboard.dismiss()}
                  />
                </View>
                <Text style={{ paddingRight: 10, paddingTop: 20 }}>Liters</Text>
              </View>
            </View>

            <View style={styles.log}>
              <Pressable onPressIn={fadeIn} onPressOut={fadeOut}>
                <Animated.View style={{ opacity: animated }}>
                  <Text style={[styles.subtitle]}>Hydration Log</Text>
                </Animated.View>
              </Pressable>
              <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{ backgroundColor: "white", width: 300, height: 500 }}>
                <Text>{formatData()}</Text>
              </Overlay>
            </View>
          </View>

          <View style={styles.progressBar}>
            <WaterBottle target={amount} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default HydrationScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },

  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#324A60",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },

  pfp: {
    aspectRatio: 6,
    resizeMode: "contain",
    marginLeft: 40,
  },

  rec: {
    flex: 1.5,
    backgroundColor: "#CCE0E9",
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    borderColor: "black",
    borderWidth: 1,
  },

  subtitle: {
    fontSize: 15,
    margin: 3,
    marginLeft: 10,
    marginTop: 10,
  },

  recbg: {
    backgroundColor: "#CBE9FF",
    borderRadius: 10,
    margin: 8,
  },

  rectext: {
    padding: 5,
    fontSize: 13,
  },

  target: {
    flex: 1,
    backgroundColor: "#CCE0E9",
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 10,
  },

  targetbg: {
    backgroundColor: "white",
    borderRadius: 10,
    margin: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  targettext: {
    fontSize: 13,
    padding: 10,
  },

  log: {
    flex: 1,
    backgroundColor: "#CCE0E9",
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  progressBar: {
    flex: 6,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  bottle: {
    width: 150,
    height: 300,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "transparent",
    borderRadius: 20,
    overflow: "hidden",
  },

  water: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "blue",
  },

  currentAmountText: {
    position: "absolute",
    bottom: "50%",
    alignSelf: "center",
    color: "black",
    fontWeight: "bold",
  },
});
