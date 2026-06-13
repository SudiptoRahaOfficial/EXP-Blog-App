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

// indexing postSchema fields for search functionality
postSchema.index(
	{
		title: 'text',
		body: 'text',
		tags: 'text',
	},
	{
		weights: {
			title: 5,
			tags: 5,
			body: 3,
		},
	},
)

// making Post model by postSchema
const Post = model('Post', postSchema)

// exporting Post model
module.exports = Post