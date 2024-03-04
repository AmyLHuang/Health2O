import React, { Component, useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Pressable, ScrollView, Animated, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback, SafeAreaView } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { firebaseAuth, firebaseFirestore } from "../../FirebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Overlay } from "@rneui/base";

const profileImage = require("../../assets/health20.png");

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
      });
    }
  };

  targetReached = () => {
    if (this.state.waterLevel._value >= 1) {
      const userRef = doc(firebaseFirestore, "Users", firebaseAuth.currentUser.uid);
      setDoc(userRef, 
        {hydration: {date: Math.floor(Date.now() / 1000), amount: this.props.target, unit: this.props.unit}},
        { merge: true }
      );
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

  const convertDate = (seconds) => {
    const date = new Date(seconds * 1000);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add 1 to month because it's zero-based
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  
  const formatData = () => {
    if (userData.hydration == undefined) {
      return <Text>Loading...</Text>;
    }
    console.log(userData.hydration);
    //return userData.hydration.map((item, index) => (<Text key={index}>{convertDate(item.date.seconds)}: {item.amount} {item.unit}{"\n"}</Text>));
    return <Text>{convertDate(userData.hydration.date)}: {userData.hydration.amount} {userData.hydration.unit}</Text>;
  };

  const [userData, setUserData] = useState("");
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUserId = firebaseAuth.currentUser.uid;
        const document = await getDoc(doc(firebaseFirestore, "Users", currentUserId));
        if (document.exists()) {
          setUserData(document.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, []);

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
              <Text style={styles.rectext}>Drinking water first thing in the morning can help get your metabolism running and give you an energizing effect. - Dr. Luckey</Text>
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
