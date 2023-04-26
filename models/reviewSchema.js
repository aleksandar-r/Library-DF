const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Types.ObjectId,
			required: true,
			ref: 'User'
		},
		name: {
			type: String,
			required: true
		},
		rating: {
			type: Number,
			required: true
		},
		comment: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
)

module.exports = reviewSchema
