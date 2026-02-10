import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './game/game';
import { Scores } from './leaderboard/leaderboard';
import { About } from './instructions/instructions';

export default function App() {
  return (
    <BrowserRouter>
    <body class="text-center" style="background-color: #1b7dde;"> 
        <header>
            <h1>Catch The Fish</h1>
            <nav>
                <ul>
                    <li><NavLink to="index">Home</NavLink></li>
                    <li><NavLink to="game">Game</NavLink></li>
                    <li><NavLink to="instructions">Instructions</NavLink></li>
                    <li><NavLink to="leaderboard">Leaderboard</NavLink></li>
                </ul>
            </nav>
        </header>

        <footer>
            <p> Author name: Ryan Isaacson</p>
            <a href="https://github.com/ryan-isaacson/CS-260-repo.git">Github</a>
        </footer>
    </body>

    <Routes>
      <Route path='/' element={<Login />} exact />
      <Route path='/game' element={<Game />} />
      <Route path='/leaderboard' element={<Leaderboard />} />
      <Route path='/instructions' element={<Instructions />} />
      <Route path='*' element={<NotFound />} />
    </Routes>

    </BrowserRouter>

  )
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}