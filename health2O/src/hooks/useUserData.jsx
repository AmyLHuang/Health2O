import { useState, useEffect } from "react";
import { doc, getDoc, enableNetwork } from "firebase/firestore";
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
          console.log("Error fetching user document: No such document!");
        }
      }
    } catch (error) {
      console.error("Error fetching user document:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userData]);

  return userData;
};

export default useUserData;
