import { Router } from 'express'
import { status, text } from '../config/common'
import CheckoutService from '../services/checkout.service'
import AuthorizationMiddleware from '../middleware/authorize'
import AuthenticationMiddleware from '../middleware/authenticate'

export default class checkoutRoute {
	constructor() {
		this.checkoutRoute = Router()
		this.checkoutService = new CheckoutService()
		this.authorize = new AuthorizationMiddleware()
		this.authentication = new AuthenticationMiddleware()
	}

	initRoutes() {
		this.checkoutRoute.use(this.authentication.verifyJWT)

		// Get all checkouts
		this.checkoutRoute.get(
			'/all',
			this.authorize.isEditor,
			async (_req, res) => {
				const checkouts = await this.checkoutService.getAllCheckouts()
				res.json(checkouts)
			}
		)

		// Get logged in users checkouts
		this.checkoutRoute.get('/mycheckouts', async (req, res) => {
			const myCheckouts = await this.checkoutService.getLoggedInUserCheckouts(
				// @ts-ignore
				req.user.id
			)

			res.json(myCheckouts)
		})

		// Get checkout by id
		this.checkoutRoute.get('/', async (req, res) => {
			const checkout = await this.checkoutService.getCheckoutById(req.body.id)
			res.json(checkout)
		})

		// Create checkout
		this.checkoutRoute.post('/', async (req, res) => {
			const newCheckout = await this.checkoutService.createNewCheckout(
				// @ts-ignore
				req.user.id,
				req.body
			)

			res.json(newCheckout)
		})

		// Update checkout
		this.checkoutRoute.patch('/', async (req, res) => {
			const updatedCheckout = await this.checkoutService.updateCheckout(
				req.body
			)

			res.json(updatedCheckout)
		})
	}
}
