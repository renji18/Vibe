import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import imageCompression from "browser-image-compression"
import { firebaseAuth, firestore, storage } from "./config"
import { toast } from "react-toastify"
import { errorHandler } from "./authErrors"
import { getAllPosts, getSingleUser, getUserNamesData } from "../redux/actions"

// handle auth state change function
export async function handleAuthStateChange(data, dispatch, setUser) {
  try {
    if (data) {
      const docSnap = await getSingleDoc("users", data?.uid)
      if (docSnap?.exists()) {
        await handleAutoSignOut(docSnap?.data())
        dispatch(getSingleUser(docSnap?.data()))
        setUser(data)
        await handleGetUserNamesData(dispatch)
        const posts = await handleGetAllDocs("posts")
        dispatch(getAllPosts(posts))
      } else {
        dispatch(getSingleUser(null))
        dispatch(getAllPosts(null))
      }
    } else {
      dispatch(getSingleUser(null))
      dispatch(getAllPosts(null))
      setUser(null)
    }
  } catch (error) {
    return errorHandler(error)
  }
}

// get all docs
export async function handleGetAllDocs(collectionName) {
  try {
    const ref = collection(firestore, collectionName)
    const gibberishData = await getDocs(ref)
    let docs = []
    gibberishData?.forEach((data) => docs?.push(data?.data()))
    return docs
  } catch (error) {
    return errorHandler(error)
  }
}

// handle get usernames
export async function handleGetUserNamesData(dispatch) {
  try {
    const userNameRef = collection(firestore, "users")
    const gibberishData = await getDocs(userNameRef)
    let users = []
    gibberishData?.forEach((user) => users?.push(user?.data()))
    let userNames = []
    users?.forEach((user) => {
      user?.userName && userNames?.push(user?.userName)
    })
    dispatch(getUserNamesData(userNames))
  } catch (error) {
    return errorHandler(error)
  }
}

// returns url for a provided image file
export async function handleUploadImage(file, location) {
  try {
    const compressImage = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      maxIteration: 10,
      fileType: "image/*",
    })
    const imgRef = ref(storage, location)
    const upload = await uploadBytes(imgRef, compressImage)
    const res = await getDownloadURL(upload?.ref)
    return res
  } catch (error) {
    errorHandler(error)
  }
}

// returns url for a provided video file
export async function handleUploadVideo(file) {
  try {
    // implement npm i video-compressor
    const videoRef = ref(storage, `posts/videos/${Date?.now()}-${file}`)
    const upload = await uploadBytes(videoRef, file)
    const res = await getDownloadURL(upload?.ref)
    return res
  } catch (error) {
    errorHandler(error)
  }
}

// returns snap array of any operation in a document
export async function getSnapOfDocs(coll, key, operation, value) {
  try {
    const ref = collection(firestore, coll)
    const q = query(ref, where(key, operation, value))
    const snap = await getDocs(q)
    return snap
  } catch (error) {
    errorHandler(error)
  }
}

// returns instance of a single document
export async function getSingleDoc(coll, id) {
  try {
    const docRef = doc(firestore, coll, id)
    const docSnap = await getDoc(docRef)
    return docSnap
  } catch (error) {
    errorHandler(error)
  }
}

// handle user registration
export async function handleRegistration(profile, email, password) {
  try {
    if (profile !== null) {
      return toast?.info(
        "A user is already signed in, try logging out before signing up a new user"
      )
    }
    const snap = await getSnapOfDocs("users", "email", "==", email)
    if (!snap?.empty) {
      return toast?.info(
        "Your account is already registered, please try logging in."
      )
    }
    const res = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    )
    await setDoc(doc(firestore, "users", res?.user?.uid), {
      email,
      uid: res?.user?.uid,
      loginAt: Date?.now(),
    })
    toast?.success("Account registered successfully.")
  } catch (error) {
    console?.log(error)
    return errorHandler(error)
  }
}

// handle user sign in
export async function handleSignIn(dispatch, profile, email, password) {
  try {
    if (profile !== null) {
      return toast?.info("A user is already signed in, try logging out first")
    }
    const snap = await getSnapOfDocs("users", "email", "==", email)
    if (snap?.empty) {
      return toast?.warn(
        "Your account is not registered, please register yourself."
      )
    }
    const res = await signInWithEmailAndPassword(firebaseAuth, email, password)
    const docSnap = await getSingleDoc("users", res?.user?.uid)
    dispatch(getSingleUser(docSnap?.data()))
    toast?.success("Logged in successfully.")
  } catch (error) {
    return errorHandler(error)
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
      return toast?.warn("Please login first")
    }
    let profilePicUrl = ""
    if (userData?.profilePic !== "") {
      profilePicUrl = await handleUploadImage(
        userData?.profilePic,
        `users/profilePics/${Date?.now()}-${userData?.profilePic}`
      )
    }
    const data = {
      ...userData, //name, userName, profilepic, bio, email
      registered: true,
      verified: false,
      accountType: "public",
      profilePic: profilePicUrl,
      personalPosts: [], // saves post ids (different collection for all posts)
      likedPosts: [], // saves post ids (different collection for all posts)
      savedPosts: [], // saves post ids (different collection for all posts)
      friends: [], // saves user id, name, image
      chat: [], // [{user id, data: [msg]}, {userId, data: [msg]}]
      notificatons: { request: [], like: [], comment: [] }, // request: [{userId, status(accepted, pending, rejected)}], likes: [{postId, userId}], comment: [{postId, userId}]
    }
    const userRef = doc(firestore, "users", user?.uid)
    await updateDoc(userRef, data)
    const docSnap = await getDoc(userRef)
    dispatch(getSingleUser(docSnap?.data()))
    setUser(data)
    toast?.success("Profile created successfully.")
  } catch (error) {
    return errorHandler(error)
  }
}

// handle user sign out
export async function hanldeSignOut(profile) {
  try {
    if (profile === null) {
      return toast?.warn("You are already signed out")
    } else {
      await signOut(firebaseAuth)
    }
    if (profile !== "forced signout") toast?.success("Signed out successfully.")
  } catch (error) {
    return errorHandler(error)
  }
}

// handle create post
export async function handleCreateUserPost(profile, postData) {
  try {
    if (profile === null) {
      return toast?.warn("Please login first")
    }
    let contentData = []
    if (postData?.postData?.length >= 1) {
      if (postData?.postData[0]?.type === "image") {
        contentData = [
          {
            content: await handleUploadImage(
              postData?.postData[0]?.file,
              `posts/images/${Date?.now()}-${postData?.postData[0]?.file}`
            ),
            type: "image",
          },
        ]
      } else {
        contentData = [
          {
            content: await handleUploadVideo(postData?.postData[0]?.file),
            type: "video",
          },
        ]
      }
    }
    const data = {
      userId: profile?.uid,
      content: contentData,
      timeStamp: Date?.now(),
      user: profile?.userName,
      likes: [],
      comments: [],
      description: postData?.desc,
    }
    const res = await addDoc(collection(firestore, "posts"), data)
    const userRef = doc(firestore, "users", profile?.uid)
    await updateDoc(userRef, {
      personalPosts: [...profile?.personalPosts, res?.id],
    })
    const updatedUrls = []
    if (postData?.postData?.length > 1) {
      for (let i = 1; i < postData?.postData?.length; i++) {
        let contentData
        if (postData?.postData[i]?.type === "image") {
          contentData = {
            content: await handleUploadImage(
              postData?.postData[i]?.file,
              `posts/images/${Date?.now()}-${postData?.postData[i]?.file}`
            ),
            type: "image",
          }
        } else {
          contentData = {
            content: await handleUploadVideo(postData?.postData[i]?.file),
            type: "video",
          }
        }
        updatedUrls?.push(contentData)
      }
    }
    const postRef = doc(firestore, "posts", res?.id)
    const postSnap = await getDoc(postRef)
    const snappedPostData = postSnap?.data()
    await updateDoc(postRef, {
      postId: res?.id,
      content: [...snappedPostData?.content, ...updatedUrls],
    })
    return
  } catch (error) {
    return errorHandler(error)
  }
}

// auto signout after 90days
export async function handleAutoSignOut(data) {
  try {
    const lastLoginMonth = new Date(data?.loginAt)
    if (lastLoginMonth?.getMonth() + 3 < new Date(Date?.now())?.getMonth()) {
      const userRef = doc(firestore, "users", data?.uid)
      await updateDoc(userRef, {
        loginAt: Date?.now(),
      })
      await hanldeSignOut("forced signout")
      toast?.info("Session Expired. Login Again")
      setTimeout(() => {
        window?.location?.reload()
      }, 1500)
      return
    }
  } catch (error) {
    return errorHandler(error)
  }
}

// handle userNameExist
export async function handleUserNameExist(value, userNamesArray) {
  try {
    let duplicateUsername = false
    userNamesArray?.forEach((item) => {
      if (item === value) return (duplicateUsername = true)
    })
    return duplicateUsername
  } catch (error) {
    return errorHandler(error)
  }
}

// handle like/unlike post
export async function handleLikeUnlikePost(profile, post) {
  try {
    if (profile === null) {
      return toast?.warn("Please login first")
    }
    const postData = post
    const userData = profile
    const userId = profile?.uid
    const postId = post?.postId
    let alreadyLiked = postData?.likes?.filter((id) => id === userId)
    let postsUpdatedLikesId = []
    let userUpdatedLikesId = []
    if (alreadyLiked?.length) {
      postsUpdatedLikesId = postData?.likes?.filter((id) => id !== userId)
      userUpdatedLikesId = userData?.likedPosts?.filter((id) => id !== postId)
    } else {
      postsUpdatedLikesId =
        postData?.likes?.length > 0 ? [...postData?.likes, userId] : [userId]
      userUpdatedLikesId =
        userData?.likedPosts?.length > 0
          ? [...userData?.likedPosts, postId]
          : [postId]
    }
    const postRef = doc(firestore, "posts", postId)
    const userRef = doc(firestore, "users", userId)
    await updateDoc(postRef, {
      likes: postsUpdatedLikesId,
    })
    await updateDoc(userRef, {
      likedPosts: userUpdatedLikesId,
    })
    return
  } catch (error) {
    console?.log(error)
    return errorHandler(error)
  }
}

// handle save/unsave post
export async function handleSaveUnsavePost(profile, postId) {
  try {
    if (profile === null) {
      return toast?.warn("Please login first")
    }
    let userId = profile?.uid
    const userData = profile
    let alreadySaved = userData?.savedPosts?.filter((id) => id === postId)
    const userRef = doc(firestore, "users", userId)
    let userUpdatedSavedId = []
    if (alreadySaved?.length) {
      userUpdatedSavedId = userData?.savedPosts?.filter((id) => id !== postId)
    } else {
      userUpdatedSavedId =
        userData?.savedPosts?.length > 0
          ? [...userData?.savedPosts, postId]
          : [postId]
    }
    await updateDoc(userRef, {
      savedPosts: userUpdatedSavedId,
    })
    return
  } catch (error) {
    return errorHandler(error)
  }
}

// handle comment on post
export async function handleCommentOnPost(profile, post, comment) {
  try {
    if (profile === null) {
      return toast?.warn("Please login first")
    }

    function df() {
      return String(new Date(Date?.now()))?.split(" ")
    }

    const commentObject = {
      userId: profile?.uid,
      userName: profile?.userName,
      comment,
      id: Date?.now(),
      createdOn: {
        dateString: `${df()[2]} ${df()[1]}, ${df()[3]}`,
        dayString: `${df()[0]}`,
        timeString: `${df()[4]}`,
        timeStamp: Date?.now(),
      },
    }

    const postData = post
    const postsUpdatedComments =
      postData?.comments?.length > 0
        ? [...postData?.comments, commentObject]
        : [commentObject]

    const postRef = doc(firestore, "posts", post?.postId)
    await updateDoc(postRef, {
      comments: postsUpdatedComments,
    })
    return
  } catch (error) {
    return errorHandler(error)
  }
}

// handle delete post
export async function handleDeletePost(profile, post) {
  try {
    if (profile === null) {
      return toast?.warn("Please login first")
    }
    if (profile?.uid !== post?.userId) {
      return toast?.error("You can't delete someone else' post")
    }
    await deleteDoc(doc(firestore, "posts", post?.postId))
    return toast?.success("Post deleted successfully")
  } catch (error) {
    console?.log(error)
    return errorHandler(error)
  }
}

// handle delete comment from post
export async function handleDeleteComment(profile, post, comment) {
  try {
    if (profile === null) {
      return toast?.warn("Please login first")
    }
    if (profile?.uid !== comment?.userId || profile?.uid !== post?.userId) {
      return toast?.error("You can't delete this comment")
    }
    const updatedComments = post?.comments?.filter((c) => c?.id !== comment?.id)

    const postRef = doc(firestore, "posts", post?.postId)
    await updateDoc(postRef, {
      comments: updatedComments,
    })
    return
  } catch (error) {
    return errorHandler(error)
  }
}
