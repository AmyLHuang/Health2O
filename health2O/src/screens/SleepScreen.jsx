import React from "react";
import { View, Text, SafeAreaView, Button } from "react-native";

const SleepScreen = ({ navigation }) => {
  return (
    <View>
      <SafeAreaView>
        <Text>Sleep Screen</Text>
      </SafeAreaView>
      <Text>What is sleep?</Text>
      <Button title={"Go Home"} onPress={() => navigation.navigate("Home")}></Button>
    </View>
  );
};

export default SleepScreen;
