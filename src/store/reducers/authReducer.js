// This reducer handles all authentication state changes
import { AUTH_ACTIONS, USER_ACTIONS } from '../types';

// Initial state - this is where all our app data starts (0 - State)
const initialState = {
  isAuthenticated: false,
  isLoading: false,
  token: null,
  user: null,
  error: null
};

// Reducer function - decides how state changes when actions happen (2 - Reducer)
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
        error: null
      };

    case AUTH_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        token: null,
        user: null,
        error: action.payload
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
        error: null
      };

    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    case USER_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload
      };

    case USER_ACTIONS.CLEAR_USER:
      return {
        ...state,
        user: null
      };

    default:
      return state;
  }
};

export default authReducer;

