import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyALTCfy0K5qZsh7Ot76VAm8WAVKvNTOt5s",
  authDomain: "meal-manage-83321.firebaseapp.com",
  projectId: "meal-manage-83321",
  storageBucket: "meal-manage-83321.appspot.com",
  messagingSenderId: "150787532022",
  appId: "1:150787532022:web:aae4bf84b7d49a8ddcb8d7"
};

  
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  export default firebaseApp;