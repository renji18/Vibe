import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
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
import { getAllPosts, getSingleUser } from "../redux/actions";

// handle auth state change function
export async function handleAuthStateChange(data, dispatch, setUser) {
  try {
    if (data) {
      const docSnap = await getSingleDoc("users", data.uid);
      if (docSnap.exists()) {
        dispatch(getSingleUser(docSnap.data()));
        setUser(data);
        if (!sessionStorage.getItem("vibesessionLogin")) {
          toast.success("Logged in successfully.");
          sessionStorage.setItem("vibesessionLogin", true);
        }
        const postRef = collection(firestore, "posts");
        const gibberishPosts = await getDocs(postRef);
        let posts = [];
        gibberishPosts.forEach((post) => posts.push(post.data()));
        dispatch(getAllPosts(posts));
      } else {
        toast.info("Your are logged out.");
      }
    } else {
      dispatch(getSingleUser(null));
      dispatch(getAllPosts(null));
      setUser(null);
    }
  } catch (error) {
    return errorHandler(error);
  }
}

// states updater
async function stateUpdater(dispatch, uid) {
  const docSnap = await getSingleDoc("users", uid);
  dispatch(getSingleUser(docSnap.data()));
  if (!sessionStorage.getItem("vibesessionLogin")) {
    toast.success("Logged in successfully.");
    sessionStorage.setItem("vibesessionLogin", true);
  }
  const postRef = collection(firestore, "posts");
  const gibberishPosts = await getDocs(postRef);
  let posts = [];
  gibberishPosts.forEach((post) => posts.push(post.data()));
  dispatch(getAllPosts(posts));
  return;
}

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

// returns url for a provided video file
export async function handleUploadVideo(file) {
  try {
    // implement npm i video-compressor

    const videoRef = ref(storage, `posts/${Date.now()}-${file}`);
    const upload = await uploadBytes(videoRef, file);
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
export async function handleSignIn(dispatch, profile, email, password) {
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
    const res = await signInWithEmailAndPassword(firebaseAuth, email, password);

    const docSnap = await getSingleDoc("users", res.user.uid);
    dispatch(getSingleUser(docSnap.data()));
    toast.success("Logged in successfull.");
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
      return toast.warn("You are already signed out");
    } else {
      await signOut(firebaseAuth);
    }
    toast.success("Signed out successfully.");
  } catch (error) {
    return errorHandler(error);
  }
}

// handle create post
export async function handleCreateUserPost(dispatch, profile, postData) {
  try {
    if (profile === null) {
      return toast.warn("Please login first");
    }
    let url = [];
    if (postData.userContent.length >= 1) {
      if (postData.userContent[0].type === "image") {
        url = [await handleUploadImage(postData.userContent[0].file)];
      } else {
        url = [await handleUploadVideo(postData.userContent[0].file)];
      }
    }
    const data = {
      userId: profile.uid,
      contentUrl: url,
      description: postData.desc,
      likes: [],
      comments: [],
      timeStamp: Date.now(),
    };
    const res = await addDoc(collection(firestore, "posts"), data);
    toast.success("Post created successfully.");
    const userRef = doc(firestore, "users", profile.uid);
    await updateDoc(userRef, {
      personalPosts: [...profile.personalPosts, res.id],
    });
    const postRef = doc(firestore, "posts", res.id);
    const postSnap = await getDoc(postRef);
    const updatedPostData = postSnap.data();
    if (postData.userContent.length > 1) {
      for (let i = 1; i < postData.userContent.length; i++) {
        let url;
        if (postData.userContent[i].type === "image") {
          url = await handleUploadImage(postData.userContent[i].file);
        } else {
          url = await handleUploadVideo(postData.userContent[i].file);
        }
        await updateDoc(postRef, {
          postId: res.id,
          contentUrl: [...updatedPostData.contentUrl, url],
        });
      }
    }
    stateUpdater(dispatch, profile.uid);
    console.log(res.id);
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
}


// username storing, auto signout after 90days