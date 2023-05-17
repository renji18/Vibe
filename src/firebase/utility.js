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

// returns url for a provided image file
export async function handleUploadImage(storage, file) {
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
}

// returns snap array of any operation in a document
export async function getSnapOfDocs(firestore, coll, key, operation, value) {
  const ref = collection(firestore, coll);
  const q = query(ref, where(key, operation, value));
  const snap = await getDocs(q);
  return snap;
}

// returns instance of a single document
export async function getSingleDoc(firestore, coll, id) {
  const docRef = doc(firestore, coll, id);
  const docSnap = await getDoc(docRef);
  return docSnap;
}

// handle user registration
export async function handleRegistration(
  profile,
  firestore,
  email,
  password,
  firebaseAuth
) {
  try {
    if (profile !== null) {
      console.log(
        "A user is already signed in, try logging out before signing up a new user"
      );
      return new Error(
        "A user is already signed in, try logging out before signing up a new user"
      );
    }
    const snap = await getSnapOfDocs(firestore, "users", "email", "==", email);
    if (!snap.empty) {
      console.log("Your account is already registered, please try logging in.");
      return new Error(
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
  } catch (error) {
    console.log(error);
  }
}

// handle user sign in
export async function handleSignIn(
  profile,
  firestore,
  email,
  password,
  firebaseAuth
) {
  try {
    if (profile !== null) {
      console.log("A user is already signed in, try logging out first");
      return new Error("A user is already signed in, try logging out first");
    }
    const snap = await getSnapOfDocs(firestore, "users", "email", "==", email);
    if (snap.empty) {
      console.log("Your account is not registered, please register yourself.");
      return new Error(
        "Your account is not registered, please register yourself."
      );
    }
    signInWithEmailAndPassword(firebaseAuth, email, password);
  } catch (error) {
    console.log(error);
  }
}

// handle saving user data after registration
export async function handleSaveRegistrationData(
  profile,
  userData,
  storage,
  firestore,
  user,
  dispatch,
  getSingleUser,
  setUser
) {
  try {
    if (profile === null) {
      console.log("Please log in first.");
      return new Error("Please log in first.");
    }
    let profilePicUrl = "";
    if (userData.profilePic !== "") {
      profilePicUrl = await handleUploadImage(storage, userData.profilePic);
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
  } catch (error) {
    console.log(error);
  }
}

// handle user sign out
export async function hanldeSignOut(profile, firebaseAuth) {
  try {
    if (profile === null) {
      console.log("You are already signed out");
      return new Error("You are already signed out");
    } else {
      await signOut(firebaseAuth);
    }
  } catch (error) {
    console.log(error);
  }
}

// handle auth state change function
export async function handleAuthStateChange(
  data,
  firestore,
  dispatch,
  getSingleUser,
  setUser
) {
  if (data) {
    const docSnap = await getSingleDoc(firestore, "users", data.uid);
    if (docSnap.exists()) {
      dispatch(getSingleUser(docSnap.data()));
      setUser(data);
    } else {
      return new Error("No user with the provided uid");
    }
  } else {
    dispatch(getSingleUser(null));
    setUser(null);
  }
}
