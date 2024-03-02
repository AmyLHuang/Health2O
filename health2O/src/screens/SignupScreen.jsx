import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { doc, setDoc } from "@firebase/firestore";
import { auth, firestore } from "../../FirebaseConfig";

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      await setDoc(doc(firestore, "Users", uid), {
        username: username,
      });
      console.log("User created successfully!");
      navigation.navigate("NewUserInfo");
    } catch (error) {
      console.error("Signup error:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.welcome}>Welcome!</Text>
      </SafeAreaView>
      <Text style={styles.createAccount}>Create an Account</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder="Enter Username" autoCapitalize="none" />
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Enter Email" autoCapitalize="none" />
        <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Enter Password" secureTextEntry />
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
    paddingTop: "22%",
  },
  welcome: {
    fontSize: 28,
    color: "#EC268F",
    textAlign: "left",
    marginBottom: 20,
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
