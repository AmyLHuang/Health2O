import React, {Component, useState} from "react";
import { View, Text, Image, StyleSheet, Pressable, Animated, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback} from "react-native";
import RNPickerSelect from 'react-native-picker-select';

const profileImage = require("../../assets/health20.png");

class WaterBottle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      waterLevel: new Animated.Value(0), // current water level
    };
  }

  fillBottle = () => {
    const waterLevel = this.state.waterLevel;
    if (waterLevel._value < 1.0) {
      Animated.timing(
        waterLevel,
        {
          toValue: waterLevel._value + 0.125, // Fill water
          duration: 500,
          useNativeDriver: false,
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
  const [amount, setAmount] = useState('');
  const [selectedUnit, setSelectedUnit] = useState(null);
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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

      <View style={{flex: 1.2, flexDirection: "row"}}>

        <View style={styles.target}>
          <Text style={styles.subtitle}>Target</Text>
          <View style={{flexDirection: "row"}}>
            <View style={styles.targetbg}>
              <TextInput 
                style={styles.targettext}
                keyboardType="numeric" 
                placeholder="Amount" 
                value={amount} 
                onChangeText={amount => setAmount(amount)}
                onEndEditing={() => Keyboard.dismiss()}
              />
            </View>
            <View style={styles.targetbg}>
              <RNPickerSelect
                style={{inputIOS: {textAlign: "center"}}}
                placeholder={{label: "Unit", value: null}}
                value={selectedUnit}
                onValueChange={(unit) => setSelectedUnit(unit)}
                items={[
                  { label: 'Grams', value: 'Grams' },
                  { label: 'Miligrams', value: 'Miligrams' },
                  { label: 'Ounces', value: 'Ounces' },
                  { label: 'Liters', value: 'Liters' },
                  { label: 'Mililiters', value: 'Mililiters' },
                ]}
              />
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
    </TouchableWithoutFeedback>
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
    flex: 1.5,
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
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  targettext: {
    fontSize: 13,
    padding: 10
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
    width: 150,
    height: 300,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderRadius: 20,
    overflow: "hidden"
  },

  water: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'blue'
  }
});
