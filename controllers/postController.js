// extracting validationResult from express-validator
const { validationResult } = require('express-validator')

// importing error formatter
const errorFormatter = require('../utils/validationErrorFormatter')

// importing flash
const Flash = require('../utils/Flash')

// controller funciton for create-post get route
const createPostGetController = (req, res, next) => {
	res.render('pages/dashboard/post/create-post', {
		title: 'Create Post | EXP BLOG',
		errors: {},
		value: {},
		flashMessage: Flash.getMessage(req),
	})
}

// controller funciton for create-post post route
const createPostPostController = (req, res, next) => {
	// extracting user given data
	const { title, body, tags } = req.body
	// checking validation errors
	const errors = validationResult(req).formatWith(errorFormatter)
	// if error exists rerendering create-post page with errors
	if (!errors.isEmpty()) {
		return res.render('pages/dashboard/post/create-post', {
			title: 'Create Post | EXP BLOG',
			errors: errors.mapped(),
			value: { title, body, tags },
			flashMessage: Flash.getMessage(req),
		})
	}
}

// exporting controllers
module.exports = {
	createPostGetController,
	createPostPostController,
}