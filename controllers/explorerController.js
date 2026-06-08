// importing models
const Post = require('../models/Post')

// importing utilitis
const Flash = require('../utils/Flash')

// controller function for explorer get route
const explorerGetController = async (req, res, next) => {
	try {
		// fetching all stored posts from db
		let posts = await Post.find()

		// rendering explorer page
		res.render('pages/explorer/explorer', {
			title: 'Explore All Posts | EXP BLOG',
			filter: 'latest',
			flashMessage: Flash.getMessage(req),
			posts,
		})
	} catch (err) {
		next(err)
	}
}

// exporting controllers
module.exports = {
	explorerGetController,
}