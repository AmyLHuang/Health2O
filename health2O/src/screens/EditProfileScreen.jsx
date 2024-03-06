import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert} from "react-native";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../../FirebaseConfig";
import useUserData from "../hooks/useUserData";

const EditProfileScreen = ({ navigation }) => {
  const [newUsername, setNewUsername] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [dailySleepGoal, setDailySleepGoal] = useState("");
  const [bedtime, setBedtime] = useState("");
  const userData = useUserData();
  useEffect(() => {
    if (userData) {
      setNewUsername(userData.name || "");
      setGender(userData.gender || "");
      setAge(userData.age ? String(userData.age) : "");
      setHeight(userData.height || "");
      setDailySleepGoal(userData.dailySleepGoal ? String(userData.dailySleepGoal) : "");
      setBedtime(userData.bedtime || "");
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
  const updateFirestoreDocument = async () => {
    try {
      // Update the value in the specified document
      await setDoc(doc(firestore, "Users", auth.currentUser.uid), { username: newUsername }, { merge: true });
      Alert.alert("Successfully updated profile info");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Go Back</Text>
        </TouchableOpacity>
        
        <Text style={styles.title}>Edit Profile</Text>
        <Text style={styles.marginBottom}>{JSON.stringify(userData)}</Text>
        {/* Username Input */}
        <TextInput 
          style={styles.input} 
          placeholder={userData.username}
          value={userData.name} 
          
        />

        {/* Gender Input */}
        <TextInput 
          style={styles.input} 
          placeholder={userData.gender}
           
        />

        {/* Age Input */}
        <TextInput 
          style={styles.input} 
          placeholder={JSON.stringify(userData.age)}
          
        />

        {/* Height Input */}
        <TextInput 
          style={styles.input} 
          placeholder={JSON.stringify(userData.height)}
          
        />

        {/* Daily Sleep Goal Input */}
        <TextInput 
          style={styles.input} 
          placeholder={JSON.stringify(userData.sleepGoal)}
          keyboardType="numeric"
          
        />

        {/* Bedtime Input */}
        <TextInput 
          style={styles.input} 
          placeholder={JSON.stringify(userData.bedtime)}
          
        />

        {/* Update Button */}
        <TouchableOpacity onPress={handleUpdatePress} style={styles.updateButton}>
          <Text style={styles.updateButtonText}>Update Profile</Text>
        </TouchableOpacity>
      </ScrollView>
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
});

export default EditProfileScreen;
