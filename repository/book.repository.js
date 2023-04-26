const BaseRepository = require('./base.repository')
const BookModel = require('../models/Book')

class BookRepository extends BaseRepository {
	constructor(util) {
		super(() => BookModel)
		this.util = util
	}

	async createNewReview(id, review) {
		const book = await this.findById(id)

		book.reviews.push(review)
		book.numberOfReviews = book.reviews.length

		book.rating = this.util.calculateReviewRating(book.reviews)

		return await book.save()
	}
}

module.exports = BookRepository
