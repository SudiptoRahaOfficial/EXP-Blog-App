// importing models
const User = require('../models/User')

// importing dependencis
const Flash = require('../utils/Flash')

// controller function for author profile get route
const authorProfileGetController = async (req, res, next) => {
	// extracting userId
	const userId = req.params.userId

	try {
		// extracting author & related data by User model query & populate profile & posts
		let author = await User.findById(userId).populate({
			path: 'profile',
			populate: { path: 'posts' },
		})

		// after successful query rendering author page
		res.render('pages/explorer/author', {
			title: `Author | EXP BLOG`,
			flashMessage: Flash.getMessage(req),
			author,
		})
	} catch (err) {
		next(err)
	}
}

// exporting controllers
module.exports = { authorProfileGetController }