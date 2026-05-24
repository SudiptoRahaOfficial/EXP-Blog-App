// extracting Schema & model from mongoose
const { Schema, model } = require('mongoose')

// making profileSchema
const profileSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		name: {
			type: String,
			trim: true,
			required: true,
			maxlength: 20,
		},
		title: {
			type: String,
			trim: true,
			maxlength: 50,
		},
		bio: {
			type: String,
			trim: true,
			maxlength: 500,
		},
		profilePic: String,
		links: {
			facebook: String,
			Twitter: String,
			linkedin: String,
			GitHub: String,
			Website: String,
		},
		posts: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Post',
			},
		],
		bookmarks: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Post',
			},
		],
	},
	{ timestamps: true },
)

// making Profile model by profileSchema
const Profile = model('Profile', profileSchema)

// exporting Profile model
module.exports = Profile