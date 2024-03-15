import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Alert, ScrollView, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import { auth, firestore } from "../../FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const CreateProfileScreen = ({ navigation }) => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [sleepGoal, setSleepGoal] = useState("");
  const [stepGoal, setStepGoal] = useState("");
  const [bedTimeHour, setBedTimeHour] = useState("");
  const [bedTimeMin, setBedTimeMin] = useState("");

  const handleSignup = async () => {
    if (!age || !gender || !heightFt || !heightIn || !sleepGoal || !stepGoal || !bedTimeHour || !bedTimeMin) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const profileInfo = {
      age: parseInt(age),
      height: {
        ft: parseInt(heightFt),
        in: parseInt(heightIn),
      },
      gender: gender,
    };

    const sleepInfo = {
      goal: parseInt(sleepGoal),
      bedtime: {
        hh: bedTimeHour,
        mm: bedTimeMin,
      },
      prevNight: parseInt(sleepGoal),
    };

    const exerciseInfo = {
      goal: parseInt(stepGoal),
    };

    const hydrateInfo = {
      goal: 3,
      currentAmount: 0,
    };

    try {
      await setDoc(doc(firestore, "User", auth.currentUser.email), profileInfo, { merge: true });
      await setDoc(doc(firestore, "Sleep", auth.currentUser.email), sleepInfo);
      await setDoc(doc(firestore, "Exercise", auth.currentUser.email), exerciseInfo);
      await setDoc(doc(firestore, "Hydrate", auth.currentUser.email), hydrateInfo);

      navigation.navigate("Home");
    } catch (error) {
      console.error("Error storing user data:", error);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={styles.container}>
        <SafeAreaView>
          <Text style={styles.title}>Create your Profile</Text>
        </SafeAreaView>

        <Text style={styles.label}>Age</Text>
        <TextInput style={styles.input} placeholder="Enter your age" keyboardType="numeric" onChangeText={(text) => setAge(text.replace(/[^0-9]/g, ""))} value={age} />

        <Text style={styles.label}>Height</Text>
        <View style={styles.row}>
          <TextInput style={[styles.input, styles.inputHalf]} placeholder="Feet" keyboardType="numeric" onChangeText={(text) => setHeightFt(text.replace(/[^0-9]/g, ""))} value={heightFt} />
          <TextInput style={[styles.input, styles.inputHalf]} placeholder="Inches" keyboardType="numeric" onChangeText={(text) => setHeightIn(text.replace(/[^0-9]/g, ""))} value={heightIn} />
        </View>

        <Text style={styles.label}>Gender</Text>
        <TextInput style={styles.input} placeholder="Specify your gender" onChangeText={setGender} value={gender} />

        <Text style={styles.label}>Daily Step Goal</Text>
        <TextInput style={styles.input} placeholder="Target daily steps" keyboardType="numeric" onChangeText={(text) => setStepGoal(text.replace(/[^0-9]/g, ""))} value={stepGoal} />

        <Text style={styles.label}>Sleep Goal (hrs)</Text>
        <TextInput style={styles.input} placeholder="Target sleep hours" keyboardType="numeric" onChangeText={(text) => setSleepGoal(text.replace(/[^0-9]/g, ""))} value={sleepGoal} />

        <Text style={styles.label}>Bed Time</Text>
        <View style={styles.row}>
          <TextInput style={[styles.input, styles.inputHalf]} placeholder="HH" keyboardType="numeric" onChangeText={setBedTimeHour} value={bedTimeHour} />
          <TextInput style={[styles.input, styles.inputHalf]} placeholder="MM" keyboardType="numeric" onChangeText={setBedTimeMin} value={bedTimeMin} />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#EC268F",
    alignSelf: "center",
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    padding: 5,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  inputHalf: {
    flex: 1,
    marginRight: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: "84%",
    height: 50,
    backgroundColor: "#EC268F",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 10,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
