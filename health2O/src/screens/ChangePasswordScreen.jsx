import React, { useState } from "react";
import { View, Text, SafeAreaView, Button, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth } from "../../FirebaseConfig";

const ChangePasswordScreen = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [msg, setMsg] = useState("");

  const isValid = () => {
    if (!oldPassword || !newPassword || !newPassword2) {
      setMsg("Error: Didnt fill out all fields");
      return false;
    }
    if (newPassword !== newPassword2) {
      setMsg("Error: New passwords do not match.");
      return false;
    }
    if (newPassword == oldPassword) {
      setMsg("Error: old password field and new password field cannot be the same");
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
        setMsg("Successfully updated password!");
      } catch (error) {
        setMsg("Error: Inputed incorrect password");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Go Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Update Password</Text>

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} value={oldPassword} onChangeText={setOldPassword} placeholder="Enter Old Password" autoCapitalize="none" />
        <TextInput style={styles.input} value={newPassword} onChangeText={setNewPassword} placeholder="Enter New Password" autoCapitalize="none" />
        <TextInput style={styles.input} value={newPassword2} onChangeText={setNewPassword2} placeholder="Re-Enter New Password" autoCapitalize="none" />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleUpdatePassword}>
        <Text style={styles.buttonText}>Update Password</Text>
      </TouchableOpacity>
      <Text style={styles.msg}>{msg}</Text>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
    alignItems: "center",
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
    padding: 20,
  },
  backButtonText: {
    fontSize: 18,
    color: "#EC268F",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#EC268F",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    width: "84%",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#fff",
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
  msg: {
    color: "red",
    margin: 20,
    fontSize: 15,
  },
});
