import React from "react";
import { View, Text, SafeAreaView, Button, StyleSheet } from "react-native";
import { firebaseAuth } from "../../FirebaseConfig";
import { signOut } from "firebase/auth";

const SettingsScreen = ({ navigation }) => {
  const handleSignOut = async () => {
    try {
      await signOut(firebaseAuth);
      console.log("User logged out successfully!");
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
      <Button style={(padding = 10)} title="Sign Out" onPress={handleSignOut} />
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
});
