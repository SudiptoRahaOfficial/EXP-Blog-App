// importing models
const Post = require('../models/Post')
const Profile = require('../models/Profile')

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

		// initializing bookmark with empty array
		let bookmarks = []
		// if user authenticated
		if (req.user) {
			// finding requested user's profile
			const profile = await Profile.findOne({ user: req.user._id })
			// checking user's profile exists or not
			if (profile) {
				bookmarks = profile.bookmarks
			}
		}

		// rendering explorer page
		res.render('pages/explorer/explorer', {
			title: 'Explore All Posts | EXP BLOG',
			flashMessage: Flash.getMessage(req),
			posts,
			filter,
			itemPerPage,
			currentPage,
			totalPage,
			bookmarks,
		})
	} catch (err) {
		next(err)
	}
}

// controller function for single post get route
const singlePostGetController = async (req, res, next) => {
	// extracting postId
	const { postId } = req.params

	try {
		// finding requested post & populating required datas
		let post = await Post.findById(postId)
			.populate('author', 'username profilePic')
			.populate({
				path: 'comments',
				populate: {
					path: 'user',
					select: 'username profilePic',
				},
			})
			.populate({
				path: 'comments',
				populate: {
					path: 'replies.user',
					select: 'username profilePic',
				},
			})

		// checking post exists or not
		if (!post) {
			// throwing 404 error
			let error = new Error('404 page not found')
			error.status = 404
			throw error
		}

		// initializing bookmark with empty array
		let bookmarks = []
		// if user authenticated
		if (req.user) {
			// finding requested user's profile
			const profile = await Profile.findOne({ user: req.user._id })
			// checking user's profile exists or not
			if (profile) {
				bookmarks = profile.bookmarks
			}
		}

		// rendering post details page
		res.render('pages/explorer/postDetails', {
			title: `${post.title} | EXP BLOG`,
			flashMessage: Flash.getMessage(req),
			post,
			bookmarks,
		})
	} catch (err) {
		next(err)
	}
}

// exporting controllers
module.exports = {
	explorerGetController,
	singlePostGetController,
}