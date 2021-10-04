import {
  USER_LOGIN_START,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_SIGNUP_START,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
} from "../actions/userAction";

const initialState = {
  isLoading: false,
  isFailure: false,
  users: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_START:
      return {
        ...state,
        isLoading: true,
        isFailure: false,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isFailure: false,
        users: action.payload,
      };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        isFailure: true,
      };
    case USER_SIGNUP_START:
      return {
        ...state,
        isLoading: true,
        isFailure: false,
      };
    case USER_SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isFailure: false,
        users: action.payload,
      };
    case USER_SIGNUP_FAIL:
      return {
        ...state,
        isLoading: false,
        isFailure: true,
      };

    default:
      return state;
  }
};

export default userReducer;
