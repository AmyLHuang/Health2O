import React from "react";
import { View, Text, SafeAreaView, Button } from "react-native";
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
    <View>
      <SafeAreaView>
        <Text>Settings Screen</Text>
      </SafeAreaView>
      <Button style={(padding = 10)} title="Sign Out" onPress={handleSignOut} />
    </View>
  );
};

export default SettingsScreen;
