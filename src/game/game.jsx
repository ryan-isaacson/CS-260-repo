import React, { useEffect, useState } from 'react';
import './game.css';

// full game functionality
export function Game({ userName }) { // get the username to use on the page
    const [gameStarted, setGameStarted] = useState(false); // automatically set the game to not started
    const [timeLeft, setTimeLeft] = useState(30); // initialize the time to 30 seconds
    const [score] = useState(0); // prep score for implementation later

    const gameOver = gameStarted && timeLeft === 0;

    const handleStartGame = () => { // function to start the game when the button is clicked
        setTimeLeft(30); // reset the time to 30 seconds at the start of each game
        setGameStarted(true);
    };

    // function to handle the game timer
    useEffect(() => {
        if (!gameStarted || timeLeft === 0) { // if the game isn't started or time has run out don't start the timer
            return;
        }

        const timerId = setInterval(() => { // start a timer that counts down every second
            setTimeLeft((currentTime) => {
                if (currentTime <= 1) {
                    clearInterval(timerId);
                    return 0;
                }
                return currentTime - 1;
            });
        }, 1000);

        return () => clearInterval(timerId); // make sure the timer restarts and clears
    }, [gameStarted, timeLeft]);

  return (
    <main>
        <div className="info-bar">
            <span className="username">Username: {userName}</span> {/* show the current username in the info bar */}
            <span className="time">Time Left: {timeLeft}s</span> {/* show the time left in the info bar */}
            <span className="score">Score: {score}</span> {/* show the current score in the info bar */}
        </div>
        <div className="game-feed">
            <p>Bob just finished a game with a score of: 52</p>
            <p>Dave just finished a game with a score of: 37</p>
        </div>
        {!gameStarted && <button className="start-button" onClick={handleStartGame}>Start Game</button>} {/* only show the start button if the game hasn't started yet */}
        {gameStarted && !gameOver && <div className="fish-layer"> {/* only show the fish while the game is active */}
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
        {gameOver && (
            <div className="game-over-text">
                <p>Game Over!  Your score: {score}</p>
            </div>
        )}
    </main>
  );
}