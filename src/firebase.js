// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDONMV3XV11MsclilpfCq_cSjNMXpnFUT0",
  authDomain: "hospital-patient-fa723.firebaseapp.com",
  projectId: "hospital-patient-fa723",
  storageBucket: "hospital-patient-fa723.appspot.com",
  messagingSenderId: "760205069274",
  appId: "1:760205069274:web:caf96c34447cbdcecc0ee3",
  measurementId: "G-PXM105C3EF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const signInWithGoogle = (role) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      localStorage.setItem("authUser", JSON.stringify({ ...user, role: role }));
      window.location.href = "/dashboard";
    })
    .catch((error) => {
      console.error("Error during sign in:", error);
    });
};

const signOutUser = () => {
  signOut(auth)
    .then(() => {
      localStorage.clear();
    })
    .catch((error) => {
      console.error("Error during sign out:", error);
    });
};

export { signInWithGoogle, signOutUser };
