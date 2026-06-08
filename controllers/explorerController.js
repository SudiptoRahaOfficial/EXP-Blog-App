// importing models
const Post = require('../models/Post')

// importing utilitis
const Flash = require('../utils/Flash')
const generateFilterObj = require('../utils/generateFilter')

// controller function for explorer get route
const explorerGetController = async (req, res, next) => {
	// setting properties at req.query
	let filter = req.query.filter || 'latest'
	let currentPage = parseInt(req.query.page) || 1

	// initializing item-count per page
	const itemPerPage = 10

	// extracting filterObj & order
	let { filterObj, order } = generateFilterObj(filter.toLowerCase())

	try {
		// fetching posts according to filter & pagination
		let posts = await Post.find(filterObj)
			.populate('author', 'username')
			.sort(order === 1 ? '-createdAt' : 'createdAt')
			.skip(itemPerPage * currentPage - itemPerPage)
			.limit(itemPerPage)

		// calculating total post and page count
		let totalPost = await Post.countDocuments()
		let totalPage = totalPost / itemPerPage

		// rendering explorer page
		res.render('pages/explorer/explorer', {
			title: 'Explore All Posts | EXP BLOG',
			flashMessage: Flash.getMessage(req),
			posts,
			filter,
			itemPerPage,
			currentPage,
			totalPage,
		})
	} catch (err) {
		next(err)
	}
}

// exporting controllers
module.exports = {
	explorerGetController,
}