const { Schema, model } = require('mongoose')

const checkoutSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User'
		},
		books: [{ type: Schema.Types.ObjectId, required: true, ref: 'Book' }],
		status: {
			type: String,
			required: true,
			default: 'active'
		}
	},
	{
		timestamps: true
	}
)

module.exports = model('Checkout', checkoutSchema)
