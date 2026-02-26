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
    const storedUser = localStorage.getItem(AUTH_USER_KEY); // read the saved user from localStorage.
    if (storedUser) { // if the user exists in storage, we are already logged in.
      setUserName(storedUser); // put the stored user into React state.
      setAuthState(AuthState.Authenticated); // set the user as authenticated.
    } else { // no stored user means we are logged out.
      setAuthState(AuthState.Unauthenticated); // mark the user as unauthenticated.
    }
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
          <Route path="/game" element = {<Game />}/>
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