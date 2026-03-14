import React, { useEffect, useState } from 'react'; // NOTE: Pull in React plus the hooks we use for state and lifecycle.
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Game } from './game/game';
import { Leaderboard } from './leaderboard/leaderboard';
import { Instructions } from './instructions/instructions';

// make an authentication function for other places to use
const AuthState = { 
  Unknown: 'unknown', // unknown means we have not checked storage yet
  Authenticated: 'authenticated', // the user is logged in
  Unauthenticated: 'unauthenticated', // the user is logged out
};

const AUTH_USER_KEY = 'ctf_auth_user'; // localStorage key for the logged-in username.

// main function that controls auth state and routing.
export default function App() {
  const [userName, setUserName] = useState(''); // track the current email.
  const [authState, setAuthState] = useState(AuthState.Unknown); // track authentication status.


  // keep login even if the user refreshes
  useEffect(() => {
    const checkStoredLogin = async () => { // run async startup check for stored login
      const storedUser = localStorage.getItem(AUTH_USER_KEY); // read the saved user from localStorage

      if (!storedUser) { // no stored user means we are logged out
        setAuthState(AuthState.Unauthenticated); // mark the user as unauthenticated
        return;
      }

      try { // try verifying stored user against auth state
        const response = await fetch(`/api/user/${encodeURIComponent(storedUser)}`); // ask backend if this stored user is authenticated

        if (!response.ok) { // if backend lookup failed, clear local login state
          localStorage.removeItem(AUTH_USER_KEY); // remove invalid saved user from localStorage
          setUserName(''); // clear user name in app state
          setAuthState(AuthState.Unauthenticated); // mark user as logged out
          return;
        }

        const result = await response.json(); // parse backend user lookup response

        if (result.authenticated) { // backend confirmed this user session is authenticated
          setUserName(storedUser); // keep stored user in app state
          setAuthState(AuthState.Authenticated); // mark user as authenticated
        } 
        else { // backend says user is not authenticated anymore
          localStorage.removeItem(AUTH_USER_KEY); // clear stale saved login from localStorage
          setUserName(''); // clear user name in app state
          setAuthState(AuthState.Unauthenticated); // mark user as logged out
        }
      } 
      catch (error) { // catch network/server errors during auth verification
        localStorage.removeItem(AUTH_USER_KEY); // clear saved login if verification cannot be completed
        setUserName(''); // clear user name in app state
        setAuthState(AuthState.Unauthenticated); // default to logged out for safety
      }
    };
    checkStoredLogin(); // run auth verification on initial app load
  }, []);

  return (
    <BrowserRouter>
      <div className="page-wrapper text-center">
        <header>
          <h1>Catch The Fish</h1>
          <nav>
            <ul>
              <li><NavLink to="/">Home</NavLink></li>
              {/* don't show the game tab if not logged in */}
              {authState === AuthState.Authenticated && ( // render the Game link only when logged in
                <li><NavLink to="/game">Game</NavLink></li>
              )}
              <li><NavLink to="/instructions">Instructions</NavLink></li>
              <li><NavLink to="/leaderboard">Leaderboard</NavLink></li>
            </ul>
          </nav>
        </header>


        <Routes>
          <Route
            path="/"
            element={
              // give login the current authentication data
              <Login
                userName={userName} // pass the current user name down to Login
                authState={authState} // pass the current auth state down to Login
                onAuthChange={(nextUserName, nextAuthState) => { // update App state
                  setAuthState(nextAuthState); // update auth state in App when Login changes it
                  setUserName(nextUserName); // update user name in App when Login changes it
                }}
              />
            }
          />
          <Route path="/game" element = {<Game userName={userName} />}/> {/* give the game the current user name to display on the page */}
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <footer>
          <p> Author name: Ryan Isaacson</p>
          <a href="https://github.com/ryan-isaacson/CS-260-repo.git">Github</a>
        </footer>
      </div>
    </BrowserRouter>
  )
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}

export { AuthState, AUTH_USER_KEY }; // allow login.jsx to use these variables