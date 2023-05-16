import { createContext, useContext, useEffect } from "react";
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

const firebaseConfig = {
  apiKey: "AIzaSyDpZcyVo6WCtO_u9hwhxCRPigrw6jNqZ6o",
  authDomain: "vibe-96e57.firebaseapp.com",
  projectId: "vibe-96e57",
  storageBucket: "vibe-96e57.appspot.com",
  messagingSenderId: "874384170808",
  appId: "1:874384170808:web:a07ba6554dd10cb34aabcd",
  measurementId: "G-TB75ESS3ZG",
  databaseURL: "https://vibe-96e57-default-rtdb.firebaseio.com/",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.userData);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        const ref = collection(firestore, "users");
        const q = query(ref, where("uid", "==", user.uid));
        const snap = await getDocs(q);
        snap.forEach((data) => dispatch(getSingleUser(data.data())));
      } else {
        dispatch(getSingleUser(null));
      }
    });
  }, [dispatch]);

  // sign up
  const signupUser = async (email, password, userData) => {
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

    const res = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    let profilePicUrl = "";
    if (userData.profilePic !== "") {
      const res = handleUploadImage(userData.profilePic);
      profilePicUrl = res.ref.fullPath;
    }
    let data = {
      ...userData,
      uid: res.user.uid,
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
  };

  // sign in email/pw
  const signinUser = (email, password) => {
    if (profile !== null) {
      console.log("A user is already signed in, try logging out first");
      return new Error("A user is already signed in, try logging out first");
    }
    return signInWithEmailAndPassword(firebaseAuth, email, password);
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

  // saveUserData
  const saveUserData = () => {};

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
        signupUser,
        signinUser,
        signupWithGoogle,
        signOutUser,
        getDocument,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
