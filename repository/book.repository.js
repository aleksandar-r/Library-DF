import BaseRepository from './base.repository'
import BookModel from '../models/Book'
import Calculate from '../utils/calc.util'

export default class BookRepository extends BaseRepository {
	constructor() {
		super(() => BookModel)
		this.util = new Calculate()
	}

	async createNewReview(id, review) {
		const book = await this.findById(id)

		book.reviews.push(review)
		book.numberOfReviews = book.reviews.length

		book.rating = this.util.calculateReviewRating(book.reviews)

		return await book.save()
	}
}
