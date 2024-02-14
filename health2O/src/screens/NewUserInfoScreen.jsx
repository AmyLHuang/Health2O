import React, { useState } from "react";
import { View, TextInput, Text, Button } from "react-native";
import { firebaseAuth, firebaseFirestore } from "../../FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const NewUserInfoScreen = ({ navigation }) => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [sleepGoal, setSleepGoal] = useState("");
  const [stepGoal, setStepGoal] = useState("");
  const [bedTimeHour, setBedTimeHour] = useState("");
  const [bedTimeMin, setBedTimeMin] = useState("");

  const handleSignup = async () => {
    const info = {
      age: age,
      heightFeet: heightFt,
      heightInches: heightIn,
      gender: gender,
      dailyStepGoal: stepGoal,
      sleepGoal: sleepGoal,
      bedTimeHour: bedTimeHour,
      bedTimeMin: bedTimeMin,
    };

    try {
      const docRef = await setDoc(doc(firebaseFirestore, "Users", firebaseAuth.currentUser.uid), info, { merge: true });
      console.log("User data stored successfully!");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error storing user data:", error);
    }
  };

  return (
    <View>
      <TextInput placeholder="Age" onChangeText={(text) => setAge(text)} />
      <Text>Height:</Text>
      <TextInput placeholder="Feet" onChangeText={(text) => setHeightFt(text)} />
      <TextInput placeholder="Inches" onChangeText={(text) => setHeightIn(text)} />
      <TextInput placeholder="Gender" onChangeText={(text) => setGender(text)} />
      <TextInput placeholder="Sleep Goal (hrs.)" onChangeText={(text) => setSleepGoal(text)} />
      <TextInput placeholder="Daily step goal" onChangeText={(text) => setStepGoal(text)} />
      <Text>Bed Time:</Text>
      <TextInput placeholder="hh" onChangeText={(text) => setBedTimeHour(text)} />
      <TextInput placeholder="mm" onChangeText={(text) => setBedTimeMin(text)} />

      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
};

export default NewUserInfoScreen;
