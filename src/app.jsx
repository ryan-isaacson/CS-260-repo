import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Game } from './game/game';
import { Leaderboard } from './leaderboard/leaderboard';
import { Instructions } from './instructions/instructions';

export default function App() {
  return (
    <BrowserRouter>
      <div className="page-wrapper text-center">
        <header>
          <h1>Catch The Fish</h1>
          <nav>
            <ul>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/game">Game</NavLink></li>
              <li><NavLink to="/instructions">Instructions</NavLink></li>
              <li><NavLink to="/leaderboard">Leaderboard</NavLink></li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/game" element={<Game />} />
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