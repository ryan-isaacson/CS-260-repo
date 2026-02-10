import React from 'react';
import './leaderboard.css';

export function Leaderboard() {
  return (
        <main className="leaderboard-page">
        <h2>Leaderboard</h2>
        <section>
                <table>
                <tr>
                   <th>#</th>
                   <th>Name</th>
                   <th>Score</th>
                   <th>Date</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Ryan</td>
                    <td>63</td>
                    <td>01-25-2026</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Bob</td>
                    <td>52</td>
                    <td>01-17-2026</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Dave</td>
                    <td>37</td>
                    <td>01-17-2026</td>
                </tr>
            </table>
        </section>
    </main>
  );
}