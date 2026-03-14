import React, { useState } from 'react';
import { AUTH_USER_KEY, AuthState } from '../app'; // Use AUTH_USER_KEY and AuthState from app.jsx

const REGISTERED_USER_KEY = 'ctf_registered_user'; // - REGISTERED_USER_KEY stores the saved email + password

// the full login page
export function Login({ userName, authState, onAuthChange }) {
  const [email, setEmail] = useState(''); // track the email input value
  const [password, setPassword] = useState(''); // track the password input value
  const [message, setMessage] = useState(''); // show feedback messages to the user


  // Helper function to make sure email and password input is valid
  const hasValidInput = () => {
    if (!email && !password) {
      setMessage('Email and password are required.');
      return false; // return false if it's invalid
    }
    return true; // return true if it's valid
  };


  // Register function - create account through backend api
  const handleRegister = async () => { // make this async so we can wait for fetch response
    if (!hasValidInput()) {
      return; // if there's no input then don't do anything
    }

    try { // try to call the backend register endpoint
      const response = await fetch('/api/auth/create', { // send registration data to backend
        method: 'POST', // use post because we are creating a new account
        headers: { 'Content-Type': 'application/json' }, // tell backend we are sending json
        body: JSON.stringify({ email, password }), // include email and password in request body
      });

      const result = await response.json(); // parse backend response json

      if (response.status === 201) { // account was created successfully
        setMessage('Registration complete. You can now log in.'); // show success message
      } else if (response.status === 409 || response.status === 400) { // handle duplicate user or bad input
        setMessage(result.message || 'Registration failed.'); // show backend error message when available
      } else { // fallback for any other unexpected status code
        setMessage(result.message || 'Unexpected error during registration.'); // show fallback error message
      }
    } catch (error) { // catch network errors or server connection issues
      setMessage('Unable to reach server. Please try again.'); // tell user the server request failed
    }
  };


  // Login function
  const handleLogin = () => {
    if (!hasValidInput()) {
      return; // if there's no input then don't do anything
    }

    const stored = localStorage.getItem(REGISTERED_USER_KEY); // check saved login info
    if (!stored) { // if the login info isn't there tell the user to register
      setMessage('No account found. Please register first.');
      return;
    }

    const saved = JSON.parse(stored); // convert JSON string back into an object

    if (saved.email === email && saved.password === password) { // compare input to saved data
      setMessage(''); // clear any previous messages after logging in
      localStorage.setItem(AUTH_USER_KEY, email); // store the logged in user for future visits
      onAuthChange(email, AuthState.Authenticated); // update auth state
    } 
    else { // login isn't right
      setMessage('Incorrect email or password.');
    }
  };


  // Logout function
  const handleLogout = () => {
    localStorage.removeItem(AUTH_USER_KEY); // remove the logged in user from storage
    onAuthChange('', AuthState.Unauthenticated); // change the auth state to be logged out
  };

  return (
    <main className="home-main">
        <h1>Login</h1>

        {/* show a welcome message and a logout button when logged in*/}
        {authState === AuthState.Authenticated && ( // only show this block when logged in.
          <div className="auth-panel">
            <p>Logged in as {userName}</p> {/* display the current user name. */}
            <div className="button-row">
              <button type="button" onClick={handleLogout}>Logout</button> {/* logout button */}
            </div>
          </div>
        )}

        {/* show the register and login buttons when logged out */}
        {authState === AuthState.Unauthenticated && ( // only show this when logged out
          <div className="auth-panel">
            <div>
              <input
                type="email"
                placeholder="Email" // the input box shows "email"
                value={email}
                onChange={(event) => setEmail(event.target.value)} // update when the user enters new input
              />
            </div>
            <div>
              <input
                type="password" // password type hides characters.
                placeholder="Password" // the input box shows "password"
                value={password}
                onChange={(event) => setPassword(event.target.value)} // NOTE: Update state when user types.
              />
            </div>
            <div className="button-row">
              <button type="button" onClick={handleLogin}>Login</button> {/* try to login */}
              <button type="button" onClick={handleRegister}>Register</button> {/* save registration */}
            </div>
          </div>
        )}


        {message && <p className="status-message">{message}</p>} {/* show error messages */}
    </main>
  );
}