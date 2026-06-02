// importing models
const User = require('../models/User')
const Profile = require('../models/Profile')

// controller funciton for profile pic upload route
const uploadProfilePic = async (req, res, next) => {
	if (req.file) {
		// profile pic source
		const profilePic = `/uploads/${req.file.filename}`
		try {
			// checking profile exists or not
			const profile = await Profile.findOne({ user: req.user._id })
			// updating profile pic at profile if it exists
			if (profile) {
				await Profile.findOneAndUpdate(
					{ user: req.user._id },
					{ $set: { profilePic } },
				)
			}

			// updating profile pic at user
			await User.findOneAndUpdate(
				{ _id: req.user._id },
				{ $set: { profilePic } },
			)

			// sending response
			res.status(200).json({ profilePic })
		} catch (err) {
			// sending existing profile pic if any error catched
			res.status(500).json({ profilePic: req.user.profilePic })
		}
	} else {
		// sending existing profile pic if file not found
		res.status(500).json({ profilePic: req.user.profilePic })
	}
}

// exporting upload controllers
module.exports = {
	uploadProfilePic,
}