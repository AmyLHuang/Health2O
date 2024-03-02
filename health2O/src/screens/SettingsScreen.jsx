import React from "react";
import { View, Text, SafeAreaView, Button, StyleSheet, TextInput, Alert } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../FirebaseConfig";

const SettingsScreen = ({ navigation }) => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully!");
      navigation.navigate("Login");
    } catch (error) {
      console.error("SignOut error:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>Settings Screen</Text>
      </SafeAreaView>
      <Button title="Edit Profile" onPress={() => navigation.navigate("EditProfile")}></Button>
      <Button title="About" onPress={() => navigation.navigate("About")}></Button>
      <Button title="Change Password" onPress={() => navigation.navigate("ChangePassword")}></Button>
      <Button title="Sign Out" onPress={handleSignOut} />
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
