const express = require('express')
const { status, text } = require('../config/common/index.js')
const loginLimiter = require('../middleware/loginLimiter.js')
const cookieOptions = require('../config/cookieOptions.js')

class AuthRoute {
	constructor(service) {
		this.route = express.Router()
		this.service = service

		this._initRoutes()
	}

	_initRoutes() {
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
				const { username, password, email } = req.body

				const { accessToken, refreshToken } = await this.service.register(
					username,
					password,
					email
				)
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

module.exports = AuthRoute
