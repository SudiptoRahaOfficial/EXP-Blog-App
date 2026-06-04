// importing models
const User = require('../models/User')
const Profile = require('../models/Profile')

// importing dependencis
const fs = require('node:fs')

// controller funciton for profile pic upload route
const uploadProfilePic = async (req, res, next) => {
	if (req.file) {
		// old profile pic
		const oldProfilePic = req.user.profilePic
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

			// deleting old picture from storage
			if (oldProfilePic !== '/uploads/default-profile-avater.png') {
				fs.unlink(`public${oldProfilePic}`, (err) => {
					if (err) console.log(err)
				})
			}

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

// controller function for remove profile pic route
const removeProfilePic = (req, res, next) => {
	const defaultProfilePic = `/uploads/default-profile-avater.png`
	const currentProfilePic = req.user.profilePic
	try {
		// updating profile pic at file system
		fs.unlink(`public${currentProfilePic}`, async (err) => {
			// checking profile exists or not
			let profile = await Profile.findOne({ user: req.user._id })
			// updating profile pic at profile if it exists
			if (profile) {
				await Profile.findOneAndUpdate(
					{ user: req.user._id },
					{ $set: { profilePic: defaultProfilePic } },
				)
			}

			// updating profile pic at user
			await User.findOneAndUpdate(
				{ _id: req.user._id },
				{ $set: { profilePic: defaultProfilePic } },
			)
		})

		// sending response
		res.status(200).json({ profilePic: defaultProfilePic })
	} catch (err) {
		console.log(err)

		// sending error message if any error happens
		res.status(500).json({
			message: `Can't remove profile picture!`,
		})
	}
}

// controller function for upload post image
const uploadPostImage = (req, res, next) => {
	if (req.file) {
		return res.status(200).json({
			location: `/uploads/${req.file.filename}`,
		})
	}

	return res.status(500).json({ message: 'Server Error!' })
}

// exporting upload controllers
module.exports = {
	uploadProfilePic,
	removeProfilePic,
	uploadPostImage,
}