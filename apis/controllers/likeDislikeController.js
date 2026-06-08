// importing models
const Post = require('../../models/Post')

// controller function for likes get route
const likesGetController = async (req, res, next) => {
	// extracting postId
	const { postId } = req.params
	// extracting userId
	const userId = req.user._id

	// initializing liked with null
	let liked = null

	// if requested user is unauthenticated
	if (!req.user) {
		return res.status(403).json({
			error: `You're not authenticated user`,
		})
	}

	try {
		// finding requested post to like
		const post = await Post.findById(postId)

		// if requested user disliked then removing dislike
		if (post.dislikes.includes(userId)) {
			await Post.findOneAndUpdate(
				{ _id: postId },
				{ $pull: { dislikes: userId } },
			)
		}

		// decideing like or unlike and add/remove according decision
		if (post.likes.includes(userId)) {
			await Post.findOneAndUpdate(
				{ _id: postId },
				{ $pull: { likes: userId } },
			)
			liked = false
		} else {
			await Post.findOneAndUpdate(
				{ _id: postId },
				{ $push: { likes: userId } },
			)
			liked = true
		}

		// finding updated post after like or dislike
		const updatedPost = await Post.findById(postId)

		// res back to user
		res.status(200).json({
			liked,
			totalLikes: updatedPost.likes.length,
			totaldislikes: updatedPost.dislikes.length,
		})
	} catch (err) {
		console.log(err)
		return res.status(500).json({
			error: 'Server Error',
		})
	}
}

// controller function for dislikes get route
const dislikesGetController = (req, res, next) => {}

// exporting controllers
module.exports = {
	likesGetController,
	dislikesGetController,
}