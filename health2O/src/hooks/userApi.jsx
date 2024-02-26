import { useState, useEffect } from "react";
import { auth, firestore } from "../../FirebaseConfig";
import { onSnapshot, doc } from "firebase/firestore";

const useUserData = () => {
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;

        if (!currentUser) {
          setUserData(null);
          return;
        }

        const currentUserId = currentUser.uid;
        const userDocRef = doc(firestore, "Users", currentUserId);

        const unsubscribe = onSnapshot(userDocRef, (document) => {
          if (document.exists()) {
            setUserData(document.data());
          } else {
            console.log("No such document!");
          }
        });

        // Return a cleanup function to unsubscribe when the component unmounts
        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, [firestore, auth.currentUser.uid]);

  return userData;
};

export default useUserData;

/* User data: JSON.stringify(userData) */
