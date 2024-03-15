import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../../FirebaseConfig";

const useUserData = () => {
  const [profileData, setProfileData] = useState("");
  const [sleepData, setSleepData] = useState("");
  const [hydrateData, setHydrateData] = useState("");
  const [exerciseData, setExerciseData] = useState("");

  const fetchData = async () => {
    try {
      if (auth.currentUser) {
        const profileDoc = await getDoc(doc(firestore, "User", auth.currentUser.email));
        const sleepDoc = await getDoc(doc(firestore, "Sleep", auth.currentUser.email));
        const hydrateDoc = await getDoc(doc(firestore, "Hydrate", auth.currentUser.email));
        const exerciseDoc = await getDoc(doc(firestore, "Exercise", auth.currentUser.email));

        if (profileDoc.exists()) setProfileData(profileDoc.data());
        if (sleepDoc.exists()) setSleepData(sleepDoc.data());
        if (hydrateDoc.exists()) setHydrateData(hydrateDoc.data());
        if (exerciseDoc.exists()) setExerciseData(exerciseDoc.data());
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { profileData, sleepData, hydrateData, exerciseData };
};

export default useUserData;
