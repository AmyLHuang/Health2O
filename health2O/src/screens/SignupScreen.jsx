import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { firebaseAuth } from "../../FirebaseConfig";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User created successfully!");

      navigation.navigate("NUI", { user, username });
    } catch (error) {
      console.error("Signup error:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome!</Text>
      <Text style={styles.createAccount}>Create an Account</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter Username"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter Email"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter Password"
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
        <Text style={styles.loginButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.signupText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: "10%",
  },
  welcome: {
    fontSize: 28,
    color: "#EC268F",
    textAlign: "left",
    marginBottom: 8,
  },
  createAccount: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  inputContainer: {
    width: "84%",
    marginBottom: 50,
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
  loginButton: {
    width: "84%",
    height: 50,
    backgroundColor: "#EC268F",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 16,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
  },
  signupText: {
    color: "#F58634",
    fontSize: 14,
  },
});
