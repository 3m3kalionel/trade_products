import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC1ePkN7S-gyGNVuaPL8EYsoDEOBBdijf4",
  authDomain: "whitebeltdev-trade-market.firebaseapp.com",
  projectId: "whitebeltdev-trade-market",
  storageBucket: "whitebeltdev-trade-market.appspot.com",
  messagingSenderId: "420311391426",
  appId: "1:420311391426:web:11991b44a7d15493ab2f5b",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFireStore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFireStore, timestamp };
