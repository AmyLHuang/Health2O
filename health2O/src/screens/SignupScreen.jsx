import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "@firebase/auth";
import { firebaseApp } from "../../FirebaseConfig";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const auth = getAuth(firebaseApp);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created successfully!");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Signup error:", error.message);
    }
  };

  return (
    <View>
      <Text>Signup Screen</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Signup" onPress={handleSignup} />
      <Text onPress={() => navigation.navigate("Login")}>
        Already have an account? Sign In
      </Text>
    </View>
  );
};

export default SignupScreen;
