// importing dependencis
const validator = require('validator')

// extracting body from express-validator
const { body } = require('express-validator')

// importing models
const Profile = require('../models/Profile')

// function for validate links
const linkValidator = (value) => {
	if (value) {
		if (!validator.isURL(value)) {
			throw new Error(`please provide a valid url`)
		}
	}
	return true
}

// validation array for create-profile route
const createProfileValidator = [
	body('name')
		.trim()
		.notEmpty()
		.withMessage(`name can't be empty`)
		.isLength({ max: 20 })
		.withMessage('name must be under 20 characters'),
	body('title')
		.trim()
		.notEmpty()
		.withMessage(`title can't be empty`)
		.isLength({ max: 50 })
		.withMessage('title must be under 50 characters'),
	body('bio')
		.trim()
		.notEmpty()
		.withMessage(`bio can't be empty`)
		.isLength({ max: 500 })
		.withMessage('bio must be under 500 characters'),
	body('facebook').custom(linkValidator),
	body('twitter').custom(linkValidator),
	body('linkedin').custom(linkValidator),
	body('github').custom(linkValidator),
	body('website').custom(linkValidator),
]

// exporting validators
module.exports = {
	createProfileValidator,
}