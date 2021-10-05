// import axios from "axios";

// import { firebaseApp } from "../../firebase/Firebase";
// import firebase from "firebase/app";
// import "firebase/firestore";
// import "firebase/auth";
// const db = firebase.firestore(firebaseApp);
// //get speciality data
// export const USER_LOGIN_START = "USER_LOGIN_START";
// export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
// export const USER_LOGIN_FAIL = "USER_LOGIN_FAIL";

// export const USER_SIGNUP_START = "USER_SIGNUP_START";
// export const USER_SIGNUP_SUCCESS = "USER_SIGNUP_SUCCESS";
// export const USER_SIGNUP_FAIL = " USER_SIGNUP_FAIL";

// // get speciality methods
// const userLoginStart = () => ({
//   type: USER_LOGIN_START
// });

// const userLoginSuccess = payload => ({
//   type: USER_LOGIN_SUCCESS ,
//   payload
// });

// const userLoginFail = () => ({
//   type: USER_LOGIN_FAIL
// });


// export const loginUser = (userinfo) => {
//     const { email, password } = userinfo;
//     return async (dispatch) => {
//       dispatch(userLoginStart());
//       try {
//         let userObj = await firebaseApp.auth().signInWithEmailAndPassword(email, password);
//         if(userObj) {
//           let user = userObj.user;
//           let userToken = await user.getIdToken();
//           localStorage.setItem("token", userToken);
//           localStorage.setItem("userId", user.uid);

//           db.collection("storeuser")
//           .where("userId", "==",user.uid)
//           .get()
//           .then((querySnapshot) => {
//             const list = {
//               ...querySnapshot.docs[0].data(),
//             };
//             console.log('listdata=====', list)
//             let userData = {
//               userObj,
//               list
//             }
//             dispatch(userLoginSuccess(userData));
//           })

       
//         }
//       } catch (err) {
//         // console.log(err.message);
//         dispatch(userLoginFail(err.message));
//         // TypeError: failed to fetch
//       }
//     };
//   };

//   const userSignUpStart = () => ({
//     type: USER_SIGNUP_START
//   });
  
//   const userSignUpSuccess = payload => ({
//     type: USER_SIGNUP_SUCCESS,
//     payload
//   });
  

//   const userSignupFail = () => ({
//     type: USER_SIGNUP_FAIL
//   });
//   export const registerUser = (userinfo) => {
//     const { email, password, firstname, lastname, usertype } = userinfo;
  
//     return async (dispatch) => {
//       dispatch(userSignUpStart());
//       try {
//         let userObj = await firebaseApp
//           .auth()
//           .createUserWithEmailAndPassword(email, password);
//         let user = userObj.user;
//         let userToken = await user.getIdToken();

//         localStorage.setItem("token", userToken);
//         localStorage.setItem("userId", user.uid);

//         await db.collection("storeuser")
//         .add({userId: user.uid,firstname,lastname,usertype})
//         .then((res) => {
//            console.log("test==========", res);     
//         })
//         dispatch(userSignUpSuccess(userObj));

//       } catch (err) {
//         //console.log(err.message);
//         dispatch(userSignupFail(err.message));
//         // TypeError: failed to fetch
//       }
//     };
//   };


import { firebaseApp } from "../../firebase/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import * as actionTypes from "./actionTypes";
const db = firebase.firestore(firebaseApp);

export const registerUser = (userinfo) => {
    const { email, password, firstname, lastname, usertype } = userinfo;

  return async (dispatch) => {
    dispatch(userSignupStart());
    try {
      let userCredential = await firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email, password);
      let user = userCredential.user;
      let userToken = await user.getIdToken();

      await db.collection("storeuser")
        .add({userId: user.uid,firstname,lastname,usertype})
        .then((res) => {
           console.log("test==========", res);     
        })
      dispatch(userLoginSuccess(userToken, user.uid, usertype));
    } catch (err) {
      //console.log(err.message);
      dispatch(userSignupFail(err.message));
      // TypeError: failed to fetch
    }
  };
};

export const userSignupInit = () => {
  return {
    type: actionTypes.USER_SIGNUP_INIT,
  };
};

export const userSignupStart = () => {
  return {
    type: actionTypes.USER_SIGNUP_START,
  };
};

export const userSignupFail = (error) => {
  return {
    type: actionTypes.USER_SIGNUP_FAIL,
    error: error,
  };
};

export const userSignupSuccess = () => {
  return {
    type: actionTypes.USER_SIGNUP_SUCCESS,
    path: "/signin",
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const userLoginStart = () => {
  return {
    type: actionTypes.USER_LOGIN_START,
  };
};

export const userLoginFail = (error) => {
  return {
    type: actionTypes.USER_LOGIN_FAIL,
    error: error,
  };
};

export const userLoginSuccess = (token, userId, usertype) => {
  localStorage.setItem("token", token);
  localStorage.setItem("userId", userId);
  console.log('usertype action', usertype)
  let path;
  if(usertype === "seller") {
    path = '/admin/booklist'
  } else if(usertype === "admin") {
    path = '/admin/booklist'
  }
  return {
    type: actionTypes.USER_LOGIN_SUCCESS,
    path: path,
    idToken: token,
    userId: userId,
    usertype: usertype
  };
};

export const loginUser = (userinfo) => {
  const { email, password } = userinfo;
  return async (dispatch) => {
    dispatch(userLoginStart());
    try {
      let userObj = await firebaseApp
        .auth()
        .signInWithEmailAndPassword(email, password);
      let user = userObj.user;
      let userToken = await user.getIdToken();
      db.collection("storeuser")
      .where("userId", "==",user.uid)
      .get()
      .then((querySnapshot) => {
        const list = {
          ...querySnapshot.docs[0].data(),
        };
        console.log('listdata=====', list)
      dispatch(userLoginSuccess(userToken, user.uid, list.usertype ));
  })
    //  dispatch(userLoginSuccess(userToken, user.uid));
    } catch (err) {
      // console.log(err.message);
      dispatch(userLoginFail(err.message));
      // TypeError: failed to fetch
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(logoutStart());
    firebaseApp
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        dispatch(logoutSuccess());
      })
      .catch((error) => {
        // An error happened.
        dispatch(logoutFail(error.message));
      });
  };
};

const logoutStart = () => {
  return {
    type: actionTypes.LOGOUT_START,
  };
};
const logoutFail = () => {
  return {
    type: actionTypes.LOGOUT_FAIL,
  };
};

const logoutSuccess = () => {
  return {
    type: actionTypes.LOGOUT,
    path: "/",
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logoutSuccess());
    } else {
      const userId = localStorage.getItem("userId");
      dispatch(userLoginSuccess(token, userId));
    }
  };
};

export const initLogin = () => {
  return {
    type: actionTypes.LOGIN_INIT,
  };
};
