import { Router } from 'express'
import { status, text } from '../config/common'
import CheckoutService from '../services/checkout.service'
import AuthorizationMiddleware from '../middleware/authorize'
import AuthenticationMiddleware from '../middleware/authenticate'

export default class checkoutRoute {
	constructor() {
		this.checkoutRoute = Router()
		this.service = new CheckoutService()
		this.authorize = new AuthorizationMiddleware()
		this.authentication = new AuthenticationMiddleware()
	}

	initRoutes() {
		this.checkoutRoute.use(this.authentication.verifyJWT)

		// Get all checkouts
		this.checkoutRoute.get(
			'/all',
			this.authorize.isEditor,
			async (_req, res, next) => {
				try {
					const checkouts = await this.service.getAllCheckouts()
					res.json(checkouts)
				} catch (error) {
					next(error)
				}
			}
		)

		// Get logged in users checkouts
		this.checkoutRoute.get('/mycheckouts', async (req, res, next) => {
			try {
				const myCheckouts = await this.service.getLoggedInUserCheckouts(
					// @ts-ignore
					req.user.id
				)

				res.json(myCheckouts)
			} catch (error) {
				next(error)
			}
		})

		// Get checkout by id
		this.checkoutRoute.get('/', async (req, res, next) => {
			try {
				const checkout = await this.service.getCheckoutById(req.body.id)
				res.json(checkout)
			} catch (error) {
				next(error)
			}
		})

		// Create checkout
		this.checkoutRoute.post('/', async (req, res, next) => {
			try {
				const newCheckout = await this.service.createNewCheckout(
					// @ts-ignore
					req.user.id,
					req.body
				)

				res.json(newCheckout)
			} catch (error) {
				next(error)
			}
		})

		// Update checkout
		this.checkoutRoute.patch('/', async (req, res, next) => {
			try {
				const updatedCheckout = await this.service.updateCheckout(req.body)
				res.json(updatedCheckout)
			} catch (error) {
				next(error)
			}
		})
	}
}
