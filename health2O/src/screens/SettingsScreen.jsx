import React, { useState } from "react";
import { View, Text, SafeAreaView, Button, StyleSheet, TextInput, Alert } from "react-native";
import { signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../../FirebaseConfig";

const SettingsScreen = ({ navigation, route }) => {
  const [newValue, setNewValue] = useState("");
  const [username, setUsername] = useState("");

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully!");
      navigation.navigate("Login");
    } catch (error) {
      console.error("SignOut error:", error.message);
    }
  };

  const handleUpdatePress = async () => {
    // Display a yes/no confirmation alert
    Alert.alert("Confirmation", `Are you sure you want to update username to ${newValue}?`, [
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
      await setDoc(doc(firestore, "Users", auth.currentUser.uid), { username: newValue }, { merge: true });
      Alert.alert("Successfully updated username to", newValue);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>Settings Screen</Text>
      </SafeAreaView>
      <Button title="Sign Out" onPress={handleSignOut} />
      <View>
        <Text>Change Username: </Text>
        <TextInput style={styles.input} placeholder="New Username" value={newValue} onChangeText={(text) => setNewValue(text)} />
        <Button title="Change Username" onPress={handleUpdatePress} />
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#EC268F",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 54,
    borderColor: "#D2D2D2",
    borderWidth: 2,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 15,
  },
});
