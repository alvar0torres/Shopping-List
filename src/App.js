import { useSelector } from "react-redux";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Input from "./components/main/Input";
import List from "./components/main/List";
import Backdrop from "./components/UI/Backdrop";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { listActions } from "./store/listSlice";
import { authActions } from "./store/auth-context";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();

  const [signupShow, setSignupShow] = useState(false);
  const [loginShow, setLoginShow] = useState(false);

  const closeModalHandler = () => {
    setSignupShow(false);
    setLoginShow(false);
  };

  const testSign = signupShow && !isLoggedIn;
  const testLogin = loginShow && !isLoggedIn;

  //////////////////AUTO-LOGOUT///////////////////////////////

  const calculateRemainingTime = () => {
    const currentTime = Date.now();
    const expirationTime = localStorage.getItem("expiration");
    const remainingTime = expirationTime - currentTime;

    console.log(remainingTime + " milliseconds to Logout...");

    return remainingTime;
  };

  setTimeout(() => {
    dispatch(authActions.logout());
  }, calculateRemainingTime());

  ///////////////////////////////////////////////////////////

  useEffect(() => {
    fetch(
      "https://shopping-list-f3bcd-default-rtdb.europe-west1.firebasedatabase.app/list.json"
    )
      .then((response) => response.json())
      .then((data) => {
        let localList = [];

        if (data != null) {
          for (const value of Object.values(data)) {
            if (value.userId === userId) {
              localList.push({ text: value.text, id: value.id });
            }
          }
        }

        dispatch(listActions.toggleList(localList));
      });
  }, [dispatch, userId]);

  return (
    <div className="App">
      {testLogin && <Login />}
      {testSign && <SignUp />}
      {(testLogin || testSign) && <Backdrop close={closeModalHandler} />}
      <Navbar
        isLoggedIn={isLoggedIn}
        setLogin={setLoginShow}
        setSignup={setSignupShow}
      />
      {isLoggedIn && <Input />}
      {isLoggedIn && <List />}
      {!isLoggedIn && <h1>You need to Login to see the list</h1>}
    </div>
  );
}

export default App;
