import * as firebaseui from "firebaseui";
import { initializeApp } from "firebase/app";
import { collection, getFirestore, orderBy } from "firebase/firestore";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

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
const auth = getAuth(firebaseApp);

const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => console.log(result))
    .catch((error) => console.log(error));
};

// collection refs
const usersCollectionRef = collection(db, "users");
const postsCollectionRef = collection(db, "posts");
const likesCollectionRef = collection(db, "likes");
const friendsCollectionRef = collection(db, "friends");
const commentsCollectionRef = collection(db, "comments");

const saveToken = (idToken) => {
  console.log("in local stoage");
  try {
    localStorage.setItem("idToken", idToken);
  } catch (err) {
    console.log(err);
  }
};

const getIdToken = () => {
  auth.currentUser
    .getIdToken(/* forceRefresh */ true)
    .then(function (idToken) {
      // Send token to your backend via HTTPS
      // ...
      saveToken(idToken);
      // store.dispatch(toggleMainLoader(true));
      // /dispatch(getUserProfile(idToken));
    })
    .catch(function (error) {
      // Handle error
      console.log(error);
      // dispatch(toggleMainLoader(true));
      return null;
    });
};

const checkAuth = () => {
  auth.onAuthStateChanged((user) => {
    console.log(user, "user");
  });
};

const refreshIdToken = () => {
  auth
    .currentUser.getIdToken(/* forceRefresh */ true)
    .then(function (idToken) {
      // Send token to your backend via HTTPS
      // ...
      console.log(idToken, "in firebase");
      saveToken(idToken);
    })
    .catch(function (error) {
      // Handle error
      console.log(error);
      return null;
    });
};

var ui =
  firebaseui.auth.AuthUI.getInstance() ||
  new firebaseui.auth.AuthUI(auth);


export {
  db,
  auth,
  signInWithGoogle,
  usersCollectionRef,
  postsCollectionRef,
  likesCollectionRef,
  friendsCollectionRef,
  commentsCollectionRef,
  getIdToken,
  refreshIdToken,
  checkAuth,
};
