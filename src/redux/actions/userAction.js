import axios from "axios";

import { firebaseApp } from "../../firebase/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
const db = firebase.firestore(firebaseApp);
console.log("db============", db.collection('userInfo'))
//get speciality data
export const USER_LOGIN_START = "USER_LOGIN_START";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAIL = "USER_LOGIN_FAIL";

export const USER_SIGNUP_START = "USER_SIGNUP_START";
export const USER_SIGNUP_SUCCESS = "USER_SIGNUP_SUCCESS";
export const USER_SIGNUP_FAIL = " USER_SIGNUP_FAIL";

// get speciality methods
const userLoginStart = () => ({
  type: USER_LOGIN_START
});

const userLoginSuccess = payload => ({
  type: USER_LOGIN_SUCCESS ,
  payload
});

const userLoginFail = () => ({
  type: USER_LOGIN_FAIL
});


export const loginUser = (userinfo) => {
  console.log('login')
    const { email, password } = userinfo;
    return async (dispatch) => {
      dispatch(userLoginStart());
      try {
        let userObj = await firebaseApp
          .auth()
          .signInWithEmailAndPassword(email, password);
        dispatch(userLoginSuccess(userObj));
      } catch (err) {
        // console.log(err.message);
        dispatch(userLoginFail(err.message));
        // TypeError: failed to fetch
      }
    };
  };

  const userSignUpStart = () => ({
    type: USER_SIGNUP_START
  });
  
  const userSignUpSuccess = payload => ({
    type: USER_SIGNUP_SUCCESS,
    payload
  });
  
  const userSignupFail = () => ({
    type: USER_SIGNUP_FAIL
  });
  export const registerUser = (userinfo) => {
    const { email, password, firstname, lastname, usertype } = userinfo;
  
    return async (dispatch) => {
      dispatch(userSignUpStart());
      try {
        let userObj = await firebaseApp
          .auth()
          .createUserWithEmailAndPassword(email, password);
        let user = userObj.user;
    //   let userToken = await user.getIdToken();
        await db.collection("storeuser")
        .add({userId: user.uid,firstname,lastname,usertype})
        .then((res) => {
           console.log("test==========", res);     
        })
      } catch (err) {
        //console.log(err.message);
        dispatch(userSignupFail(err.message));
        // TypeError: failed to fetch
      }
    };
  };