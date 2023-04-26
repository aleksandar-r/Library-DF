const express = require('express')
const { status, text } = require('../config/common/index.js')

class userRoute {
	constructor(service, authorize, authentication) {
		this.route = express.Router()
		this.service = service
		this.authorize = authorize
		this.authentication = authentication

		this._initRoutes()
	}

	_initRoutes() {
		this.route.use(this.authentication.verifyJWT)

		// Get all users
		this.route.get('/all', async (_req, res, next) => {
			try {
				const users = await this.service.getAllUsers()
				res.json(users)
			} catch (error) {
				next(error)
			}
		})

		// Get user by id
		this.route.get('/', async (req, res, next) => {
			try {
				const user = await this.service.getUserByID(req.body.id)
				res.json(user)
			} catch (error) {
				next(error)
			}
		})

		// Create user
		this.route.post('/', this.authorize.isEditor, async (req, res, next) => {
			try {
				const user = await this.service.createNewUser(req.body)
				res
					.status(status.created)
					// @ts-ignore
					.json({ message: text.res.userCreatedFn(user.username) })
			} catch (error) {
				next(error)
			}
		})

		// Update user
		this.route.patch('/', this.authorize.isEditor, async (req, res, next) => {
			try {
				const updateUserText = await this.service.updateUser(req.body)
				res.json({ message: updateUserText })
			} catch (error) {
				next(error)
			}
		})

		// Delete user
		this.route.delete('/', this.authorize.isAdmin, async (req, res, next) => {
			try {
				const deleteUserText = await this.service.deleteUser(req.body)
				res.json({ message: deleteUserText })
			} catch (error) {
				next(error)
			}
		})
	}
}

module.exports = userRoute
