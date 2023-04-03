import { Router } from 'express'
import BookService from '../services/book.service'
import AuthorizationMiddleware from '../middleware/authorize'
import AuthenticationMiddleware from '../middleware/authenticate'

export default class BookRoute {
	constructor() {
		this.bookRoute = Router()
		this.service = new BookService()
		this.authorize = new AuthorizationMiddleware()
		this.authentication = new AuthenticationMiddleware()
	}

	initRoutes() {
		// Get all books
		this.bookRoute.get('/all', async (_req, res, next) => {
			try {
				const books = await this.service.getAllBooks()
				res.json(books)
			} catch (error) {
				next(error)
			}
		})

		// Get book by id
		this.bookRoute.get('/', async (req, res, next) => {
			try {
				const book = await this.service.getSingleBook(req.body.id)
				res.json(book)
			} catch (error) {
				next(error)
			}
		})

		this.bookRoute.use(this.authentication.verifyJWT)

		// Create book
		this.bookRoute.post(
			'/',
			this.authorize.isEditor,
			async (req, res, next) => {
				try {
					const createdBook = await this.service.createNewBook(req.body)
					res.json(createdBook)
				} catch (error) {
					next(error)
				}
			}
		)

		// Update book
		this.bookRoute.patch(
			'/',
			this.authorize.isEditor,
			async (req, res, next) => {
				try {
					const uptdatedBook = await this.service.updateBook(req.body)
					res.json(uptdatedBook)
				} catch (error) {
					next(error)
				}
			}
		)

		// Delete book
		this.bookRoute.delete(
			'/',
			this.authorize.isAdmin,
			async (req, res, next) => {
				try {
					const deletedBookConfirmation = await this.service.deleteBook(
						req.body.id
					)
					res.json({ message: deletedBookConfirmation })
				} catch (error) {
					next(error)
				}
			}
		)

		// Review book
		this.bookRoute.post('/review', async (req, res, next) => {
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
