import React, { useEffect, useRef, useState } from 'react';
import './game.css';

const INITIAL_FISH_COUNT = 5; // initialize the number of fish to start the game with
const MAX_FISH_COUNT = 20; // maximum number of fish allowed on the screen

// helper function to create a new fish with a unique id and random position
function createFish(id) {
    return {
        id,
        x: Math.floor(Math.random() * 91) + 5, // keep the fish within the horizontal bounds of the game area (5% to 95%)
        y: Math.floor(Math.random() * 91) + 5, // keep the fish within the vertical bounds of the game area (5% to 95%)
    };
}

// full game functionality
export function Game({ userName }) { // get the username to use on the page
    const [gameStarted, setGameStarted] = useState(false); // automatically set the game to not started
    const [timeLeft, setTimeLeft] = useState(30); // initialize the time to 30 seconds
    const [score, setScore] = useState(0); // keep track of player score
    const [fish, setFish] = useState([]); // keep track of fish currently on screen
    const [feedMessages, setFeedMessages] = useState([]); // keep track of game feed notifications
    const fishIdCounter = useRef(0); // make a fishIdCounter function to keep track of the next unique fish id to use
    const didSaveScore = useRef(false); // make a didSaveScore function to make sure we only save the score once per game over

    const gameOver = gameStarted && timeLeft === 0;
    const playerName = userName || 'Player'; // make a playerName variable to use elsewhere

    const makeFishWithNewId = () => { // helper function to create a new fish with a unique id
        const fishId = fishIdCounter.current; // get the current fish id from the counter
        fishIdCounter.current += 1; // increment the counter for the next fish
        return createFish(fishId); // create and return a new fish with the unique id
    };

    const handleStartGame = () => { // function to start the game when the button is clicked
        setTimeLeft(30); // reset the time to 30 seconds at the start of each game
        setScore(0); // reset score when a new game starts
        fishIdCounter.current = 0; // reset the fish id counter for each new game
        didSaveScore.current = false; // reset the score saved flag for each new game
        setFeedMessages((currentMessages) => [...currentMessages, `${playerName} started a new game`].slice(-8)); // add start game message and keep only the last 8 notifications
        setFish(Array.from({ length: INITIAL_FISH_COUNT }, () => makeFishWithNewId())); // create the initial fish for the game
        setGameStarted(true);
    };

    const handleFishClick = (fishId) => { // function for clicking on a fish
        setScore((currentScore) => currentScore + 1); // increase the score by 1 each time a fish is clicked on
        setFish((currentFish) => currentFish.filter((oneFish) => oneFish.id !== fishId)); // remove the clicked fish from the game
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

    // function to spawn new fish every 0.5s while the game is active
    useEffect(() => {
        if (!gameStarted || gameOver) { // if the game isn't started or is over don't spawn new fish
            return;
        }

        const spawnId = setInterval(() => { // start a timer that spawns new fish every 0.5 seconds
            setFish((currentFish) => {
                if (currentFish.length >= MAX_FISH_COUNT) { // if there are already too many fish on the screen, don't add any more
                    return currentFish;
                }
                return [...currentFish, makeFishWithNewId()]; // add a new fish with a unique id to the current fish array
            });
        }, 500); // spawn a new fish every 0.5 seconds

        return () => clearInterval(spawnId); // clear the spawn timer when the game ends or restarts
    }, [gameStarted, gameOver]); // the spawn timer depends on whether the game has started and whether it's over


    // function to save the score when the game is over
    useEffect(() => {
        if (!gameOver || didSaveScore.current) { // if the game isn't over or we've already saved the score for this game over, don't do anything
            return;
        }

        didSaveScore.current = true; // mark score as handled immediately so this only runs once

        const saveScoreToApi = async () => { // helper to submit game score to backend endpoint
            try { // try posting score to backend service
                const response = await fetch('/api/score', { // send score payload to protected score endpoint
                    method: 'POST', // use post because we are creating a new score entry
                    headers: { 'Content-Type': 'application/json' }, // tell backend request body is json
                    body: JSON.stringify({ name: playerName, score }), // include player name and score in payload
                });

                if (response.status === 201) { // score save succeeded on backend
                    setFeedMessages((currentMessages) => [...currentMessages, `${playerName} ended the game with ${score} points`].slice(-8)); // add successful end-game message and keep latest 8
                }
                else { // handle any other unexpected backend response status
                    setFeedMessages((currentMessages) => [...currentMessages, 'Score save failed'].slice(-8)); // show generic score save failure message
                }
            } 
            catch (error) { // catch network/server errors when posting score
                setFeedMessages((currentMessages) => [...currentMessages, 'Unable to reach server to save score'].slice(-8)); // show network failure message
            }
        };

        saveScoreToApi(); // run backend score submission after game ends
    }, [gameOver, playerName, score]); // make leaderboard entry

  return (
    <main>
        <div className="info-bar">
            <span className="username">Username: {userName}</span> {/* show the current username in the info bar */}
            <span className="time">Time Left: {timeLeft}s</span> {/* show the time left in the info bar */}
            <span className="score">Score: {score}</span> {/* show the current score in the info bar */}
        </div>
        <div className="game-feed">
            {feedMessages.map((message, index) => ( // show the game feed messages in the game feed section
                <p key={`${index}-${message}`}>{message}</p>
            ))}
        </div>
        {!gameStarted && <button className="start-button" onClick={handleStartGame}>Start Game</button>} {/* only show the start button if the game hasn't started yet */}
        {gameStarted && !gameOver && <div className="fish-layer"> {/* only show the fish while the game is active */}
            {fish.map((oneFish) => (
                <button key={oneFish.id} className="fish-button" style={{ "--x": oneFish.x, "--y": oneFish.y }} onClick={() => handleFishClick(oneFish.id)}> {/* create a button for each fish with its own position and click handler */}
                    <svg width="75" height="75"> {/* size of the fish emoji */}
                        <text x="-5" y="70" fontSize="80">🐟</text> {/* display a fish emoji */}
                    </svg>
                </button>
            ))}
        </div>}
        {gameOver && (
            <div className="game-over-text">
                <p>Game Over!  Your score: {score}</p> {/* display the final score */}
                <button type="button" onClick={handleStartGame}>New Game</button> {/* button to start a new game */}
            </div>
        )}
    </main>
  );
}