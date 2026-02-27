import React, { useEffect, useState } from 'react';
import './leaderboard.css';

const LEADERBOARD_STORAGE_KEY = 'ctf_leaderboard_scores'; // storage key for leaderboard scores

// full leaderboard page functionality
export function Leaderboard() {
    
    const [scores, setScores] = useState([]); // initialize scores as an empty array

    useEffect(() => {
        const stored = localStorage.getItem(LEADERBOARD_STORAGE_KEY); // get the previously saved scores
        const savedScores = stored // read the scores or use an empty array if there are none
        ? JSON.parse(stored) 
        : []; 
        const rankedScores = [...savedScores] // sort the scores by score descending
            .sort((a, b) => { // if scores are different, sort by score
                if (b.score !== a.score) {
                    return b.score - a.score;
                }
                return a.timestamp - b.timestamp; // if scores are the same, sort by timestamp (earlier score first)
            })
            .slice(0, 10); // keep only the top 10 scores

        setScores(rankedScores); // set the top 10 scores ready to display
    }, []);

    return (
        <main className="leaderboard-page">
            <h2>Leaderboard</h2>
            <section>
                <table>
                    <thead> {/* table header */}
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Score</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* if then statement. If there are no scores yet then just initialize 
                        the leaderboard with one blank row. Otherwise print the ranked scores.*/}
                        {scores.length === 0 
                        ? (
                            <tr>
                                <td>1</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        ) 
                        : (
                            // set each value to it's spot in the leaderboard
                            scores.map((entry, index) => (
                                // index + 1 is the displayed leaderboard placement.
                                // Since scores is already sorted, this automatically
                                // adjusts placement when new scores are inserted.

                                // make a unique profile for each score
                                <tr key={`${entry.name}-${entry.timestamp}-${index}`}>
                                    <td>{index + 1}</td> 
                                    <td>{entry.name}</td> 
                                    <td>{entry.score}</td>
                                    <td>{entry.date}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </section>
        </main>
    );
}