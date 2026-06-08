// importing models
const Post = require('../models/Post')

// importing utilitis
const Flash = require('../utils/Flash')
const generateFilterObj = require('../utils/generateFilter')

// controller function for explorer get route
const explorerGetController = async (req, res, next) => {
	// extracting & setting filter
	let filter = req.query.filter || 'latest'

	// extracting filterObj & order
	let { filterObj, order } = generateFilterObj(filter.toLowerCase())

	try {
		// fetching all stored posts from db
		let posts = await Post.find(filterObj)
			.populate('author', 'username')
			.sort(order === 1 ? '-createdAt' : 'createdAt')

		// rendering explorer page
		res.render('pages/explorer/explorer', {
			title: 'Explore All Posts | EXP BLOG',
			flashMessage: Flash.getMessage(req),
			filter,
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