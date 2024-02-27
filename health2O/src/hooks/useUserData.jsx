import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import { auth, firestore } from "../../FirebaseConfig";

const useUserData = () => {
  const [userData, setUserData] = useState("");

  const fetchData = async () => {
    try {
      if (auth.currentUser) {
        const docSnap = await getDoc(doc(firestore, "Users", auth.currentUser.uid));
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } else {
        console.log("User not logged in");
      }
    } catch (error) {
      console.error("Error fetching user document:", error);
    }
  };

  useFocusEffect(() => {
    fetchData();
  });

  return userData;
};

export default useUserData;
