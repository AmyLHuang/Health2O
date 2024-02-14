import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { firebaseAuth, firebaseFirestore } from "../../FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const HomeScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUserId = firebaseAuth.currentUser.uid;
        console.log("current user: ", currentUserId);

        const document = await getDoc(doc(firebaseFirestore, "Users", currentUserId));

        if (document.exists()) {
          // console.log("Document data:", document.data());
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

  return (
    <View>
      <Text style={{ fontSize: 20, paddingBottom: 20 }}>Home Screen</Text>
      {userData && <Text style={{ paddingBottom: 20 }}>{`User Data: ${JSON.stringify(userData)}`}</Text>}
      {userData && <Text>Welcome {userData.username}!</Text>}
    </View>
  );
};

export default HomeScreen;
