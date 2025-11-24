import { AUTH_ACTIONS, USER_ACTIONS } from '../types';
import { decodeToken, storeToken, removeToken, getToken } from '../../utils/jwtUtils';

// Action creators - these create the action objects (3 - Action)
export const loginRequest = () => ({
  type: AUTH_ACTIONS.LOGIN_REQUEST
});

export const loginSuccess = (token, user) => ({
  type: AUTH_ACTIONS.LOGIN_SUCCESS,
  payload: { token, user }
});

export const loginFailure = (error) => ({
  type: AUTH_ACTIONS.LOGIN_FAILURE,
  payload: error
});

export const logout = () => ({
  type: AUTH_ACTIONS.LOGOUT
});

export const clearError = () => ({
  type: AUTH_ACTIONS.CLEAR_ERROR
});

export const setUser = (user) => ({
  type: USER_ACTIONS.SET_USER,
  payload: user
});

export const clearUser = () => ({
  type: USER_ACTIONS.CLEAR_USER
});

// Login function - handles the login process using Redux Thunk
export const login = (username, password) => {
  return (dispatch) => {
    // Tell the store that login is starting (4 - Dispatch)
    dispatch(loginRequest());

    // Simulate checking credentials (in a real app, this would call an API)
    setTimeout(() => {
      if (username && password) {
        // Create a JWT token with user info
        const mockToken = createMockJWT(username);
        
        // Get user info from the token
        const user = decodeToken(mockToken);
        
        // Save token to browser storage
        storeToken(mockToken);
        
        // Tell the store login was successful (4 - Dispatch)
        dispatch(loginSuccess(mockToken, user));
        dispatch(setUser(user));
      } else {
        dispatch(loginFailure('Username and password are required'));
      }
    }, 1000);
  };
};

// Logout function - removes token and clears user state
export const logoutUser = () => {
  return (dispatch) => {
    removeToken();
    dispatch(logout());
    dispatch(clearUser());
  };
};

// Check if user is already logged in when app starts
export const initializeAuth = () => {
  return (dispatch) => {
    const token = getToken();
    if (token) {
      try {
        // If token exists and is valid, restore user session
        const user = decodeToken(token);
        dispatch(loginSuccess(token, user));
        dispatch(setUser(user));
      } catch (error) {
        // Token is expired or invalid, remove it
        removeToken();
        dispatch(logout());
      }
    }
  };
};

// Helper function to create a JWT token
// Note: In a real app, tokens should be created by a secure backend server
function createMockJWT(username) {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  const payload = {
    sub: username,
    username: username,
    email: `${username}@example.com`,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // Token expires in 24 hours
  };

  // Encode header and payload as base64 strings
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));
  
  // Create a mock signature (in production, this would be cryptographically signed)
  const signature = btoa('mock-signature');
  
  // JWT format: Header.Payload.Signature
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

