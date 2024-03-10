import React, { useState } from "react";
import { View, Text, SafeAreaView, Button, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth } from "../../FirebaseConfig";

const ChangePasswordScreen = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  const isValid = () => {
    if (!oldPassword || !newPassword || !newPassword2) {
      console.log("Didnt fill out all fields");
      return false;
    }
    if (newPassword !== newPassword2) {
      console.log("New passwords do not match.");
      return false;
    }
    return true;
  };

  const handleUpdatePassword = async () => {
    if (isValid()) {
      try {
        const credential = EmailAuthProvider.credential(auth.currentUser.email, oldPassword);
        await reauthenticateWithCredential(auth.currentUser, credential);
        await updatePassword(auth.currentUser, newPassword);
        Alert.alert("Successfully updated password to", newPassword);
        console.log("successfully changed password to", newPassword);
      } catch (error) {
        console.error("error:", error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>Update Password</Text>
      </SafeAreaView>
      <Button title="Go Back" onPress={() => navigation.goBack()}></Button>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} value={oldPassword} onChangeText={setOldPassword} placeholder="Enter Old Password" autoCapitalize="none" />
        <TextInput style={styles.input} value={newPassword} onChangeText={setNewPassword} placeholder="Enter New Password" autoCapitalize="none" />
        <TextInput style={styles.input} value={newPassword2} onChangeText={setNewPassword2} placeholder="Re-Enter New Password" autoCapitalize="none" />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleUpdatePassword}>
        <Text style={styles.buttonText}>Update Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#EC268F",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    width: "84%",
    marginBottom: 10,
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
  button: {
    width: "84%",
    height: 50,
    backgroundColor: "#EC268F",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
