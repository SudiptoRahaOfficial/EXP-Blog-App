// extracting body from express-validator
const { body } = require('express-validator')

// importing User model
const User = require('../models/User')

// validation array for signup route
const signupValidator = [
	body('username')
		.trim()
		.isLength({ min: 3, max: 15 })
		.withMessage('username must be between 3 to 15 characters')
		.bail()
		.custom(async (username) => {
			const user = await User.findOne({ username })
			if (user) {
				throw new Error(`${username} is not available`)
			}
		}),
	body('email')
		.normalizeEmail()
		.isEmail()
		.withMessage('provide a valid email')
		.bail()
		.custom(async (email) => {
			const user = await User.findOne({ email })
			if (user) {
				throw new Error(`${email} already have an account`)
			}
		}),
	body('password')
		.isLength({ min: 6 })
		.withMessage('password must be have 6 characters'),
	body('confirmPassword')
		.isLength({ min: 6 })
		.withMessage('password must be have 6 characters')
		.custom((confirmPassword, { req }) => {
			const password = req.body.password
			if (confirmPassword !== password) {
				throw new Error(`password doesn't match`)
			}
			return true
		}),
]

// validation array for signin route
const signinValidator = []

// exporting validators
module.exports = {
	signupValidator,
	signinValidator,
}