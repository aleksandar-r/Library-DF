import { Schema, model } from 'mongoose'
import reviewSchema from './reviewSchema'

const userSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	genre: {
		type: [String],
		required: true
	},
	imageUrl: {
		type: String,
		default:
			'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
	},
	countInStock: {
		type: Number,
		required: true,
		default: 1
	},
	total: {
		type: Number,
		required: true,
		default: 1
	},
	reviews: [reviewSchema]
})

export default model('Book', userSchema)
