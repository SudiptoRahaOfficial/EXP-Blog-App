// importing dependencis
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

// importing model
const User = require('../models/User')

// importing error formatter
const errorFormatter = require('../utils/validationErrorFormatter')

// importing Flash class for alerts
const Flash = require('../utils/Flash')

// ALL AUTHENTICATION CONTROLLERS ----------
// controller for signup get route
const signupGetController = (req, res, next) => {
	res.render('pages/auth/signup', {
		title: 'Create an account',
		errors: {},
		value: {},
		flashMessage: Flash.getMessage(req),
	})
}

// controller for signup post route
const signupPostController = async (req, res, next) => {
	// extracting form data
	const { username, email, password } = req.body

	// checking validation errors
	let errors = validationResult(req).formatWith(errorFormatter)
	if (!errors.isEmpty()) {
		req.flash('fail', 'Please Check The Form Again!')
		return res.render('pages/auth/signup', {
			title: 'Create an account',
			errors: errors.mapped(),
			value: { username, email },
			flashMessage: Flash.getMessage(req),
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
		req.flash('success', 'Signed Up Successfully!')

		// redirecting user to signin
		return res.redirect('/auth/signin')
	} catch (err) {
		console.log(err)
		next(err)
	}
}

// controller for signin get route
const signinGetController = (req, res, next) => {
	res.render('pages/auth/signin', {
		title: 'Signin To Account',
		errors: {},
		flashMessage: Flash.getMessage(req),
	})
}

// controller for signin post route
const signinPostController = async (req, res, next) => {
	// extracting form data
	const { email, password } = req.body

	// checking validation errors
	let errors = validationResult(req).formatWith(errorFormatter)
	if (!errors.isEmpty()) {
		req.flash('fail', 'Please Check The Form Again!')
		return res.render('pages/auth/signin', {
			title: 'Signin To Account',
			errors: errors.mapped(),
			flashMessage: Flash.getMessage(req),
		})
	}

	// logics for signup
	try {
		// fecthing user by provided email
		const user = await User.findOne({ email })
		if (!user) {
			req.flash('fail', 'Authentication Failed!')
			return res.render('pages/auth/signin', {
				title: 'Signin To Account',
				errors: {},
				flashMessage: Flash.getMessage(req),
			})
		}

		// matching provided password with db stored password
		const isMatchPassword = await bcrypt.compare(password, user.password)
		if (!isMatchPassword) {
			req.flash('fail', 'Authentication Failed!')
			return res.render('pages/auth/signin', {
				title: 'Signin To Account',
				errors: {},
				flashMessage: Flash.getMessage(req),
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
			req.flash('success', 'Signed In Successfully!')

			// redirecting user to dashboard
			return res.redirect('/dashboard')
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
}

// controller for signout route
const signoutController = (req, res, next) => {
	req.session.regenerate((err) => {
		if (err) {
			console.log(err)
			return next(err)
		}

		req.flash('success', 'Signed Out Successfully!')
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