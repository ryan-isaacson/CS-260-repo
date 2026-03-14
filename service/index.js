const express = require('express'); // use express so this file can run the backend server
const cookieParser = require('cookie-parser'); // use cookie parser so we can read cookies on requests
const bcrypt = require('bcryptjs'); // use bcrypt to hash passwords before storing them

const app = express(); // create the express app object for middleware and endpoints
const port = process.argv.length > 2 ? process.argv[2] : 4000; // use terminal port if provided, otherwise use 4000

const users = []; // temporary user storage in memory (resets on restart)
const sessions = new Map(); // temporary session storage mapping tokens to session info
const scores = []; // temporary score storage in memory

app.use(express.json()); // parse incoming json bodies into req.body
app.use(cookieParser()); // parse incoming cookies so session/auth cookies are readable
app.use(express.static('public')); // serve static files from public for deployment

app.post('/api/auth/create', async (req, res) => { // create account endpoint for new users
	const { email, password } = req.body; // pull email and password

	if (!email || !password) { // make sure both required fields were sent
		return res.status(400).json({ message: 'email and password are required' }); // return bad request if missing fields
	}

	const existingUser = users.find((user) => user.email === email); // check if this email is already in use
	if (existingUser) { // stop if a duplicate account already exists
		return res.status(409).json({ message: 'user already exists' }); // return conflict for duplicate user
	}

	const passwordHash = await bcrypt.hash(password, 10); // hash the password before saving it
	users.push({ email, password: passwordHash }); // save the new user with hashed password

	return res.status(201).json({ email }); // return created status and basic user info
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`); // log the port so I know the server started
});