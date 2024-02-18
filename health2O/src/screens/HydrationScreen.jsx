import React, {Component} from "react";
import { View, Text, Image, StyleSheet, Pressable, Animated, TouchableOpacity} from "react-native";

const profileImage = require("../../assets/health20.png");

class WaterBottle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      waterLevel: new Animated.Value(0), // Represents the current water level
    };
  }

  fillBottle = () => {
    const waterLevel = this.state.waterLevel;
    if (waterLevel._value < 1.0) {
      Animated.timing(
        waterLevel,
        {
          toValue: waterLevel._value + 0.2, // Fill the bottle completely
          duration: 500, // Duration of the filling animation
          useNativeDriver: false, // Important for certain animations
        }
      ).start();
    }
  };

  render() {
    const waterLevel = this.state.waterLevel.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
    });

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.fillBottle}>
          <View style={styles.bottle}>
            <Animated.View style={[styles.water, { height: waterLevel }]} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const HydrationScreen = ()  => {
  const animated = new Animated.Value(1);

  const fadeIn = () => {
    Animated.timing(animated, {
      toValue: 0.4,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.screen}>

      <View style={styles.header}>
        <Text style={styles.title}>Hydration</Text>
        <Image style={styles.pfp} source={profileImage}/>
      </View>

      <View style={styles.rec}>
        <Text style={styles.subtitle}>Recommendation</Text>
        <View style={styles.recbg}>
          <Text style={styles.rectext}>Drinking water first thing in the morning can help get your metabolism running and give you an energizing effect. - Dr. Luckey</Text>
        </View>
      </View>

      <View style={{flex: 1.5, flexDirection: "row"}}>

        <View style={styles.target}>
          <Text style={styles.subtitle}>Target</Text>
          <View style={{flexDirection: "row"}}>
            <View style={styles.targetbg}>
              <Text style={styles.targettext}>Amount</Text>
            </View>
            <View style={styles.targetbg}>
              <Text style={styles.targettext}>Unit</Text>
            </View>
          </View>
        </View>

        <View style={styles.log}>
          <Pressable onPressIn={fadeIn} onPressOut={fadeOut}>
            <Animated.View style={{opacity: animated}}>
              <Text style={[styles.subtitle]}>Hydration Log</Text>
            </Animated.View>
          </Pressable>
        </View>

      </View>

      <View style={styles.progressBar}>
        <WaterBottle/>
      </View>

    </View>
  );
};

export default HydrationScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "lightblue"
  },

  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },

  title: {
    fontSize: 36,
    marginLeft: 10
  },

  pfp: {
    aspectRatio: 6, 
    resizeMode: 'contain',
    marginLeft: 40
  },

  rec: {
    flex: 2,
    backgroundColor: "lightpink",
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10
  },

  subtitle: {
    fontSize: 15,
    margin: 8,
    marginLeft: 10
  },

  recbg: {
    backgroundColor: "white",
    borderRadius: 10,
    textAlign: "left",
    marginLeft: 10,
    marginRight: 10
  },

  rectext: {
    padding: 5,
    fontSize: 13
  },

  target: {
    flex: 1,
    backgroundColor: "lightpink",
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 10
  },

  targetbg: {
    backgroundColor: "white",
    borderRadius: 10,
    marginLeft: 10
  },

  targettext: {
    fontSize: 13,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 18
  },

  log: {
    flex: 1,
    backgroundColor: "lightpink",
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center"
  },

  progressBar: {
    flex: 6,
    alignItems: "center",
    justifyContent: "center"
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottle: {
    width: 100,
    height: 200,
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  water: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'blue', // Change this to the color you want for water
  },
});
