import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  db,
  usersCollectionRef,
  auth,
  signInWithGoogle,
  getIdToken,
} from "./firebase-config";
import App from "../App";
import { getAllUser } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const InitializeApp = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  const userData = useSelector(state => state.userData)

  console.log(userData);

  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user, "user");
      // setUser(user);
      if (user) {
        // dispatch(toggleMainLoader(true));
        getIdToken();
      } else {
        signInWithEmailAndPassword();
      }
    });
  }, []);

  
  useEffect(() => {
    dispatch(getAllUser(users));
  }, [dispatch, users]);

  // queries
  const q = query(usersCollectionRef, orderBy("name", "asc"));

  // onSnapshot(usersCollectionRef, (data) => {
  //   setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  // });

  const createUser = async () => {
    await addDoc(usersCollectionRef, {
      name,
      age: Number(age),
    });
    // getUsers();
  };

  const updateUser = async (id, age) => {
    const newFields = { age: age + 1 };
    const userDoc = doc(db, "users", id);
    await updateDoc(userDoc, newFields);
    // getUsers();
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    // getUsers();
  };

  // EMAIL
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPw, setRegisterPw] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPw, setLoginPw] = useState("");
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currUser) => {
    setUser(currUser);
  });

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPw
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPw);
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  // GMAIL

  return <App />;
};

export default InitializeApp;
