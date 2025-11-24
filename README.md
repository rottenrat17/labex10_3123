# React Redux and JWT Authentication Demo

A simple React app that demonstrates Redux state management and JWT authentication. Users can log in, get a JWT token, and access a protected dashboard.

## Redux Concepts (0-5)

This app demonstrates all six Redux concepts:

**0 - State**: The app's data (user info, login status, token). Defined in `src/store/reducers/authReducer.js`.

**1 - Store**: The central place that holds all state. Created in `src/store/index.js`.

**2 - Reducer**: Functions that update state when actions happen. See `src/store/reducers/authReducer.js`.

**3 - Action**: Objects that describe what happened (like "user logged in"). Created in `src/store/actions/authActions.js`.

**4 - Dispatch**: How you send actions to the store. Used in components with `useDispatch()` hook.

**5 - Subscribe**: How components listen to state changes. Used with `useSelector()` hook in Login.js, Dashboard.js, and ProtectedRoute.js.

## JWT Authentication

JWT tokens store user information securely. When you log in, the app creates a token with your username, email, and expiration time. The token format is `Header.Payload.Signature` and is stored in localStorage. JWT functions are in `src/utils/jwtUtils.js`.

## How to Run

```bash
npm install
npm start
```

Open `http://localhost:3000` and log in with any username and password (demo mode).

## Project Structure

- `src/components/` - Login, Dashboard, and ProtectedRoute components
- `src/store/` - Redux store, actions, and reducers
- `src/utils/` - JWT utility functions

## Technologies

React, Redux, React-Redux, Redux Thunk, React Router

---

**Lab Exercise 10**
