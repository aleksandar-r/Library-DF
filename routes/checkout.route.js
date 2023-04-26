const express = require('express')
class CheckoutRoute {
	constructor(service, authorize, authentication) {
		this.route = express.Router()
		this.service = service
		this.authorize = authorize
		this.authentication = authentication

		this._initRoutes()
	}

	_initRoutes() {
		this.route.use(this.authentication.verifyJWT)

		// Get all checkouts
		this.route.get('/all', this.authorize.isEditor, async (_req, res, next) => {
			try {
				const checkouts = await this.service.getAllCheckouts()
				res.json(checkouts)
			} catch (error) {
				next(error)
			}
		})

		// Get logged in users checkouts
		this.route.get('/mycheckouts', async (req, res, next) => {
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
		this.route.get('/', async (req, res, next) => {
			try {
				const checkout = await this.service.getCheckoutById(req.body.id)
				res.json(checkout)
			} catch (error) {
				next(error)
			}
		})

		// Create checkout
		this.route.post('/', async (req, res, next) => {
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
		this.route.patch('/', async (req, res, next) => {
			try {
				const updatedCheckout = await this.service.updateCheckout(req.body)
				res.json(updatedCheckout)
			} catch (error) {
				next(error)
			}
		})
	}
}

module.exports = CheckoutRoute
