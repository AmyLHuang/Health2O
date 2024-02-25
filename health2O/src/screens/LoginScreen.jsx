import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, SafeAreaView } from "react-native";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../../FirebaseConfig";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in successfully!");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Image source={require("../../assets/health20.png")} style={styles.logo} />
      </SafeAreaView>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Enter Email" autoCapitalize="none" />
        <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Enter Password" secureTextEntry />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.signupText}>Need an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 300,
    marginTop: "10%",
    marginBottom: "10%",
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
