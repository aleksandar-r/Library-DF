const { Schema, model, Types } = require('mongoose')

const userSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	isActive: {
		type: Boolean,
		default: true
	},
	comment: {
		type: String,
		default: 'No comment about this user.'
	},
	roles: {
		type: [String],
		default: ['User']
	},
	favorites: {
		type: [{ type: Types.ObjectId, required: true, ref: 'Book' }],
		default: []
	}
})

module.exports = model('User', userSchema)
