const express = require('express'); // use express so this file can run the backend server
const http = require('http'); // use node http server so express and websocket share the same port
const cookieParser = require('cookie-parser'); // use cookie parser so we can read cookies on requests
const bcrypt = require('bcryptjs'); // use bcrypt to hash passwords before storing them
const { randomUUID } = require('crypto'); // use random uuid strings for session tokens
const { MongoClient } = require('mongodb'); // use official mongodb driver to connect
const { WebSocketServer } = require('ws'); // use ws library to accept websocket connections
const config = require('./dbConfig.json'); // load mongodb credentials from config file

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`; // build atlas connection string
const client = new MongoClient(url); // create mongo client
const db = client.db('fishGame'); // use the fishGame database
const userCollection = db.collection('user'); // collection for registered user accounts
const scoreCollection = db.collection('score'); // collection for submitted scores

// test connection on startup and exit if it fails
(async function testConnection() {
	await client.connect();
	await db.command({ ping: 1 });
	console.log('Connected to database');
})().catch((ex) => {
	console.log(`Unable to connect to database with ${url} because ${ex.message}`);
	process.exit(1);
});

const app = express(); // create the express app object for middleware and endpoints
const port = process.argv.length > 2 ? process.argv[2] : 4000; // use terminal port if provided, otherwise use 4000
const server = http.createServer(app); // create http server wrapper so websocket upgrade events are available
const wss = new WebSocketServer({ noServer: true }); // create websocket server that we attach manually on upgrade

const sessions = new Map(); // in-memory session storage mapping tokens to session info
const authCookieName = 'token'; // name of the cookie used for auth session token
const fishTopics = ['Salmon', 'Clownfish', 'Tuna', 'Swordfish', 'Manta ray']; // types of fish for the random fish facts

function getRandomItem(items) {
	return items[Math.floor(Math.random() * items.length)]; // return one random entry from the provided array
} // helper to pick one random item from an array

app.use(express.json()); // parse incoming json bodies into req.body
app.use(cookieParser()); // parse incoming cookies so session/auth cookies are readable
app.use(express.static('public')); // serve static files from public for deployment

server.on('upgrade', (request, socket, head) => { // handle websocket upgrade requests from the browser
	if (request.url !== '/ws') { // only allow websocket upgrades on /ws path
		socket.destroy(); // close unsupported websocket upgrade paths
		return;
	}

	wss.handleUpgrade(request, socket, head, (websocket) => {
		wss.emit('connection', websocket, request); // complete websocket handshake and establish connection
	});
});

app.post('/api/auth/create', async (req, res) => { // create account endpoint for new users
	const { email, password } = req.body; // pull email and password

	if (!email || !password) { // make sure both required fields were sent
		return res.status(400).json({ message: 'email and password are required' }); // return bad request if missing fields
	}

	const existingUser = await userCollection.findOne({ email }); // check if this email is already in use
	if (existingUser) { // stop if a duplicate account already exists
		return res.status(409).json({ message: 'user already exists' }); // return conflict for duplicate user
	}

	const passwordHash = await bcrypt.hash(password, 10); // hash the password before saving it
	await userCollection.insertOne({ email, password: passwordHash }); // save the new user with hashed password to mongodb

	return res.status(201).json({ email }); // return created status and basic user info
});

app.post('/api/auth/login', async (req, res) => { // login endpoint for existing users
	const { email, password } = req.body; // pull login credentials from request body

	if (!email || !password) { // make sure both required fields were sent
		return res.status(400).json({ message: 'email and password are required' }); // return bad request if fields are missing
	}

	const user = await userCollection.findOne({ email }); // find user by email in mongodb
	if (!user) { // stop if no account matches this email
		return res.status(401).json({ message: 'invalid credentials' }); // return unauthorized for bad login
	}

	const passwordMatches = await bcrypt.compare(password, user.password); // compare submitted password to hashed password
	if (!passwordMatches) { // stop if password is wrong
		return res.status(401).json({ message: 'invalid credentials' }); // return unauthorized for bad login
	}

	const token = randomUUID(); // generate a new session token
	sessions.set(token, { email }); // store session token mapped to the logged in user
	res.cookie(authCookieName, token, { httpOnly: true, sameSite: 'strict' }); // set secure ish auth cookie in browser

	return res.status(200).json({ email }); // return success and basic user info
});

app.delete('/api/auth/logout', (req, res) => { // logout endpoint for signed in users
	const token = req.cookies[authCookieName]; // read current auth token from cookie

	if (token) { // only try deleting if a token exists
		sessions.delete(token); // remove session token from in-memory session store
	}

	res.clearCookie(authCookieName); // clear auth cookie in browser
	return res.status(200).json({ message: 'logged out' }); // return success response for logout
});

app.get('/api/user/:email', async (req, res) => { // user lookup endpoint for frontend auth checks
	const requestedEmail = req.params.email; // read target email from route parameters
	const user = await userCollection.findOne({ email: requestedEmail }); // find matching user in mongodb

	if (!user) { // stop if user account does not exist
		return res.status(404).json({ message: 'user not found' }); // return not found for missing user
	}

	const token = req.cookies[authCookieName]; // read auth token from cookie
	const session = token ? sessions.get(token) : undefined; // look up session data for the token
	const authenticated = !!session && session.email === requestedEmail; // mark true only if token session matches requested user

	return res.status(200).json({ email: user.email, authenticated }); // return user email and whether this request is authenticated
});

app.get('/api/scores', async (req, res) => { // score read endpoint for frontend score data
	const scores = await scoreCollection.find({}).sort({ score: -1 }).limit(10).toArray(); // fetch top 10 scores from mongodb
	return res.status(200).json(scores); // return scores from database
});

app.get('/api/fish-fact', async (req, res) => { // return a random fish fact directly from api
	const randomTopic = fishTopics[Math.floor(Math.random() * fishTopics.length)]; // choose a random fish topic for variety

	try { // try getting a real fact from wikipedia
		const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(randomTopic)}`); // call wikipedia summary endpoint

		if (!response.ok) { // if wikipedia fails, use fallback message
			throw new Error('failed third-party request'); // force catch block when third-party status is not successful
		}

		const data = await response.json(); // convert wikipedia response into json object
		const wikiSentences = (data.extract || '')
			.split(/(?<=[.!?])\s+/) // split summary text into sentence chunks using punctuation boundaries
			.map((sentence) => sentence.trim()) // remove extra spaces from each sentence chunk
			.filter((sentence) => sentence.length > 25); // split summary into shorter fact options

		const fact = wikiSentences.length > 0
			? getRandomItem(wikiSentences) // choose one random sentence if we found sentence chunks
			: (data.extract || `Fish fact: ${randomTopic} are fascinating ocean animals found in waters around the world.`); // choose a random sentence from api text

		return res.status(200).json({ topic: randomTopic, fact }); // return topic and randomized api fact to frontend
	} catch { // fallback if third-party request fails for any reason
		return res.status(200).json({
			topic: randomTopic, // include which fish topic this fact belongs to
			fact: `Fish fact: ${randomTopic} are fascinating ocean animals found in waters around the world.`, // fallback fact text so the frontend always has something to show
		});
	}
});

app.post('/api/score', async (req, res) => { // submit a new score entry
	const { name, score } = req.body; // pull score payload fields from request body

	if (!name || typeof score !== 'number') { // validate required score payload shape
		return res.status(400).json({ message: 'name and numeric score are required' }); // return bad request for invalid payload
	}

	const scoreEntry = { name, score, date: new Date().toISOString() }; // build score object with timestamp
	await scoreCollection.insertOne(scoreEntry); // persist score entry into mongodb

	return res.status(201).json(scoreEntry); // return created score entry
});

server.listen(port, () => {
	console.log(`Listening on port ${port}`); // log the port so I know the server started
});