import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../store/actions/authActions';
import { getTokenExpiration } from '../utils/jwtUtils';
import './Dashboard.css';

const Dashboard = () => {
  // Subscribe to Redux state to get user and token info (5 - Subscribe)
  const { user, token } = useSelector((state) => state.auth);
  
  // Get dispatch function to send actions (4 - Dispatch)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Send logout action to Redux store (4 - Dispatch)
    dispatch(logoutUser());
    navigate('/');
  };

  const tokenExpiration = token ? getTokenExpiration(token) : null;

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>Welcome to Dashboard!</h1>
        
        <div className="user-info">
          <h2>User Information</h2>
          <div className="info-item">
            <strong>Username:</strong> {user?.username || 'N/A'}
          </div>
          <div className="info-item">
            <strong>Email:</strong> {user?.email || 'N/A'}
          </div>
          <div className="info-item">
            <strong>User ID:</strong> {user?.sub || 'N/A'}
          </div>
          {tokenExpiration && (
            <div className="info-item">
              <strong>Token Expires:</strong> {tokenExpiration.toLocaleString()}
            </div>
          )}
        </div>

        <div className="redux-info">
          <h2>Redux State Information</h2>
          <div className="redux-concepts">
            <div className="concept-item">
              <h3>0 - State</h3>
              <p>The current state is stored in the Redux store. Current auth state:</p>
              <pre>{JSON.stringify({ isAuthenticated: true, user: user }, null, 2)}</pre>
            </div>
            
            <div className="concept-item">
              <h3>1 - Store</h3>
              <p>The Redux store holds the entire application state. It's created using createStore() and configured in src/store/index.js</p>
            </div>
            
            <div className="concept-item">
              <h3>2 - Reducer</h3>
              <p>Reducers are pure functions that specify how the state changes in response to actions. See src/store/reducers/authReducer.js</p>
            </div>
            
            <div className="concept-item">
              <h3>3 - Action</h3>
              <p>Actions are plain JavaScript objects that describe what happened. They're created by action creators in src/store/actions/authActions.js</p>
            </div>
            
            <div className="concept-item">
              <h3>4 - Dispatch</h3>
              <p>Dispatch is used to send actions to the store. We use useDispatch() hook to get the dispatch function and dispatch actions like login() and logoutUser()</p>
            </div>
            
            <div className="concept-item">
              <h3>5 - Subscribe</h3>
              <p>Subscribe allows components to listen to state changes. We use useSelector() hook to subscribe to specific parts of the Redux state.</p>
            </div>
          </div>
        </div>

        <div className="jwt-info">
          <h2>JWT Token Information</h2>
          <p>JSON Web Token (JWT) is used for authentication. The token is stored in localStorage and contains user information.</p>
          <div className="token-display">
            <strong>Token (first 50 chars):</strong> {token ? `${token.substring(0, 50)}...` : 'No token'}
          </div>
          <p className="jwt-explanation">
            JWT consists of three parts separated by dots: Header.Payload.Signature
          </p>
        </div>

        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

