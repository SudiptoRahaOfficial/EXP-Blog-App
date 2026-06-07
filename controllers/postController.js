// extracting validationResult from express-validator
const { validationResult } = require('express-validator')

// importing dependencis
const readingTime = require('reading-time')

// importing error formatter
const errorFormatter = require('../utils/validationErrorFormatter')

// importing tagsParser
const tagsParser = require('../utils/tagsParser')

// importing flash
const Flash = require('../utils/Flash')

// importing models
const Post = require('../models/Post')
const Profile = require('../models/Profile')

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
const createPostPostController = async (req, res, next) => {
	// extracting user given data
	let { title, body, tags } = req.body

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

	// making an array of tags
	tags = tagsParser(tags)

	// generating readTime
	let readTime = readingTime(body).text

	// making post obj
	let post = new Post({
		title,
		body,
		author: req.user._id,
		tags,
		thumbnail: '',
		readTime,
		likes: [],
		dislikes: [],
		comments: [],
	})

	// if thumbnail provided then updating thumbnail at post obj
	if (req.file) post.thumbnail = `/uploads/${req.file.filename}`

	try {
		// saving postobj at db
		let createdPost = await post.save()

		// updating posts on profile at db
		await Profile.findOneAndUpdate(
			{ user: req.user._id },
			{ $push: { posts: createdPost._id } },
		)

		// creating flash message
		req.flash('success', 'Post created successfully')

		// after creating post successfully redirecting user to edit-post
		return res.redirect(`/posts/edit/${createdPost._id}`)
	} catch (err) {
		next(err)
	}
}

// controller function for edit-post get route
const editPostGetController = async (req, res, next) => {
	// extracting postId
	const postId = req.params.postId

	try {
		// finding post according to requested user
		const post = await Post.findOne({ author: req.user._id, _id: postId })

		// if post not exists
		if (!post) {
			let error = new Error('404 page not found')
			error.status = 404
			return error
		}
		// if post exists
		res.render('pages/dashboard/post/edit-post', {
			title: 'Edit Post | EXP BLOG',
			errors: {},
			post,
			flashMessage: Flash.getMessage(req),
		})
	} catch (err) {
		next(err)
	}
}

// controller funciton for edit-post post route
const editPostPostController = (req, res, next) => {}

// exporting controllers
module.exports = {
	createPostGetController,
	createPostPostController,
	editPostGetController,
	editPostPostController,
}