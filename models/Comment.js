// extracting Schema & model from mongoose
const { Schema, model } = require('mongoose')

// making commentSchema
const commentSchema = new Schema(
	{
		post: {
			type: Schema.Types.ObjectId,
			ref: 'Post',
			required: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		body: {
			type: String,
			trim: true,
			required: true,
		},
		replies: [
			{
				body: {
					type: String,
					trim: true,
					required: true,
				},
				user: {
					type: Schema.Types.ObjectId,
					ref: 'User',
					required: true,
				},
				createAt: {
					type: Date,
					default: new Date(),
				},
			},
		],
	},
	{ timestamps: true },
)

// making Comment model by commentSchema
const Comment = model('Comment', commentSchema)

// exporting Comment model
module.exports = Comment