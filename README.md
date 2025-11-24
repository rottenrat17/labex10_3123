# React Redux and JWT Authentication Demo

A simple React application that demonstrates Redux state management and JWT authentication. This project shows how to use Redux to manage application state and how JWT tokens work for user authentication.

## What This App Does

This is a login application where users can:
- Log in with a username and password
- Get a JWT token that stores their information
- Access a protected dashboard page
- See how Redux manages the application state

## Redux Concepts (0-5)

The app demonstrates all six Redux concepts that your professor asked for:

### 0 - State
State is where all your app's data lives. In this app, the state stores:
- Whether the user is logged in
- The JWT token
- User information (username, email)
- Loading and error messages

You can find the initial state in `src/store/reducers/authReducer.js`.

### 1 - Store
The Store is like a big container that holds all your app's state. It's created in `src/store/index.js` using Redux's `createStore()` function.

### 2 - Reducer
Reducers are functions that decide how the state changes. When something happens (like a user logging in), the reducer updates the state accordingly. The reducer is in `src/store/reducers/authReducer.js`.

For example, when you log in:
- The reducer sets `isLoading: true` while checking credentials
- Then it updates the state with your token and user info
- Or it sets an error if something went wrong

### 3 - Action
Actions are messages that describe what happened. They're simple objects with a `type` (like "LOGIN_SUCCESS") and sometimes data (like the user's token).

Action creators in `src/store/actions/authActions.js` create these actions:
- `loginRequest()` - says "user is trying to log in"
- `loginSuccess()` - says "login worked, here's the token"
- `logout()` - says "user wants to log out"

### 4 - Dispatch
Dispatch is how you send actions to the store. Think of it like sending a message. When you want to log in, you dispatch a login action.

In the code, you'll see:
```javascript
const dispatch = useDispatch();
dispatch(login(username, password));
```

This happens in `Login.js` when you click the login button.

### 5 - Subscribe
Subscribe means components can "listen" to state changes. When the state updates, subscribed components automatically re-render with the new data.

In React, we use `useSelector()` to subscribe:
```javascript
const { isAuthenticated, user } = useSelector((state) => state.auth);
```

This is used in `Login.js`, `Dashboard.js`, and `ProtectedRoute.js` to watch for authentication changes.

## JWT (JSON Web Token)

JWT is a way to securely store user information. When you log in, the app creates a token that contains:
- Your username
- Your email
- When the token was created
- When it expires (24 hours later)

The token has three parts separated by dots: `Header.Payload.Signature`

In this demo app:
- Tokens are created when you log in
- They're stored in your browser's localStorage
- The app reads the token to show your information on the dashboard
- When you log out, the token is removed

All JWT functions are in `src/utils/jwtUtils.js`.

## How to Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the app:
   ```bash
   npm start
   ```

3. Open your browser to `http://localhost:3000`

4. Try logging in:
   - Enter any username and password (it's a demo, so anything works)
   - Click Login
   - You'll see the dashboard with your info and Redux explanations

## Project Structure

```
src/
├── components/
│   ├── Login.js           # Login page
│   ├── Dashboard.js       # Protected dashboard
│   └── ProtectedRoute.js  # Route protection
├── store/
│   ├── actions/
│   │   └── authActions.js  # Action creators
│   ├── reducers/
│   │   └── authReducer.js # State updates
│   └── index.js           # Store setup
├── utils/
│   └── jwtUtils.js        # JWT functions
└── App.js                 # Main app
```

## How It Works

1. **Login Flow**:
   - You enter username/password and click Login
   - App dispatches a login action
   - Reducer updates state to show "loading"
   - A JWT token is created and saved
   - Reducer updates state with token and user info
   - You're redirected to the dashboard

2. **Protected Routes**:
   - The dashboard checks if you're logged in
   - If not, you're sent back to login
   - If yes, you see the dashboard

3. **Logout**:
   - Click logout button
   - Token is removed
   - State is cleared
   - You're sent back to login

## Technologies Used

- React - for building the UI
- Redux - for state management
- React-Redux - to connect React and Redux
- Redux Thunk - for handling async actions
- React Router - for navigation

## Important Notes

This is a demo app for learning purposes. In a real application:
- JWT tokens should be created by a secure backend server
- Passwords should be validated against a database
- Tokens should be verified on the server for each request
- Consider using httpOnly cookies instead of localStorage for better security

## What You'll Learn

After exploring this app, you'll understand:
- How Redux manages state in React apps
- How all six Redux concepts work together
- How JWT authentication works
- How to protect routes based on login status
- How to use Redux hooks (useSelector, useDispatch)

---

**Created for Lab Exercise 10**
