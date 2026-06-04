// extracting validationResult from express-validator
const { validationResult } = require('express-validator')

// importing dependencis
const readingTime = require('reading-time')

// importing error formatter
const errorFormatter = require('../utils/validationErrorFormatter')

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
	if (tags) {
		tags = tags.split(',')
	}

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

// exporting controllers
module.exports = {
	createPostGetController,
	createPostPostController,
}