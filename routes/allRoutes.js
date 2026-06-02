// importing all routes
const authRoutes = require('./authRoute')
const dashboardRoutes = require('./dashboardRoute')
const uploadRoutes = require('./uploadRoute')

// importing error handler middlewares
const {
	notFound,
	errorHandler,
} = require('../middlewares/errorHandleMiddleware')

// ALL ROUTES STORING HERE ----------
const routes = [
	// auth routes
	{
		path: '/auth',
		controller: authRoutes,
	},
	// upload routes
	{
		path: '/uploads',
		controller: uploadRoutes,
	},
	// dashboard routes
	{
		path: '/dashboard',
		controller: dashboardRoutes,
	},
	// root route
	{
		path: '/',
		controller: (req, res) => {
			res.send(`<h3>Welcome to EXP Blog!</h3>`)
		},
	},
]

// function for apply all routes at app
const setRoutes = (app) => {
	routes.forEach((route) => {
		if (route.path === '/') {
			app.get(route.path, route.controller)
		} else {
			app.use(route.path, route.controller)
		}
	})

	// handleing errors
	app.use(notFound) // catches unmatched routes
	app.use(errorHandler) // handles all errors
}

// exporting setRoute function
module.exports = setRoutes