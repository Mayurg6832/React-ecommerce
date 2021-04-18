import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBPD1enEw9RWDaD7PDOnc7eOF4c6gljOl4",
  authDomain: "react-ecommerce-db-68e15.firebaseapp.com",
  projectId: "react-ecommerce-db-68e15",
  storageBucket: "react-ecommerce-db-68e15.appspot.com",
  messagingSenderId: "749967497369",
  appId: "1:749967497369:web:7ee7753cd6b6528c2b0008",
  measurementId: "G-28R0E8DMPY",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
