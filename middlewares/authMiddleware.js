// importing User model
const User = require('../models/User')

// middleware function for bind user with the request
const bindUserWithRequest = () => {
	return async (req, res, next) => {
		if (!req.session.isLoggedIn) {
			next()
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

module.exports = { bindUserWithRequest }