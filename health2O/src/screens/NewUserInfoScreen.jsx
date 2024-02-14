import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { firebaseFirestore } from "../../FirebaseConfig";

const NewUserInfoScreen = ({ route, navigation }) => {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");

  const handleSignup = async () => {
    const { user, username } = route.params;
    const uid = user.uid;

    try {
      const docRef = await addDoc(collection(firebaseFirestore, "users"), {
        username,
        age,
      });
      console.log("Document written with ID: ", docRef.id);
      console.log("User data stored successfully!");

      navigation.navigate("Home");
    } catch (error) {
      console.error("Error storing user data:", error);
    }
  };

  return (
    <View>
      <TextInput placeholder="Age" onChangeText={(text) => setAge(text)} />
      <TextInput
        placeholder="Height"
        onChangeText={(text) => setHeight(text)}
      />
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
};

export default NewUserInfoScreen;
