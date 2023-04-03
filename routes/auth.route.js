import { Router } from 'express'
import { status, text } from '../config/common'
import AuthService from '../services/auth.service'
import loginLimiter from '../middleware/loginLimiter'
import cookieOptions from '../config/cookieOptions'

export default class AuthRoute {
	constructor() {
		this.route = Router()
		this.service = new AuthService()
	}

	initRoutes() {
		// Login
		this.route.post('/', loginLimiter, async (req, res, next) => {
			try {
				const { username, password } = req.body

				const { accessToken, refreshToken } = await this.service.login(
					username,
					password
				)

				// Create secure cookie with refresh token
				// @ts-ignore
				res.cookie('jwt', refreshToken, cookieOptions)

				res.json({ accessToken })
			} catch (error) {
				next(error)
			}
		})

		// Register
		this.route.post('/register', async (req, res, next) => {
			try {
				const { username, password, email, roles } = req.body
				const { accessToken, refreshToken } = await this.service.register(
					username,
					password,
					email,
					roles
				)
				console.log(accessToken)
				// @ts-ignore
				res.cookie('jwt', refreshToken, cookieOptions)
				res.status(status.created).json({ accessToken })
			} catch (error) {
				next(error)
			}
		})

		// Logout
		this.route.post('/logout', async (req, res, next) => {
			try {
				const cookies = req.cookies

				if (!cookies?.jwt) return res.sendStatus(status.noContent)

				const { httpOnly, sameSite, secure } = cookieOptions
				// @ts-ignore
				res.clearCookie('jwt', { httpOnly, sameSite, secure })

				res.status(status.OK).json({ message: text.res.cookieCleared })
			} catch (error) {
				next(error)
			}
		})

		// Refresh
		this.route.get('/refresh', async (req, res, next) => {
			try {
				const cookies = req.cookies

				if (!cookies?.jwt) {
					return res
						.status(status.unauthorized)
						.json({ message: text.res.unauthorized })
				}

				const accessToken = this.service.refresh(cookies.jwt)
				res.json({ accessToken })
			} catch (error) {
				next(error)
			}
		})
	}
}
