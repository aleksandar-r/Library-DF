import { Router } from 'express'
import { status, text } from '../config/common'
import BookService from '../services/book.service'
import AuthorizationMiddleware from '../middleware/authorize'
import AuthenticationMiddleware from '../middleware/authenticate'

export default class BookRoute {
	constructor() {
		this.bookRoute = Router()
		this.bookService = new BookService()
		this.authorize = new AuthorizationMiddleware()
		this.authentication = new AuthenticationMiddleware()
	}

	initRoutes() {
		// Get all books
		this.bookRoute.get('/all', async (_req, res) => {
			const books = await this.bookService.getAllBooks()
			res.json(books)
		})

		// Get book by id
		this.bookRoute.get('/', async (req, res) => {
			const book = await this.bookService.getSingleBook(req.body.id)
			res.json(book)
		})

		this.bookRoute.use(this.authentication.verifyJWT)

		// Create book
		this.bookRoute.post('/', this.authorize.isEditor, async (req, res) => {
			const createdBook = await this.bookService.createNewBook(req.body)
			res.json(createdBook)
		})

		// Update book
		this.bookRoute.patch('/', this.authorize.isEditor, async (req, res) => {
			const uptdatedBook = await this.bookService.updateBook(req.body)
			res.json(uptdatedBook)
		})

		// Delete book
		this.bookRoute.delete('/', this.authorize.isAdmin, async (req, res) => {
			const deletedBookConfirmation = await this.bookService.deleteBook(
				req.body.id
			)
			res.json({ message: deletedBookConfirmation })
		})

		// Review book
		this.bookRoute.post('/review', async (req, res) => {
			const createdReviewConfirmation = await this.bookService.createNewReview(
				req.body,
				// @ts-ignore
				req.user
			)

			res.json({ message: createdReviewConfirmation })
		})
	}
}
