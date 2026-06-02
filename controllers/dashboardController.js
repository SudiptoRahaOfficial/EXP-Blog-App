// importing dependencis
const { validationResult } = require('express-validator')

// importing Profile model
const Profile = require('../models/Profile')

// importing error formatter
const errorFormatter = require('../utils/validationErrorFormatter')

// importing Flash class for alerts
const Flash = require('../utils/Flash')

// controller function for dashboard get route
const dashboardGetController = async (req, res, next) => {
	try {
		// approve dashboard access if user's profile exists
		const profile = await Profile.findOne({ user: req.user._id })
		if (profile) {
			return res.render('pages/dashboard/dashboard', {
				title: 'Dashboard | EXP BLOG',
				flashMessage: Flash.getMessage(req),
			})
		}

		// redirecting to create-profile if profile not exists
		return res.redirect('/dashboard/create-profile')
	} catch (err) {
		next(err)
	}
}

// controller funciton for create-profile get route
const createProfileGetController = (req, res, next) => {
	res.render('pages/dashboard/create-profile', {
		title: 'Create Profile | EXP BLOG',
		flashMessage: {},
		errors: {},
	})
}

// controller funciton for create-profile post route
const createProfilePostController = (req, res, next) => {
	let errors = validationResult(req).formatWith(errorFormatter)
	if (!errors.isEmpty()) {
		res.render('pages/dashboard/create-profile', {
			title: 'Create Profile | EXP BLOG',
			flashMessage: {},
			errors: errors.mapped(),
		})
	}
}

// controller funciton for edit-profile get route
const editProfileGetController = (req, res, next) => {}

// controller funciton for edit-profile post route
const editProfilePostController = (req, res, next) => {}

// exporting controllers
module.exports = {
	dashboardGetController,
	createProfileGetController,
	createProfilePostController,
	editProfileGetController,
	editProfilePostController,
}