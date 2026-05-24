// importing dependencis
const bcrypt = require('bcrypt')

// importing models
const User = require('../models/User')

// controller for signup get route
const signupGetController = (req, res, next) => {
	res.render('pages/auth/signup', { title: 'Create an account' })
}

// controller for signup post route
const signupPostController = async (req, res, next) => {
	// extracting form data
	const { username, email, password, confirmPassword } = req.body

	try {
		// encripting password & confirmPassword
		let hashedPassword = await bcrypt.hash(password, 10)
		let hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10)

		// making new userObj
		let user = new User({
			username,
			email,
			password: hashedPassword,
			confirmPassword: hashedConfirmPassword,
		})

		// saving new user to database
		let newUser = await user.save()
		console.log(`New user signed up successfully!`, `User data: ${newUser}`)
		return res.redirect('/auth/signin')
	} catch (err) {
		console.log(err)
		next(err)
	}
}

// controller for signin get route
const signinGetController = (req, res, next) => {
	res.render('pages/auth/signin', { title: 'Signin To Account' })
}

// controller for signin post route
const signinPostController = (req, res, next) => {}

// controller for signout route
const signoutController = (req, res, next) => {}

// exporting all controllers
module.exports = {
	signupGetController,
	signupPostController,
	signinGetController,
	signinPostController,
	signoutController,
}