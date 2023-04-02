import { Schema, model } from 'mongoose'

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
		default: true
	},
	roles: {
		type: [String],
		default: ['User']
	},
	favorites: {},
	borrowed: {}
})

export default model('User', userSchema)
