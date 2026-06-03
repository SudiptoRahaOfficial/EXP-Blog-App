// importing flash
const Flash = require('../utils/Flash')

// controller funciton for create-post get route
const createPostGetController = (req, res, next) => {
	res.render('pages/dashboard/post/create-post', {
		title: 'Create Post | EXP BLOG',
		error: {},
		flashMessage: Flash.getMessage(req),
	})
}

// controller funciton for create-post post route
const createPostPostController = (req, res, next) => {}

// exporting controllers
module.exports = {
	createPostGetController,
	createPostPostController,
}