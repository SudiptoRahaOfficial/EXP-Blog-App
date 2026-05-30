// importing dependencis
const morgan = require('morgan')
const express = require('express')
const session = require('express-session')
const mongoDBStore = require('connect-mongodb-session')(session)
const config = require('config')
const flash = require('connect-flash')

// importing custom middlewares
const { bindUserWithRequest } = require('../middlewares/authMiddleware')
const { setLocals } = require('../middlewares/setLocals')

// session store configuration
const sessionStore = new mongoDBStore({
	uri: config
		.get('db-connection-uri')
		.replace('<db_password>', config.get('db-password')),
	collection: 'sessions',
	expires: 1000 * 60 * 60 * 2,
})

// silent sessionStore errors
sessionStore.on('error', (err) => {
	console.log('Session store error:', err)
})

// ALL MIDDLEWARES STORING HERE ----------
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
	flash(), // flash middleware for alerts

	bindUserWithRequest(), // binding logged in user with request
	setLocals(), // binding some data with locals
]

// function for apply all middlewares at app
const setMiddlewares = (app) => {
	app.use(middlewares)
}

// exporting setMiddlewares function
module.exports = setMiddlewares