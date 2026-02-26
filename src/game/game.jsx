import React, { useState } from 'react';
import './game.css';

// full game functionality
export function Game({ userName }) { // get the username to use on the page
    const [gameStarted, setGameStarted] = useState(false); // automatically set the game to not started

    const handleStartGame = () => { // function to start the game when the button is clicked
        setGameStarted(true);
    };

  return (
    <main>
        <div className="info-bar">
            <span className="username">Username: {userName}</span> {/* show the current username in the info bar */}
            <span className="time">Time Left: 24s</span>
            <span className="score">Score: 8</span>
        </div>
        <div className="game-feed">
            <p>Bob just finished a game with a score of: 52</p>
            <p>Dave just finished a game with a score of: 37</p>
        </div>
        {!gameStarted && <button className="start-button" onClick={handleStartGame}>Start Game</button>} {/* only show the start button if the game hasn't started yet */}
        {gameStarted && <div className="fish-layer"> {/* only show the fish if the game has started */}
            <button className="fish-button" style={{ "--x": 10, "--y": 20 }}>
                <svg width="75" height="75">
                    <text x="-5" y="70" fontSize="80">🐟</text>
                </svg>
            </button>
            <button className="fish-button" style={{ "--x": 55, "--y": 25 }}>
                <svg width="75" height="75">
                    <text x="-5" y="70" fontSize="80">🐟</text>
                </svg>
                </button>
            <button className="fish-button" style={{ "--x": 85, "--y": 15 }}>
                <svg width="75" height="75">
                    <text x="-5" y="70" fontSize="80">🐟</text>
                </svg>
            </button>
            <button className="fish-button" style={{ "--x": 20, "--y": 60 }}>
                <svg width="75" height="75">
                    <text x="-5" y="70" fontSize="80">🐟</text>
                </svg>
            </button>
            <button className="fish-button" style={{ "--x": 45, "--y": 90 }}>
                <svg width="75" height="75">
                    <text x="-5" y="70" fontSize="80">🐟</text>
                </svg>
            </button>
            <button className="fish-button" style={{ "--x": 75, "--y": 70 }}>
                <svg width="75" height="75">
                    <text x="-5" y="70" fontSize="80">🐟</text>
                </svg>
            </button>
        </div>}
    </main>
  );
}