import React, { useEffect, useState } from 'react';
import './instructions.css';

export function Instructions() {
  const [fishFact, setFishFact] = useState(''); // store the fish fact text from the backend
  const [fishTopic, setFishTopic] = useState(''); // store which fish topic the fact is about
  const [isLoadingFact, setIsLoadingFact] = useState(true); // track loading state while fetching the fact
  const [factError, setFactError] = useState(''); // store an error message if fetch fails

  useEffect(() => { // run once when this page loads so we can fetch one fact
    const loadFishFact = async () => { // function to call backend endpoint and get fish fact data
      try {
        setIsLoadingFact(true); // show loading text while request is in progress
        setFactError(''); // clear old errors before making a new request

        const response = await fetch('/api/fish-fact'); // call our backend endpoint for fish facts
        if (!response.ok) { // treat non-200 responses as an error
          throw new Error('Unable to load fish fact'); // jump to catch block if backend request fails
        }

        const data = await response.json(); // parse json body returned from backend
        setFishFact(data.fact || 'No fish fact available right now.'); // save fact text with a fallback
        setFishTopic(data.topic || 'Fish'); // save topic name with a fallback
      } 
      catch {
        setFactError('Could not load a fish fact right now.'); // show error if anything fails
      } 
      finally {
        setIsLoadingFact(false); // stop loading state no matter what happened
      }
    };

    loadFishFact(); // run the fetch function
  }, []);

  return (
    <main className="instructions-main">
        <h2>Instructions</h2>
        <p> 
            Catch The Fish is a game of speed where you see how many fish you can collect 
            within a 30 second time limit. When the game starts, you will see fish appear 
            on the screen, and you must click on them as quickly as possible to earn points.
            Each fish you catch will add 1 to your score. Try to catch as many fish as you can before
            the time runs out! Good luck and have fun!
        </p>
        <p>
            {isLoadingFact && 'Loading fish fact...'} {/* show loading text while request is in progress */}
            {!isLoadingFact && factError} {/* show error text if request failed */}
            {!isLoadingFact && !factError && `${fishTopic} fact: ${fishFact}`} {/* show fish fact after successful fetch */}
        </p>
    </main>
  );
}