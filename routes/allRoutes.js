// importing all routes
const authRoutes = require('./authRoute')
const dashboardRoutes = require('./dashboardRoute')

// ALL ROUTES STORING HERE ----------
const routes = [
	// auth routes
	{
		path: '/auth',
		controller: authRoutes,
	},
	// dashboard route
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
		app.use(route.path, route.controller)
	})
}

// exporting setRoute function
module.exports = setRoutes