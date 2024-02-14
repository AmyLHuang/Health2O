import React, { useState } from "react";
import { View, TextInput, Text, Button } from "react-native";
import { firebaseAuth, firebaseFirestore } from "../../FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const NewUserInfoScreen = ({ navigation }) => {
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [heightFt, setHeightFt] = useState(0);
  const [heightIn, setHeightIn] = useState(0);
  const [sleepGoal, setSleepGoal] = useState(8);
  const [stepGoal, setStepGoal] = useState(5000);
  const [bedTimeHour, setBedTimeHour] = useState("10");
  const [bedTimeMin, setBedTimeMin] = useState("00");

  const handleSignup = async () => {
    const info = {
      age: age,
      height: {
        ft: heightFt,
        in: heightIn,
      },
      gender: gender,
      dailyStepGoal: stepGoal,
      sleepGoal: sleepGoal,
      bedtime: {
        hh: bedTimeHour,
        mm: bedTimeMin,
      },
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
      <TextInput placeholder="Age" onChangeText={setAge} />
      <Text>Height:</Text>
      <TextInput placeholder="Feet" onChangeText={setHeightFt} />
      <TextInput placeholder="Inches" onChangeText={setHeightIn} />
      <TextInput placeholder="Gender" onChangeText={setGender} />
      <TextInput placeholder="Sleep Goal (hrs.)" onChangeText={setSleepGoal} />
      <TextInput placeholder="Daily step goal" onChangeText={setStepGoal} />
      <Text>Bed Time:</Text>
      <TextInput placeholder="hh" onChangeText={setBedTimeHour} />
      <TextInput placeholder="mm" onChangeText={setBedTimeMin} />

      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
};

export default NewUserInfoScreen;
