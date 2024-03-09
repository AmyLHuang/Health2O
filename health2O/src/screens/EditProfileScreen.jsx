import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform} from "react-native";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../../FirebaseConfig";
import useUserData from "../hooks/useUserData";

const EditProfileScreen = ({ navigation }) => {
  const [newUsername, setNewUsername] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [dailySleepGoal, setDailySleepGoal] = useState("");
  const [stepGoal, setStepGoal] = useState("");
  const [bedTimeHour, setBedTimeHour] = useState("");
  const [bedTimeMin, setBedTimeMin] = useState("");
  const userData = useUserData();
  
console.log(userData)
useEffect(() => {
  if(userData) {
    setNewUsername(userData.username || "");
    setGender(userData.gender || "");
    setAge(userData.age ? String(userData.age) : "");
    setHeightFt(userData.height ? String(userData.height.ft) : ""); 
    setHeightIn(userData.height ? String(userData.height.in) : "");
    setDailySleepGoal(userData.sleepGoal ? String(userData.sleepGoal) : "");
    setBedTimeHour(userData.bedtime ? String(userData.bedtime.hh) : "");
    setBedTimeMin(userData.bedtime ? String(userData.bedtime.mm) : "");
  }
}, [userData]);


  const handleUpdatePress = async () => {
     // Display a yes/no confirmation alert
     Alert.alert("Confirmation", `Are you sure you want to update profile?`, [
      { text: "No", style: "cancel" },
      {
        text: "Yes",
        onPress: async () => {
          // User confirmed, update the Firestore document
          await updateFirestoreDocument();
        },
      },
    ]);
  };

  const info = {
    age: parseInt(age),
    height: {
      ft: parseInt(heightFt),
      in: parseInt(heightIn),
    },
    gender: gender,
    dailyStepGoal: parseInt(stepGoal),
    sleepGoal: parseInt(dailySleepGoal),
    bedtime: {
      hh: bedTimeHour,
      mm: bedTimeMin,
    },
  };
  const updateFirestoreDocument = async () => {
    try {
      // Update the value in the specified document
      await setDoc(doc(firestore, "Users", auth.currentUser.uid), info, { merge: true });
      Alert.alert("Successfully updated profile info");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
    <KeyboardAvoidingView 
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
    
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Go Back</Text>
        </TouchableOpacity>
        
        <Text style={styles.title}>Edit Profile</Text>
        

        {/* Username Input */}
        <TextInput 
          style={styles.input} 
          onChangeText={text => setNewUsername(text)}
          value={newUsername} 
          
        />

        {/* Gender Input */}
        <TextInput 
          style={styles.input} 
          onChangeText={text => setGender(text)}
          value={gender}
           
        />

        {/* Age Input */}
        <TextInput 
          style={styles.input} 
          onChangeText={text => setAge(text)}
          value={age}
          
        />

<View style={styles.heightInputContainer}>
  <TextInput 
    style={[styles.input, styles.heightInput]} 
    onChangeText={text => setHeightFt(text)}
    value={heightFt}
    placeholder="Feet"
    keyboardType="numeric"
    
  />
  <TextInput 
    style={[styles.input, styles.heightInput]} 
    onChangeText={text => setHeightIn(text)}
    value={heightIn}
    placeholder="Inches"
    keyboardType="numeric"
  />
</View>

        {/* Daily Sleep Goal Input */}
        <TextInput 
          style={styles.input} 
          value={dailySleepGoal}
          onChangeText={text => setDailySleepGoal(text)}
          keyboardType="numeric"
          
        />

        {/* Bedtime Input */}
<View style={styles.bedtimeInputContainer}>
  <TextInput 
    style={[styles.input, styles.bedtimeInput]} 
    onChangeText={text => setBedTimeHour(text)}
    value={bedTimeHour}
    placeholder="Hour"
    keyboardType="numeric"
  />
  <TextInput 
    style={[styles.input, styles.bedtimeInput]} 
    onChangeText={text => setBedTimeMin(text)}
    value={bedTimeMin}
    placeholder="Minute"
    keyboardType="numeric"
  />
</View>


        {/* Update Button */}
        <TouchableOpacity onPress={handleUpdatePress} style={styles.updateButton}>
          <Text style={styles.updateButtonText}>Update Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  scrollContainer: {
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
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
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    borderColor: '#D2D2D2',
    borderWidth: 1,
  },
  updateButton: {
    backgroundColor: "#EC268F",
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  updateButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  heightInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  heightInput: {
    width: '48%', 
  },
  bedtimeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  bedtimeInput: {
    width: '48%', 
  },
  
});

export default EditProfileScreen;
