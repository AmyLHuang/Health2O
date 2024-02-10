import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

const SplashScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Splash Screen</Text>
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
      <Button title="Signup" onPress={() => navigation.navigate("Signup")} />
    </View>
  );
};

export default SplashScreen;
