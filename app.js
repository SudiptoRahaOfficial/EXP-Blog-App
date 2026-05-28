// importing dotenv to parse env variables
require('dotenv').config()

// importing dependencis
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const session = require('express-session')
const mongoDBStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash')

// importing routes
const authRoutes = require('./routes/authRoute')
const dashboardRoutes = require('./routes/dashboardRoute')

// importing middlewares
const { bindUserWithRequest } = require('./middlewares/authMiddleware')
const { setLocals } = require('./middlewares/setLocals')

// app, port & db-connection-string defenation
const app = express()
const PORT = process.env.PORT || 3000
const dbConnectionStr = process.env.db_connection_uri.replace(
	'<db_password>',
	process.env.db_password,
)

// session store configuration
const sessionStore = new mongoDBStore({
	uri: dbConnectionStr,
	collection: 'sessions',
	expires: 1000 * 60 * 60 * 2,
})

// silent sessionStore errors
sessionStore.on('error', (err) => {
	console.log('Session store error:', err)
})

// view engine configuration
app.set('view engine', 'ejs')
app.set('views', 'views')

// middleware configuration
const middlewares = [
	morgan('dev'), // setting up logger by morgan
	express.static('public'), // setting up public directory
	express.urlencoded({ extended: true }), // accepting form data
	express.json(), // accepting json data
	session({
		secret: process.env.SECRET_KEY || 'SECRET_KEY',
		resave: false,
		saveUninitialized: false,
		store: sessionStore,
		cookie: {
			maxAge: 60 * 60 * 24 * 1000,
		},
	}), // session configuration
	bindUserWithRequest(), // binding logged in user with request
	setLocals(), // binding some data with locals
	flash(), // flash middleware for alerts
]
app.use(middlewares)

// all routes
app.use('/auth', authRoutes)
app.use('/dashboard', dashboardRoutes)

// handeling root route
app.get('/', (req, res) => {
	res.send(`<h3>Welcome to EXP Blog!</h3>`)
})

// handeling unwanted routes
app.use((req, res) => {
	res.status(404).json({
		success: false,
		message: `Route not found: ${req.method} ${req.originalUrl}`,
	})
})

// function for database & server connection
;(async function () {
	try {
		await mongoose.connect(dbConnectionStr)
		console.log(`Database connected successfully!`)
		app.listen(PORT, () =>
			console.log(`Server is running on port ${PORT}!`),
		)
	} catch (err) {
		console.log(`Database connection error - ${err}`)
		console.log(`Server failed to connect port - ${PORT}`)
	}
})()