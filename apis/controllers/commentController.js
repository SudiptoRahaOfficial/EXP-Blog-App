// importing models
const Post = require('../../models/Post')
const Comment = require('../../models/Comment')

// controller function for comment post route
const commentPostController = async (req, res, next) => {
	// extracting postId
	const { postId } = req.params
	// extracting body
	const { body } = req.body

	// if requested user is unauthenticated
	if (!req.user) {
		return res.status(403).json({
			error: `You're not authenticated user`,
		})
	}

	// making new commentobj
	let comment = new Comment({
		post: postId,
		user: req.user._id,
		body,
		replies: [],
	})

	try {
		// saving comment at db
		let createdComment = await comment.save()
		// after comment creation updating comments at post
		await Post.findOneAndUpdate(
			{ _id: postId },
			{ $push: { comments: createdComment._id } },
		)

		// making res back json obj
		let commentJSON = await Comment.findById(createdComment._id).populate({
			path: 'user',
			select: 'profilePic username',
		})

		// res back to user
		return res.status(201).json(commentJSON)
	} catch (err) {
		console.log(err)
		return res.status(500).json({
			error: 'Server Error',
		})
	}
}

// controller function for replies post route
const repliesPostController = async (req, res, next) => {
	// extracting commentId
	const { commentId } = req.params
	// extracting reply data
	const { body } = req.body

	// if requested user is unauthenticated
	if (!req.user) {
		return res.status(403).json({
			error: `You're not authenticated user`,
		})
	}

	// making replyobj
	let reply = { body, user: req.user._id }

	try {
		// updating replies at comment
		await Comment.findOneAndUpdate(
			{ _id: commentId },
			{ $push: { replies: reply } },
		)

		// res back to user
		return res.status(201).json({
			...reply,
			profilePic: req.user.profilePic,
		})
	} catch (err) {
		console.log(err)
		return res.status(500).json({
			error: 'Server Error',
		})
	}
}

// exporting controllers
module.exports = {
	commentPostController,
	repliesPostController,
}