import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../../FirebaseConfig";
import useUserData from "../hooks/useUserData";

const EditProfileScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [sleepGoal, setSleepGoal] = useState("");
  const [stepGoal, setStepGoal] = useState("");
  const [bedTimeHour, setBedTimeHour] = useState("");
  const [bedTimeMin, setBedTimeMin] = useState("");
  const { profileData, sleepData, hydrateData, exerciseData } = useUserData();

  useEffect(() => {
    setUsername(profileData.username || "");
    setGender(profileData.gender || "");
    setAge(profileData.age ? String(profileData.age) : "");
    setHeightFt(profileData.height ? String(profileData.height.ft) : "");
    setHeightIn(profileData.height ? String(profileData.height.in) : "");
    setStepGoal(exerciseData.goal ? String(exerciseData.goal) : "");
    setSleepGoal(sleepData.goal ? String(sleepData.goal) : "");
    setBedTimeHour(sleepData.bedtime ? String(sleepData.bedtime.hh) : "");
    setBedTimeMin(sleepData.bedtime ? String(sleepData.bedtime.mm) : "");
  }, [profileData, sleepData, hydrateData, exerciseData]);

  const profileInfo = {
    username: username,
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
  };

  const exerciseInfo = {
    goal: parseInt(stepGoal),
  };

  // confirmation if user wants to update profile
  const handleUpdatePress = async () => {
    Alert.alert("Confirmation", `Are you sure you want to update profile?`, [
      { text: "No", style: "cancel" },
      {
        text: "Yes",
        onPress: async () => {
          await updateFirestoreDocument();
        },
      },
    ]);
  };

  // update database with new profile info
  const updateFirestoreDocument = async () => {
    try {
      await setDoc(doc(firestore, "User", auth.currentUser.email), profileInfo, { merge: true });
      await setDoc(doc(firestore, "Sleep", auth.currentUser.email), sleepInfo, { merge: true });
      await setDoc(doc(firestore, "Exercise", auth.currentUser.email), exerciseInfo, { merge: true });
      Alert.alert("Successfully updated profile info");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <SafeAreaView>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Go Back</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Edit Profile</Text>
        </SafeAreaView>

        <Text style={styles.label}>Username</Text>
        <TextInput style={styles.input} onChangeText={(text) => setUsername(text)} value={username} />

        <Text style={styles.label}>Gender</Text>
        <TextInput style={styles.input} onChangeText={(text) => setGender(text)} value={gender} />

        <Text style={styles.label}>Age</Text>
        <TextInput style={styles.input} onChangeText={(text) => setAge(text)} value={age} />

        <Text style={styles.label}>Height</Text>
        <View style={styles.inputRowContainer}>
          <TextInput style={[styles.input, styles.inputRow]} onChangeText={(text) => setHeightFt(text)} value={heightFt} placeholder="Feet" keyboardType="numeric" />
          <TextInput style={[styles.input, styles.inputRow]} onChangeText={(text) => setHeightIn(text)} value={heightIn} placeholder="Inches" keyboardType="numeric" />
        </View>

        <Text style={styles.label}>Daily Sleep Goal</Text>
        <TextInput style={styles.input} value={sleepGoal} onChangeText={(text) => setSleepGoal(text)} keyboardType="numeric" />

        <Text style={styles.label}>Daily Step Goal</Text>
        <TextInput style={styles.input} value={stepGoal} onChangeText={(text) => setStepGoal(text)} keyboardType="numeric" />

        <Text style={styles.label}>Bedtime</Text>
        <View style={styles.inputRowContainer}>
          <TextInput style={[styles.input, styles.inputRow]} onChangeText={(text) => setBedTimeHour(text)} value={bedTimeHour} placeholder="Hour" keyboardType="numeric" />
          <TextInput style={[styles.input, styles.inputRow]} onChangeText={(text) => setBedTimeMin(text)} value={bedTimeMin} placeholder="Minute" keyboardType="numeric" />
        </View>

        {/* Update Button */}
        <TouchableOpacity onPress={handleUpdatePress} style={styles.updateButton}>
          <Text style={styles.updateButtonText}>Update Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  scrollContainer: {
    padding: 18,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
    textAlign: "left",
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: "#EC268F",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#EC268F",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
    borderColor: "#D2D2D2",
    borderWidth: 1,
  },
  updateButton: {
    backgroundColor: "#EC268F",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  inputRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  inputRow: {
    width: "48%",
  },
  updateButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default EditProfileScreen;
