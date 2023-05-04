import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

const {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  REACT_APP_FIREBASE_APP_ID,
  REACT_APP_FIREBASE_MEASUREMENT_ID,
} = process.env;

// config object from firestore
const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
  measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// init firebase app
const firebaseApp = initializeApp(firebaseConfig);

// init services
const db = getFirestore(firebaseApp);

// collection refs
const usersCollectionRef = collection(db, "users");
const postsCollectionRef = collection(db, "posts");
const likesCollectionRef = collection(db, "likes");
const friendsCollectionRef = collection(db, "friends");
const commentsCollectionRef = collection(db, "comments");

export {
  db,
  usersCollectionRef,
  postsCollectionRef,
  likesCollectionRef,
  friendsCollectionRef,
  commentsCollectionRef,
};
