// importing models
const Post = require('../models/Post')

// importing dependencis
const Flash = require('../utils/Flash')

// controller function for getting search result
const searchResultGetController = async (req, res, next) => {
	// extracting required data
	let term = req.query.term
	let currentPage = parseInt(req.query.page) || 1
	let itemPerPage = 10

	try {
		// search functionality for posts
		let posts = Post.find({ $text: { $search: term } })
			.skip(itemPerPage * currentPage - itemPerPage)
			.limit(itemPerPage)

		// calculating totalPost and totalPage
		let totalPost = await Post.countDocuments({ $text: { $search: term } })
		let totalPage = totalPost / itemPerPage

		// rendering sreach result page
		res.render('pages/explorer/search', {
			title: `Search Result - ${term} | EXP BLOG`,
			flashMessage: Flash.getMessage(req),
			searchTerm: term,
			itemPerPage,
			currentPage,
			totalPage,
			posts,
		})
	} catch (err) {
		next(err)
	}
}

// exporting controllers
module.exports = { searchResultGetController }