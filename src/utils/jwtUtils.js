// Helper functions for working with JWT tokens
const TOKEN_KEY = 'jwt_token';

// Save token to browser storage
export const storeToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Get token from browser storage
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Remove token from browser storage
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// Decode JWT token to get user information
export const decodeToken = (token) => {
  try {
    // JWT has three parts: Header.Payload.Signature
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }
    
    // Decode the payload (middle part) which contains user data
    const payload = JSON.parse(atob(parts[1]));
    
    // Check if token has expired
    if (payload.exp && payload.exp < Date.now() / 1000) {
      throw new Error('Token expired');
    }
    
    return payload;
  } catch (error) {
    console.error('Error decoding token:', error);
    throw error;
  }
};

// Check if a token is still valid
export const isTokenValid = (token) => {
  try {
    const decoded = decodeToken(token);
    return decoded && decoded.exp > Date.now() / 1000;
  } catch (error) {
    return false;
  }
};

// Get when the token expires
export const getTokenExpiration = (token) => {
  try {
    const decoded = decodeToken(token);
    return decoded.exp ? new Date(decoded.exp * 1000) : null;
  } catch (error) {
    return null;
  }
};

