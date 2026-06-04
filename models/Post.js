// extracting Schema & model from mongoose
const { Schema, model } = require('mongoose')

// making postSchema
const postSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
			maxlength: 100,
		},
		body: {
			type: String,
			required: true,
			trim: true,
			maxlength: 5000,
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		tags: {
			type: [String],
			required: true,
		},
		thumbnail: String,
		readTime: String,
		likes: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		dislikes: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		comments: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Comment',
			},
		],
	},
	{ timestamps: true },
)

// making Post model by postSchema
const Post = model('Post', postSchema)

// exporting Post model
module.exports = Post