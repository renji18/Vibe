import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import imageCompression from "browser-image-compression";
import { firebaseAuth, firestore, storage } from "./config";
import { toast } from "react-toastify";
import { errorHandler } from "./authErrors";
import { getSingleUser } from "../redux/actions";

// returns url for a provided image file
export async function handleUploadImage(file) {
  try {
    const compressImage = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      maxIteration: 10,
      fileType: "image/*",
    });
    const imgRef = ref(storage, `users/profilePic/${Date.now()}-${file}`);
    const upload = await uploadBytes(imgRef, compressImage);
    const res = await getDownloadURL(upload.ref);
    return res;
  } catch (error) {
    errorHandler(error);
  }
}

// returns snap array of any operation in a document
export async function getSnapOfDocs(coll, key, operation, value) {
  try {
    const ref = collection(firestore, coll);
    const q = query(ref, where(key, operation, value));
    const snap = await getDocs(q);
    return snap;
  } catch (error) {
    errorHandler(error);
  }
}

// returns instance of a single document
export async function getSingleDoc(coll, id) {
  try {
    const docRef = doc(firestore, coll, id);
    const docSnap = await getDoc(docRef);
    return docSnap;
  } catch (error) {
    errorHandler(error);
  }
}

// handle user registration
export async function handleRegistration(profile, email, password) {
  try {
    if (profile !== null) {
      return toast.info(
        "A user is already signed in, try logging out before signing up a new user"
      );
    }
    const snap = await getSnapOfDocs("users", "email", "==", email);
    if (!snap.empty) {
      return toast.info(
        "Your account is already registered, please try logging in."
      );
    }
    const res = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    await setDoc(doc(firestore, "users", res.user.uid), {
      email,
      uid: res.user.uid,
    });
    toast.success("Account registered successfully.");
  } catch (error) {
    return errorHandler(error);
  }
}

// handle user sign in
export async function handleSignIn(profile, email, password) {
  try {
    if (profile !== null) {
      return toast.info("A user is already signed in, try logging out first");
    }
    const snap = await getSnapOfDocs("users", "email", "==", email);
    if (snap.empty) {
      return toast.warn(
        "Your account is not registered, please register yourself."
      );
    }
    await signInWithEmailAndPassword(firebaseAuth, email, password);
  } catch (error) {
    return errorHandler(error);
  }
}

// handle saving user data after registration
export async function handleSaveRegistrationData(
  profile,
  userData,
  user,
  dispatch,
  setUser
) {
  try {
    if (profile === null) {
      return toast.warn("Please login first");
    }
    let profilePicUrl = "";
    if (userData.profilePic !== "") {
      profilePicUrl = await handleUploadImage(userData.profilePic);
    }
    const data = {
      ...userData, //name, userName, profilepic, bio
      accountType: "public",
      profilePic: profilePicUrl,
      personalPosts: [], // saves post ids (different collection for all posts)
      likedPosts: [], // saves post ids (different collection for all posts)
      commentedPosts: [], // saves post ids (different collection for all posts)
      savedPosts: [], // saves post ids (different collection for all posts)
      friends: [], // saves user ids
      chat: [], // [{user id, data: [msg]}, {userId, data: [msg]}]
      notificatons: { request: [], like: [], comment: [] }, // request: [{userId, status(accepted, pending, rejected)}], likes: [{postId, userId}], comment: [{postId, userId}]
    };
    const userRef = doc(firestore, "users", user.uid);
    await updateDoc(userRef, data);
    const docSnap = await getDoc(userRef);
    dispatch(getSingleUser(docSnap.data()));
    setUser(data);
    toast.success("Profile created successfully.");
  } catch (error) {
    return errorHandler(error);
  }
}

// handle user sign out
export async function hanldeSignOut(profile) {
  try {
    if (profile === null) {
      console.log("You are already signed out");
      return new Error("You are already signed out");
    } else {
      await signOut(firebaseAuth);
    }
    toast.success("Signed out successfully.");
  } catch (error) {
    return errorHandler(error);
  }
}

// handle auth state change function
export async function handleAuthStateChange(data, dispatch, setUser) {
  try {
    if (data) {
      const docSnap = await getSingleDoc("users", data.uid);
      if (docSnap.exists()) {
        dispatch(getSingleUser(docSnap.data()));
        setUser(data);
        toast.success("Login successful.");
      } else {
        toast.info("Your are logged out.");
      }
    } else {
      dispatch(getSingleUser(null));
      setUser(null);
    }
  } catch (error) {
    return errorHandler(error);
  }
}
