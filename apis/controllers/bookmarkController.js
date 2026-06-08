// importing models
const Profile = require('../../models/Profile')

// controller function for bookmarks get route
const bookmarksGetController = async (req, res, next) => {
	// extracting postId
	const { postId } = req.params

	// initializing bookmark with null
	let bookmark = null

	// if requested user is unauthenticated
	if (!req.user) {
		return res.status(403).json({
			error: `You're not authenticated user`,
		})
	}

	// extracting userId
	const userId = req.user._id

	try {
		// finding requested user's profile
		let profile = await Profile.findOne({ user: userId })

		// checking post is already in user profile's bookmarks or not
		if (profile.bookmarks.includes(postId)) {
			// removing post from user profile's bookmarks
			await Profile.findOneAndUpdate(
				{ user: userId },
				{ $pull: { bookmarks: postId } },
			)
			bookmark = false
		} else {
			// adding post to user profile's bookmarks
			await Profile.findOneAndUpdate(
				{ user: userId },
				{ $push: { bookmarks: postId } },
			)
			bookmark = true
		}

		// res back to user
		res.status(200).json({
			bookmark,
		})
	} catch (err) {
		console.log(err)
		return res.status(500).json({
			error: 'Server Error',
		})
	}
}

// exporting controllers
module.exports = { bookmarksGetController }