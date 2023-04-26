const express = require('express')

class BookRoute {
	constructor(service, authorize, authentication) {
		this.route = express.Router()
		this.service = service
		this.authorize = authorize
		this.authentication = authentication

		this._initRoutes()
	}

	_initRoutes() {
		// Get all books
		this.route.get('/all', async (_req, res, next) => {
			try {
				const books = await this.service.getAllBooks()
				res.json(books)
			} catch (error) {
				next(error)
			}
		})

		// Get book by id
		this.route.get('/', async (req, res, next) => {
			try {
				const book = await this.service.getSingleBook(req.body.id)
				res.json(book)
			} catch (error) {
				next(error)
			}
		})

		this.route.use(this.authentication.verifyJWT)

		// Create book
		this.route.post('/', this.authorize.isEditor, async (req, res, next) => {
			try {
				const createdBook = await this.service.createNewBook(req.body)
				res.json(createdBook)
			} catch (error) {
				next(error)
			}
		})

		// Update book
		this.route.patch('/', this.authorize.isEditor, async (req, res, next) => {
			try {
				const updatedBook = await this.service.updateBook(req.body)
				res.json(updatedBook)
			} catch (error) {
				next(error)
			}
		})

		// Delete book
		this.route.delete('/', this.authorize.isAdmin, async (req, res, next) => {
			try {
				const deletedBookConfirmation = await this.service.deleteBook(
					req.body.id
				)
				res.json({ message: deletedBookConfirmation })
			} catch (error) {
				next(error)
			}
		})

		// Review book
		this.route.post('/review', async (req, res, next) => {
			try {
				const createdReviewConfirmation = await this.service.createNewReview(
					req.body,
					// @ts-ignore
					req.user
				)

				res.json({ message: createdReviewConfirmation })
			} catch (error) {
				next(error)
			}
		})
	}
}

module.exports = BookRoute
