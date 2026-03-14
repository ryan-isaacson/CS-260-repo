const express = require('express'); // use express so this file can run the backend server
const cookieParser = require('cookie-parser'); // use cookie parser so we can read cookies on requests

const app = express(); // create the express app object for middleware and endpoints
const port = process.argv.length > 2 ? process.argv[2] : 4000; // use terminal port if provided, otherwise use 4000

const users = []; // temporary user storage in memory (resets on restart)
const sessions = new Map(); // temporary session storage mapping tokens to session info
const scores = []; // temporary score storage in memory

app.use(express.json()); // parse incoming json bodies into req.body
app.use(cookieParser()); // parse incoming cookies so session/auth cookies are readable
app.use(express.static('public')); // serve static files from public for deployment

app.listen(port, () => {
	console.log(`Listening on port ${port}`); // log the port so I know the server started
});