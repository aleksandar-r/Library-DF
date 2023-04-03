import BookRepository from '../repository/book.repository'
import { text } from '../config/common'

export default class BookService {
	constructor() {
		this.repository = new BookRepository()
	}

	// @desc   GET all books
	// @route  /book/all
	// @access Public
	async getAllBooks() {
		const books = await this.repository.findAll()
		return books
	}

	// @desc   Get a single book
	// @route  GET /book/
	// @access Public
	async getSingleBook(id) {
		if (!id) {
			throw new Error(text.res.bookIDReq)
		}

		const book = await this.repository.findById(id)

		if (!book) {
			throw new Error(text.res.bookNotFound)
		}

		return book
	}

	// @desc   Create a book
	// @route  POST /book
	// @access Private Editor
	async createNewBook(baseObject) {
		const book = await this.repository.create(baseObject)
		return book
	}

	// @desc   Update book
	// @route  PUT /book
	// @access Private Editor
	async updateBook(updateObject) {
		const book = await this.repository.findById(updateObject.id)

		if (!book) {
			throw new Error(text.res.bookNotFound)
		}

		const result = await this.repository.update(updateObject.id, updateObject)
		return result
	}

	// @desc   Delete single book
	// @route  DELETE /book
	// @access Private Admin
	async deleteBook(id) {
		const book = await this.repository.findById(id)

		if (!book) {
			throw new Error(text.res.bookNotFound)
		}

		const _result = await this.repository.remove(id)
		return text.res.bookRemoved
	}

	// @desc   Create a new review
	// @route  POST /book/review
	// @access Private
	async createNewReview(baseObject, user) {
		const { bookId, rating, comment } = baseObject
		const isBodyComplete = [bookId, rating.toString(), comment].every(Boolean)

		if (!isBodyComplete) {
			throw new Error(text.res.allFieldsReq)
		}

		const book = await this.repository.findById(bookId)

		if (!book) {
			throw new Error(text.res.bookNotFound)
		}

		const alreadyReviewed = book.reviews.find(
			review => review.user.toString() === user.id.toString()
		)

		if (alreadyReviewed) {
			throw new Error(text.res.bookReviewed)
		}

		const review = {
			user: user.id,
			name: user.username,
			rating: Number(rating),
			comment
		}

		await this.repository.createNewReview(user.id, review)
		return text.res.bookReviewFn(book.name)
	}
}
