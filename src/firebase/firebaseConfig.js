import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB5ZQN6ImU-GL-25FNE76zHW_FiSEkq9Z8",
  authDomain: "drive-clone-2cede.firebaseapp.com",
  projectId: "drive-clone-2cede",
  storageBucket: "drive-clone-2cede.appspot.com",
  messagingSenderId: "598287591845",
  appId: "1:598287591845:web:e02fa63eac50813406604c",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
