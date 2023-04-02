import { Router } from 'express'
import { status, text } from '../config/common'
import UserService from '../services/user.service'
import AuthorizationMiddleware from '../middleware/authorize'
import AuthenticationMiddleware from '../middleware/authenticate'

export default class userRoute {
	constructor() {
		this.userRoute = Router()
		this.userService = new UserService()
		this.authorize = new AuthorizationMiddleware()
		this.authentication = new AuthenticationMiddleware()
	}

	initRoutes() {
		this.userRoute.use(this.authentication.verifyJWT)

		// Get all users
		this.userRoute.get('/all', async (_req, res) => {
			const users = await this.userService.getAllUsers()
			res.json(users)
		})

		// Get user by id
		this.userRoute.get('/', async (req, res) => {
			const user = await this.userService.getUserByID(req.body.id)
			res.json(user)
		})

		// Create user
		this.userRoute.post('/', this.authorize.isEditor, async (req, res) => {
			const user = await this.userService.createNewUser(req.body)
			res
				.status(status.created)
				// @ts-ignore
				.json({ message: text.res.userCreatedFn(user.username) })
		})

		// Update user
		this.userRoute.patch('/', this.authorize.isEditor, async (req, res) => {
			const updateUserText = await this.userService.updateUser(req.body)
			res.json({ message: updateUserText })
		})

		// Delete user
		this.userRoute.delete('/', this.authorize.isAdmin, async (req, res) => {
			const deleteUserText = await this.userService.deleteUser(req.body)
			res.json({ message: deleteUserText })
		})
	}
}
