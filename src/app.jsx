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
                    <li><a href="index.html">Home</a></li>
                    <li><a href="game.html">Game</a></li>
                    <li><a href="instructions.html">Instructions</a></li>
                    <li><a href="leaderboard.html">Leaderboard</a></li>
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