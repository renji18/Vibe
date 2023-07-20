import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { handleAuthStateChange } from "./utility";
import { firebaseAuth, firestore } from "./config";
import {
  commentOnPost,
  createUserPost,
  deletePost,
  deletePostComment,
  getAllPosts,
  getSingleUser,
  getUserNamesData,
  likePost,
  registerLoginSignOutUser,
  savePost,
  saveUserData,
} from "../redux/actions";
import { collection, onSnapshot, query, where } from "firebase/firestore";

// firebase context
const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

// react component for firebase providation
export const FirebaseProvider = (props) => {
  const dispatch = useDispatch();
  const { profile, userNames } = useSelector((state) => state?.userData);

  // states
  const [user, setUser] = useState(null);

  // useEffect to catch logins, registrations and logouts
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (data) =>
      handleAuthStateChange(data, dispatch, setUser)
    );
  }, [dispatch]);

  // useEffect to catch changes in posts
  useEffect(() => {
    const postChanges = onSnapshot(collection(firestore, "posts"), (coll) => {
      let posts = [];
      coll.docs.forEach((doc) => {
        posts.push(doc.data());
      });
      dispatch(getAllPosts(posts));
    });

    return () => postChanges();
  }, [dispatch]);

  // states and useEffects to catch new logins
  const [newUserRegistered, setNewUserRegistered] = useState(null);
  const [newUserRegisteredController, setNewUserRegisteredController] =
    useState(false);
  useEffect(() => {
    const queryRef = query(collection(firestore, "users"));
    const userAdded = onSnapshot(queryRef, (snap) => {
      snap.docChanges().forEach((change) => {
        if (change.type === "added") {
          setNewUserRegistered(change.doc.data().uid);
          setNewUserRegisteredController(true);
        }
      });
    });

    return () => userAdded();
  }, [dispatch]);
  useEffect(() => {
    let userNameChanges;
    if (newUserRegistered && newUserRegisteredController) {
      const queryRef = query(
        collection(firestore, "users"),
        where("uid", "==", newUserRegistered)
      );
      const handleSnapshot = (snap) => {
        snap.docChanges().forEach((change) => {
          if (change.type === "modified") {
            let modifiedUserNamesArray = Array.from(userNames);
            modifiedUserNamesArray.push(change.doc.data().userName);
            setNewUserRegistered(null);
            setNewUserRegisteredController(false);
            dispatch(getUserNamesData(modifiedUserNamesArray));
          }
        });
      };
      userNameChanges = onSnapshot(queryRef, handleSnapshot);
    }

    return () => {
      if (userNameChanges) {
        userNameChanges();
      }
    };
  }, [newUserRegistered, newUserRegisteredController, dispatch, userNames]);

  // useEffect to catch changes in the logged in users data
  useEffect(() => {
    let profileChanges;

    if (profile) {
      const queryRef = query(
        collection(firestore, "users"),
        where("uid", "==", profile?.uid)
      );
      const handleSnapshot = (snap) => {
        snap.docChanges().forEach((change) => {
          if (change.type === "modified") {
            dispatch(getSingleUser(change.doc.data()));
          }
        });
      };
      profileChanges = onSnapshot(queryRef, handleSnapshot);
    }

    return () => {
      if (profileChanges) {
        profileChanges();
      }
    };
  }, [dispatch, profile]);

  // registration
  const signUpUserUsingEmailAndPassword = async (email, password) => {
    dispatch(registerLoginSignOutUser("register", profile, email, password));
  };

  // sign in email/pw
  const signInUserUsingEmailAndPassword = async (email, password) => {
    dispatch(
      registerLoginSignOutUser("login", profile, email, password, dispatch)
    );
  };

  // saving user data on registration
  const saveUserDataOnRegistration = async (userData) => {
    dispatch(saveUserData(profile, userData, user, dispatch, setUser));
  };

  // signout
  const signOutUser = async () => {
    dispatch(registerLoginSignOutUser("signout", profile));
  };

  // upload user post
  const createUserPostHandler = async (postData) => {
    dispatch(createUserPost(profile, postData));
  };

  // comment on post
  const commentOnPostHandler = async (post, comment) => {
    dispatch(commentOnPost(profile, post, comment));
  };

  // save post
  const savePostHandler = async (postId) => {
    dispatch(savePost(profile, postId));
  };

  // like post
  const likePostHandler = async (post) => {
    dispatch(likePost(profile, post));
  };

  // delete post
  const deletePostHandler = async (post) => {
    dispatch(deletePost(profile, post));
  };

  // delete post comment
  const deletePostCommentHandler = async (post, comment) => {
    dispatch(deletePostComment(profile, post, comment));
  };

  return (
    <FirebaseContext.Provider
      value={{
        signUpUserUsingEmailAndPassword,
        signInUserUsingEmailAndPassword,
        saveUserDataOnRegistration,
        signOutUser,
        createUserPostHandler,
        commentOnPostHandler,
        savePostHandler,
        likePostHandler,
        deletePostHandler,
        deletePostCommentHandler,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
