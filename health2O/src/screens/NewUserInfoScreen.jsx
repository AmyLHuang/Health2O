import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import firestore from "@react-native-firebase/firestore";

const NewUserInfoScreen = ({ route, navigation }) => {
  const [age, setAge] = useState("");
  // Add other fields as needed

  const handleSignup = async () => {
    const { user, username } = route.params;

    // Use Firebase Firestore to store additional user data
    try {
      await firestore().collection("users").doc(user.uid).set({
        username,
        age,
        // Add other fields here
      });

      console.log("User data stored successfully!");
      // Navigate to the main app screen or wherever you want to go after signup
    } catch (error) {
      console.error("Error storing user data:", error);
    }
  };

  return (
    <View>
      <TextInput placeholder="Age" onChangeText={(text) => setAge(text)} />
      {/* Add other input fields as needed */}
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
};

export default NewUserInfoScreen;
