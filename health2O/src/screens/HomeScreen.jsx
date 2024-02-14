import React from "react";
import { View, Text } from "react-native";
import { firebaseAuth } from "../../FirebaseConfig";

const HomeScreen = ({ navigation }) => {
  console.log("current user: ", firebaseAuth.currentUser.uid);
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;
