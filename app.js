// importing dotenv to parse environment variables
require('dotenv').config()

// importing dependencis
const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

// app, port & db-connection-string defenation
const app = express()
const PORT = config.get('port') || 3000
const dbConnectionStr = config
	.get('db-connection-uri')
	.replace('<db_password>', config.get('db-password'))

// view engine configuration
app.set('view engine', 'ejs')
app.set('views', 'views')

// import & apply setMiddlewares
const setMiddlewares = require('./middlewares/allMiddlewares')
setMiddlewares(app)

// import & apply setRoutes
const setRoutes = require('./routes/allRoutes')
setRoutes(app)

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