import React, { useEffect, useState } from 'react';
import './leaderboard.css';

// full leaderboard page functionality
export function Leaderboard() {
    
    const [scores, setScores] = useState([]); // initialize scores as an empty array
    const [loadMessage, setLoadMessage] = useState(''); // track leaderboard load errors for user feedback

    useEffect(() => {
        const loadScoresFromApi = async () => { // helper to load leaderboard scores from backend api
            try { // try requesting leaderboard score data from backend service
                const response = await fetch('/api/scores'); // call backend score endpoint

                if (!response.ok) { // stop and show message if backend returns failure status
                    setLoadMessage('Unable to load leaderboard right now.'); // show load failure message
                    return;
                }

                const apiScores = await response.json(); // parse score list returned by backend
                const rankedScores = [...apiScores] // sort backend scores by score descending
                    .sort((a, b) => { // if scores are different, sort by score
                        if (b.score !== a.score) {
                            return b.score - a.score;
                        }
                        return new Date(a.date) - new Date(b.date); // if scores are the same, sort by timestamp (earlier score first)
                    })
                    .slice(0, 10); // keep only the top 10 scores

                setScores(rankedScores); // set the top 10 scores ready to display
                setLoadMessage(''); // clear any previous load error message
            } catch (error) { // catch network/server errors while loading leaderboard
                setLoadMessage('Unable to reach server for leaderboard.'); // show network failure message
            }
        };

        loadScoresFromApi(); // load leaderboard scores when page first mounts
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
                {loadMessage && <p>{loadMessage}</p>} {/* show leaderboard load error message when request fails */}
            </section>
        </main>
    );
}