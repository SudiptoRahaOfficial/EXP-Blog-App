// importing dotenv to parse env variables
require('dotenv').config()

// importing dependencis
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const session = require('express-session')
const mongoDBStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash')
const config = require('config')

// importing route setup function
const setRoutes = require('./routes/allRoutes')

// importing middlewares
const { bindUserWithRequest } = require('./middlewares/authMiddleware')
const { setLocals } = require('./middlewares/setLocals')

// app, port & db-connection-string defenation
const app = express()
const PORT = config.get('port') || 3000
const dbConnectionStr = config
	.get('db-connection-uri')
	.replace('<db_password>', config.get('db-password'))

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
		secret: config.get('secret-key') || 'SECRET_KEY',
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

// applying all routes to the app
setRoutes(app)

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