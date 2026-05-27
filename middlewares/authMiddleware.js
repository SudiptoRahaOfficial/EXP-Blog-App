// importing User model
const User = require('../models/User')

// middleware function for bind user with the request
const bindUserWithRequest = () => {
	return async (req, res, next) => {
		if (!req.session.isLoggedIn) {
			return next()
		}

		try {
			const user = await User.findById(req.session.user._id)
			req.user = user
			next()
		} catch (err) {
			console.log(err)
			next(err)
		}
	}
}

// middleware function - isAuthenticated
const isAuthenticated = (req, res, next) => {
	if (!req.session.isLoggedIn) {
		return res.redirect('/auth/signin')
	}
	next()
}

// middleware function - isUnAuthenticated
const isUnAuthenticated = (req, res, next) => {
	if (req.session.isLoggedIn) {
		return res.redirect('/dashboard')
	}
	next()
}

// exporting auth middleware functions
module.exports = {
	bindUserWithRequest,
	isAuthenticated,
	isUnAuthenticated,
}