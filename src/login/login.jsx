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


  // Login function - authenticate through backend api
  const handleLogin = async () => { // make this async so we can wait for backend login response
    if (!hasValidInput()) {
      return; // if there's no input then don't do anything
    }

    try { // try to call backend login endpoint
      const response = await fetch('/api/auth/login', { // send credentials to backend for verification
        method: 'POST', // use post because login submits credentials
        headers: { 'Content-Type': 'application/json' }, // tell backend the request body is json
        body: JSON.stringify({ email, password }), // include email and password in login request
      });

      const result = await response.json(); // parse backend response json

      if (response.status === 200) { // login succeeded on backend
        setMessage(''); // clear any previous login error messages
        localStorage.setItem(AUTH_USER_KEY, email); // keep user email locally to maintain login state on refresh
        onAuthChange(email, AuthState.Authenticated); // update app auth state to logged in
      } 
      else if (response.status === 401 || response.status === 400) { // handle bad credentials or missing input
        setMessage(result.message || 'Incorrect email or password.'); // show backend login error message
      } 
      else { // fallback for any unexpected status code
        setMessage(result.message || 'Unexpected error during login.'); // show fallback login error
      }
    } 
    catch (error) { // catch network errors when backend cannot be reached
      setMessage('Unable to reach server. Please try again.'); // tell user server request failed
    }
  };


  // Logout function - end backend session and clear local auth state
  const handleLogout = async () => { // make this async so we can wait for backend logout response
    try { // try to call backend logout endpoint
      await fetch('/api/auth/logout', { method: 'DELETE' }); // ask backend to delete the current auth session
    } 
    catch (error) { // even if backend call fails we still clear local ui auth state no-op on purpose
    }

    localStorage.removeItem(AUTH_USER_KEY); // remove the logged in user from local storage
    onAuthChange('', AuthState.Unauthenticated); // update app auth state to logged out
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