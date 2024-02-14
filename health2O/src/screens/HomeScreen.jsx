import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { firebaseAuth, firebaseFirestore } from "../../FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

const HomeScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUserId = firebaseAuth.currentUser.uid;
        const document = await getDoc(doc(firebaseFirestore, "Users", currentUserId));
        if (document.exists()) {
          setUserData(document.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array to run the effect only once on component mount

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
      <Text style={{ fontSize: 20, paddingBottom: 20 }}>Home Screen</Text>
      {userData && <Text style={{ paddingBottom: 20 }}>{`User Data: ${JSON.stringify(userData)}`}</Text>}
      {userData && <Text style={{ paddingBottom: 20 }}>Welcome {userData.username}!</Text>}
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
};

export default HomeScreen;
