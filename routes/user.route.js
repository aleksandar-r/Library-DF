import { Router } from 'express'
import { status, text } from '../config/common'
import UserService from '../services/user.service'
import AuthorizationMiddleware from '../middleware/authorize'
import AuthenticationMiddleware from '../middleware/authenticate'

export default class userRoute {
	constructor() {
		this.userRoute = Router()
		this.service = new UserService()
		this.authorize = new AuthorizationMiddleware()
		this.authentication = new AuthenticationMiddleware()
	}

	initRoutes() {
		this.userRoute.use(this.authentication.verifyJWT)

		// Get all users
		this.userRoute.get('/all', async (_req, res, next) => {
			try {
				const users = await this.service.getAllUsers()
				res.json(users)
			} catch (error) {
				next(error)
			}
		})

		// Get user by id
		this.userRoute.get('/', async (req, res, next) => {
			try {
				const user = await this.service.getUserByID(req.body.id)
				res.json(user)
			} catch (error) {
				next(error)
			}
		})

		// Create user
		this.userRoute.post(
			'/',
			this.authorize.isEditor,
			async (req, res, next) => {
				try {
					const user = await this.service.createNewUser(req.body)
					res
						.status(status.created)
						// @ts-ignore
						.json({ message: text.res.userCreatedFn(user.username) })
				} catch (error) {
					next(error)
				}
			}
		)

		// Update user
		this.userRoute.patch(
			'/',
			this.authorize.isEditor,
			async (req, res, next) => {
				try {
					const updateUserText = await this.service.updateUser(req.body)
					res.json({ message: updateUserText })
				} catch (error) {
					next(error)
				}
			}
		)

		// Delete user
		this.userRoute.delete(
			'/',
			this.authorize.isAdmin,
			async (req, res, next) => {
				try {
					const deleteUserText = await this.service.deleteUser(req.body)
					res.json({ message: deleteUserText })
				} catch (error) {
					next(error)
				}
			}
		)
	}
}
