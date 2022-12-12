import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyASwrZfLK98-ar28lvA1S7ooSR33LH-pjQ",
  authDomain: "lazktodoapplication.firebaseapp.com",
  projectId: "lazktodoapplication",
  storageBucket: "lazktodoapplication.appspot.com",
  messagingSenderId: "1024362928793",
  appId: "1:1024362928793:web:c3098089b75e00ad033608",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
