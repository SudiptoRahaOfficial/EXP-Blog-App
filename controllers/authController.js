// importing dependencis
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

// importing model
const User = require('../models/User')

// importing error formatter
const errorFormatter = require('../utils/validationErrorFormatter')

// controller for signup get route
const signupGetController = (req, res, next) => {
	res.render('pages/auth/signup', {
		title: 'Create an account',
		errors: {},
		value: {},
	})
}

// controller for signup post route
const signupPostController = async (req, res, next) => {
	// extracting form data
	const { username, email, password } = req.body

	// checking validation errors
	let errors = validationResult(req).formatWith(errorFormatter)
	if (!errors.isEmpty()) {
		return res.render('pages/auth/signup', {
			title: 'Create an account',
			errors: errors.mapped(),
			value: { username, email },
		})
	}

	try {
		// encripting password & confirmPassword
		let hashedPassword = await bcrypt.hash(password, 10)

		// making new userObj
		let user = new User({
			username,
			email,
			password: hashedPassword,
		})

		// saving new user to database
		let newUser = await user.save()
		console.log(`New user signed up successfully!`, `User data: ${newUser}`)

		// redirecting user to signin
		return res.redirect('/auth/signin')
	} catch (err) {
		console.log(err)
		next(err)
	}
}

// controller for signin get route
const signinGetController = (req, res, next) => {
	res.render('pages/auth/signin', { title: 'Signin To Account', errors: {} })
}

// controller for signin post route
const signinPostController = async (req, res, next) => {
	// extracting form data
	const { email, password } = req.body

	// checking validation errors
	let errors = validationResult(req).formatWith(errorFormatter)
	if (!errors.isEmpty()) {
		return res.render('pages/auth/signin', {
			title: 'Signin To Account',
			errors: errors.mapped(),
		})
	}

	// logics for signup
	try {
		// fecthing user by provided email
		const user = await User.findOne({ email })
		if (!user) {
			return res.json({
				message: 'Invalid Credential!',
			})
		}

		// matching provided password with db stored password
		const isMatchPassword = await bcrypt.compare(password, user.password)
		if (!isMatchPassword) {
			return res.json({
				message: 'Invalid Credential!',
			})
		}

		// creating session for save on database
		req.session.isLoggedIn = true
		req.session.user = {
			_id: user._id.toString(),
			username: user.username,
			email: user.email,
		}

		// saving session on db, after saving successfully redirecting to dashboard
		req.session.save((err) => {
			if (err) return next(err)
			console.log(`User signed in successfully - ${user.email}`)
			return res.redirect('/dashboard')
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
}

// controller for signout route
const signoutController = (req, res, next) => {
	req.session.distroy((err) => {
		if (err) {
			console.log(err)
			return next(err)
		}
		return res.redirect('/auth/signin')
	})
}

// exporting all controllers
module.exports = {
	signupGetController,
	signupPostController,
	signinGetController,
	signinPostController,
	signoutController,
}