import React from 'react';
import './game.css';

export function Game() {
  return (
    <main>
        <div className="info-bar">
            <span className="username">Username: AwesomeDude</span>
            <span className="time">Time Left: 24s</span>
            <span className="score">Score: 8</span>
        </div>
        <div className="game-feed">
            <p>Bob just finished a game with a score of: 52</p>
            <p>Dave just finished a game with a score of: 37</p>
        </div>
        <button className="start-button">Start Game</button>
        <div className="fish-layer">
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
        </div>
    </main>
  );
}