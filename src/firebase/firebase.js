import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getSingleUser } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

// firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
};

// firebase services instance
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const googleProvider = new GoogleAuthProvider();

// firebase context
const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

// react component for firebase providation
export const FirebaseProvider = (props) => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.userData);

  // states
  const [user, setUser] = useState(null);

  // useEffect to catch logins, registrations and logouts
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        const ref = collection(firestore, "users");
        const q = query(ref, where("uid", "==", user.uid));
        const snap = await getDocs(q);
        snap.forEach((data) => dispatch(getSingleUser(data.data())));
        setUser(user);
      } else {
        dispatch(getSingleUser(null));
        setUser(null);
      }
    });
  }, [dispatch]);

  // signing up user using email and password
  const signUpUserUsingEmailAndPassword = async (email, password) => {
    try {
      if (profile !== null) {
        console.log(
          "A user is already signed in, try logging out before signing up a new user"
        );
        return new Error(
          "A user is already signed in, try logging out before signing up a new user"
        );
      }

      const ref = collection(firestore, "users");
      const q = query(ref, where("email", "==", email));
      const snap = await getDocs(q);
      if (!snap.empty) {
        console.log(
          "Email already exists, try logging in or use a different account."
        );
        return new Error(
          "Email already exists, try logging in or use a different account."
        );
      }

      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  // saving user data on registration
  const saveUserDataOnRegistration = async (userData) => {
    try {
      let profilePicUrl = "";
      if (userData.profilePic !== "") {
        const res = await handleUploadImage(userData.profilePic);
        profilePicUrl = res.ref.fullPath;
      }

      let data = {
        ...userData,
        uid: user.user.uid,
        accountType: "public",
        profilePic: profilePicUrl,
        personalPosts: [],
        likedPosts: [],
        commentedPosts: [],
        savedPosts: [],
        friends: [],
        chat: [],
        notificatons: { request: [], like: [], comment: [] },
      };

      await addDoc(collection(firestore, "users"), data);
    } catch (error) {
      console.log(error);
    }
  };

  // sign in email/pw
  const signinUser = async (email, password) => {
    if (profile !== null) {
      console.log("A user is already signed in, try logging out first");
      return new Error("A user is already signed in, try logging out first");
    }
    const signIn = await signInWithEmailAndPassword(firebaseAuth, email, password);
    console.log(signIn);
  };

  // sign up with google
  const signupWithGoogle = () => {
    if (profile !== null) {
      console.log("A user is already signed in, try logging out first");
      return new Error("A user is already signed in, try logging out first");
    }
    signInWithPopup(firebaseAuth, googleProvider);
  };

  // signout
  const signOutUser = () => {
    if (profile === null) {
      console.log("You are already signed out");
      return new Error("You are already signed out");
    }
    return signOut(firebaseAuth);
  };

  // getDocument
  const getDocument = async (id) => {
    const ref = doc(firestore, "users", id);
    const snap = await getDoc(ref);
    console.log(snap.data());
  };

  // upload image
  async function handleUploadImage(file) {
    const imgRef = ref(storage, `users/profilePic/${Date.now()}-${file}`);
    const res = await uploadBytes(imgRef, "imageFile");
    return res;
    // img url res.ref.fullPath
  }

  // get Image
  const getImage = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  return (
    <FirebaseContext.Provider
      value={{
        signUpUserUsingEmailAndPassword,
        saveUserDataOnRegistration,
        signupWithGoogle,
        signinUser,
        signOutUser,
        getDocument,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
