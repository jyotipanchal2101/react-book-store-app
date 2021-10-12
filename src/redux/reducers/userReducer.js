import * as actionTypes from "../actions/actionTypes";

const initialState = {
  error: null,
  authRedirectPath: "/",
  loading: false,
  isSignUpSucess: false,
  isLoginSuccess: false,
  isLoggedIn:false,
  token: null,
  userId: null,
  list:[]
};

const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};
const signupStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};
const signupInit = (state, action) => {
  return updateObject(state, { error: null, loading: false });
};

const signupSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    isSignUpSucess: true,
    authRedirectPath: action.path,
  });
};

const signupFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    isSignUpSucess: false,
  });
};
const loginStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const loginSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    isLoginSuccess: true,
    isLoggedIn:true,
    authRedirectPath: action.path,
    token: action.idToken,
    userId: action.userId,
    usertype: action.usertype
  });
};

const loginFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    isLoginSuccess: false,
  });
};

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path });
};
const logout = (state, action) => {
  return updateObject(state, {
    error: null,
    authRedirectPath: action.path,
    loading: false,
    isSignUpSucess: false,
    isLoginSuccess: false,
    isLoggedIn:false,
    token: null,
    userId: null,
  });
};

const logoutStart = (state, action) => {
  return updateObject(state, {
    error: null,
    authRedirectPath: action.path,
    loading: true,
    isSignUpSucess: false,
    isLoginSuccess: false,
    token: null,
    userId: null,
  });
};

const logoutFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    authRedirectPath: action.path,
    loading: true,
    isSignUpSucess: false,
    isLoginSuccess: false,
    token: null,
    userId: null,
  });
};
const loginInit = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    isSignUpSucess: false,
  });
};

const userListSuccess = (state, action) => {
  return updateObject(state, {
    list: action.list,
    loading: false,
  });
};
const userListStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};
const userListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_SIGNUP_INIT:
      return signupInit(state, action);
    case actionTypes.USER_SIGNUP_START:
      return signupStart(state, action);
    case actionTypes.USER_SIGNUP_SUCCESS:
      return signupSuccess(state, action);
    case actionTypes.USER_SIGNUP_FAIL:
      return signupFail(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    case actionTypes.USER_LOGIN_START:
      return loginStart(state, action);
    case actionTypes.USER_LOGIN_SUCCESS:
      return loginSuccess(state, action);
    case actionTypes.USER_LOGIN_FAIL:
      return loginFail(state, action);
    case actionTypes.LOGOUT_START:
      return logoutStart(state, action);
    case actionTypes.LOGOUT:
      return logout(state, action);
    case actionTypes.LOGOUT_FAIL:
      return logoutFail(state, action);
    case actionTypes.LOGIN_INIT:
      return loginInit(state, action);
    case actionTypes.USER_LIST_SUCCESS:
      return userListSuccess(state, action);
    case actionTypes.USER_LIST_START:
      return userListStart(state, action);
    case actionTypes.USER_LIST_FAIL:
      return userListFail(state, action);

    default:
      return state;
  }
};

export default userReducer;
