import React, { Component, useState } from "react";
import { View, Text, Image, StyleSheet, Pressable, ScrollView, Animated, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback, SafeAreaView } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { auth, firestore } from "../../FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { Overlay } from "@rneui/base";
import useUserData from "../hooks/useUserData";
import { BarChart } from "react-native-chart-kit";

const profileImage = require("../../assets/health20.png");
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const day = daysOfWeek[new Date().getDay()];
const chartConfig = {
  backgroundGradientFrom: "#CBE9FF",
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: "#A5DEFF",
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

class WaterBottle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      waterLevel: new Animated.Value(0), // current water level
      currentAmount: 0
    };
  }

  fillBottle = () => {
    const waterLevel = this.state.waterLevel;
    if (waterLevel._value < 1.0 && this.props.target && this.props.unit) {
      Animated.timing(waterLevel, {
        toValue: waterLevel._value + 0.125, // Fill water
        duration: 500,
        useNativeDriver: false,
      }).start(() => {
        this.setState({ currentAmount: Math.round(waterLevel._value * this.props.target) });
        this.updateHydrationData();
      });
    }
  };

  updateHydrationData = async () => {
    if (this.state.waterLevel._value >= 1) {
      await setDoc(doc(firestore, "Users", auth.currentUser.uid), 
      { hydration: {[day]: {date: Math.floor(Date.now() / 1000), amount: this.props.target, unit: this.props.unit}} }, 
      { merge: true });
    }
  } 

  targetReached = () => {
    if (this.state.waterLevel._value >= 1) {
      return "Congrats, you have reached today's target!";
    }
  }

  render() {
    const waterLevel = this.state.waterLevel.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "100%"],
    });

    const {currentAmount} = this.state;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.fillBottle}>
          <View style={styles.bottle}>
            <Animated.View style={[styles.water, { height: waterLevel }]} />
            <Text style={styles.currentAmountText}>{currentAmount}/{this.props.target} {this.props.unit}</Text>
            <Text style={[styles.currentAmountText, {top: "10%", color: "white"}]}>{this.targetReached()}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const HydrationScreen = () => {
  const [amount, setAmount] = useState("");
  const [selectedUnit, setSelectedUnit] = useState(null);
  const animated = new Animated.Value(1);
  const userData = useUserData();
  
  const formatData = () => {
    if (userData.hydration == undefined) {
      return <Text>Loading...</Text>;
    }
    const hydrationMap = userData.hydration;
    const days = (Object.keys(hydrationMap).slice(day + 1) + Object.keys(hydrationMap).slice(0, day + 1)).split(",");
    const amounts = days.map((day) => hydrationMap[day].amount);
    const data = {
      labels: days,
      datasets: [
        {
          data: amounts
        }
      ]
    };
    return <BarChart
      data={data}
      width={280}
      height={480}
      chartConfig={chartConfig}
      verticalLabelRotation={90} />
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
    if (userData.height == undefined) {
      return "Drinking water first thing in the morning can help get your metabolism running and give you an energizing effect. - Dr. Luckey";
    }
    const height = userData.height.ft * 12 + userData.height.in;
    const activityLevel = userData.dailyStepGoal / 3000;
    let weight = 0; 
    if (userData.gender == "female") {
      weight = 100 + 5 * (height - 60);
    }
    else {
      weight = 106 + 6 * (height - 60);
    }
    const waterIntakeOunces = (weight * 0.5 + (activityLevel * 12)) | 0;
    const waterIntakeLiters = (waterIntakeOunces / 33.814) | 0;
    return "Based on your profile, your recommended water intake for today is " + waterIntakeOunces + " Ounces or " + waterIntakeLiters + " Liters.";
  }

  return (
    <ScrollView style={styles.screen}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          <SafeAreaView>
            <View style={styles.header}>
              <Text style={styles.title}>Hydration</Text>
              <Image style={styles.pfp} source={profileImage} />
            </View>
          </SafeAreaView>

          <View style={styles.rec}>
            <Text style={styles.subtitle}>Recommendation</Text>
            <View style={styles.recbg}>
              <Text style={styles.rectext}>{recommendation()}</Text>
            </View>
          </View>

          <View style={{ flex: 1.2, flexDirection: "row" }}>
            <View style={styles.target}>
              <Text style={styles.subtitle}>Target</Text>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.targetbg}>
                  <TextInput
                    style={styles.targettext}
                    keyboardType="numeric"
                    placeholder="Amount"
                    value={amount}
                    onChangeText={(amount) => setAmount(amount)}
                    onEndEditing={() => Keyboard.dismiss()}
                  />
                </View>
                <View style={styles.targetbg}>
                  <RNPickerSelect
                    style={{ inputIOS: { textAlign: "center" } }}
                    placeholder={{ label: "Unit", value: null }}
                    value={selectedUnit}
                    onValueChange={(unit) => setSelectedUnit(unit)}
                    items={[
                      { label: "Cups", value: "Cups" },
                      { label: "Pints", value: "Pints" },
                      { label: "Quarts", value: "Quarts" },
                      { label: "Gallons", value: "Gallons" },
                      { label: "Ounces", value: "Ounces" },
                      { label: "Liters", value: "Liters" },
                      { label: "Mililiters", value: "Mililiters" },
                    ]}
                  />
                </View>
              </View>
            </View>

            <View style={styles.log}>
              <Pressable onPressIn={fadeIn} onPressOut={fadeOut}>
                <Animated.View style={{ opacity: animated }}>
                  <Text style={[styles.subtitle]}>Hydration Log</Text>
                </Animated.View>
              </Pressable>
              <Overlay isVisible={visible} onBackdropPress={toggleOverlay} 
              overlayStyle={{backgroundColor: "white", width: 300, height: 500}}>
                <Text>{formatData()}</Text>
              </Overlay>
            </View>
          </View>

          <View style={styles.progressBar}>
            <WaterBottle target={amount} unit={selectedUnit}/>
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
    backgroundColor: "#E9F5FE",
  },

  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 36,
    marginLeft: 10,
  },

  pfp: {
    aspectRatio: 6,
    resizeMode: "contain",
    marginLeft: 40,
  },

  rec: {
    flex: 1.5,
    backgroundColor: "#A5DEFF",
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
    backgroundColor: "#CBE9FF",
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
    backgroundColor: "#A5DEFF",
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
    position: 'absolute',
    bottom: '50%',
    alignSelf: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
});
