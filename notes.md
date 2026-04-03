# CS 260 Notes

[My startup - Simon](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

My IP address is: 3.234.218.17
Initially there was an issue with my instance that I couldn't figure out how to fix causing the site to stop working every few hours until I restarted it, so I had to stop and relaunch my instance causing me to have a new IP address. After that it worked as intended.

## Caddy

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

## HTML

I ran my notes through chatGBT for formatting so it would look how I wanted it to

```
HTML things I learned:
<head> = The name that shows up on the actual tab of the website
<body> = Contains almost everything else on the website including:
      <nav>
      <header>
      <main>
      <footer>
<h1> = Big header
<h2> = Next big header
<ul> = Creates a bulleted list
      <li> = List item
<a> = Makes links, example: <a href="index.html">Home</a>
<hr> = Makes a line across the screen separating sections
<table> = Makes a table structure
      <tr> = Table row
            <th> = Table header cell
            <td> = Table data cell
<button> = Makes a button
<p> = Regular text
<br> = Line break
<div> = Generic container (Put these things in the same box)
<svg> = Helps make pictures
```


## CSS

CSS took me a very long time to complete. I struggled a lot with trying to get things exactly how I wanted it, but ultimately I am very satasfied with how it turned out. I put comments on just about every single line of my CSS so I could go back and remember what I did for each line and how it works.

Bootstrap is cool, it's very nice on a surface level application to do things easy and quick.


## React Part 1: Routing

Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS. This isn't as straight forward as you would find with Svelte or Vue, but I made it work in the end. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way.


## React Part 2: Reactivity

Adding reactivity was really hard, especially the login for some reason

The biggest thing I learned was to let state control what is shown on the screen. Instead of writing code that directly edits elements, I update state and React re-renders the page correctly.

Some of the reactivity things I used:

- "useState" for functions like "timeLeft", "score", "fish", and feed messages.
- "useEffect" for timers like the game countdown and the timer for spawning fish
-  made it so React only shows the start button, fish, or game over text at the right time.
- use localStorage to make it so when a game ends the score updates the leaderboard right away.

One thing that helped me was seeing how one state update can affect different parts of the page at the same time. For example when time reaches 0 it hides the fish, shows game over text, and saves the score to the leaderboard.


## Service

This was harder than I expected because both the frontend and backend need to be running. For the backend I used Node.js with Express, plus cookie-parser and bcryptjs. I also used in-memory arrays/maps to store users, sessions, and scores

Endpoints I implemented:

- POST /api/auth/create
- POST /api/auth/login
- DELETE /api/auth/logout
- GET /api/user/:email
- GET /api/scores
- POST /api/score
- GET /api/fish-fact (third-party API call)


## Database (MongoDB)

Switched from in memory storage to MongoDB for persistent storage. Users and scores now survive server restarts.

Key things I learned:

- I put my database credentials in dbConfig.json and ignored that file in gitignore so I don't accidentally push passwords to GitHub
- I used Mongodb to connect, and I ping the database on startup so it fails right away if my credentials are wrong
- I kept sessions in memory with a Map since those can reset, but I put users and scores in MongoDB because those need to persist


## WebSocket

This part made more sense once I did it in small steps. First I got the backend listening, then connected the frontend, then tested one message, and after that sent it out to everyone.

Things I learned:

- WebSockets let the server push messages back to all connected clients without the browser constantly asking for updates
- I had to use an http server wrapper around Express so the websocket server and the backend could share the same port
- Vite needed a `/ws` proxy with websocket support or the frontend connection would not work correctly in development

