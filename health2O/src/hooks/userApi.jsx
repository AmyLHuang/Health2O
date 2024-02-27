// import { useState, useEffect } from "react";
// import { doc, getDoc } from "firebase/firestore";
// import { auth, firestore } from "../../FirebaseConfig";

// const useUserDocument = () => {
//   const [userDocument, setUserDocument] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserDocument = async () => {
//       try {
//         const docSnap = await getDoc(doc(firestore, "Users", auth.currentUser.uid));

//         if (docSnap.exists()) {
//           setUserDocument(docSnap.data());
//         } else {
//           console.log("No such document!");
//         }
//       } catch (error) {
//         console.error("Error fetching user document:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserDocument();
//   }, [auth.currentUser.uid]); // Trigger fetch when the user ID changes

//   return { userDocument, loading };
// };

// export default useUserDocument;
