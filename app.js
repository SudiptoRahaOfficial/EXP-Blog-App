// importing dotenv to parse env variables
require('dotenv').config()

// importing dependencis
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')

// importing routes
const authRoute = require('./routes/authRoute')

// app & port defenation
const app = express()
const PORT = process.env.PORT || 3000

// view engine configs
app.set('view engine', 'ejs')
app.set('views', 'views')

// middleware configs
const middlewares = [
	express.urlencoded({ extended: true }), // accepting form data
	express.json(), // accepting json data
	express.static('public'), // setting up public directory
	morgan('dev'), // setting up logger by morgan
]
app.use(middlewares)

// all routes
app.use('/auth', authRoute)

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
	const dbConnectionStr = process.env.db_connection_uri.replace(
		'<db_password>',
		process.env.db_password,
	)
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