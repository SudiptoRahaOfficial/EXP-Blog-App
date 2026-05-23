// extracting Schema & model from mongoose
const { Schema, model } = require('mongoose')

// importing Profile model
const Profile = require('./Profile')

// making userSchema
const userSchema = new Schema(
	{
		username: {
			type: String,
			trim: true,
			required: true,
			maxlength: 15,
		},
		email: {
			type: String,
			trim: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		profile: {
			type: Schema.Types.ObjectId,
			ref: Profile,
		},
	},
	{ timestamps: true },
)

// making User model by userSchema
const User = model('User', userSchema)

// exporting User model
module.exports = User