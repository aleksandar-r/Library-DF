import { connection } from 'mongoose'
import express from 'express'
import path from 'path'
import { logger, logEvents } from '../../middleware/logger'
import { status, text } from '../common'

export class App {
	constructor(config, dbConnection, middlewares, errorHandlers, router, port) {
		this.dbConnection = dbConnection
		this.config = config
		this.app = express()
		this.middlewares = middlewares
		this.errorHandlers = errorHandlers
		this.router = router
		this.port = port || this.config.env.PORT
	}

	async initialize() {
		await this.dbConnection.connect()

		this._initializeMiddlewares(this.middlewares)
		this._initializeRoutes(this.router)
		this._initializeMiddlewares(this.errorHandlers)

		if (this.config.IS_DEVELOPMENT) {
			this.app.use(logger)
		}

		this._missingRoutes()
	}

	async listen() {
		const port = this.port

		connection.once('open', () => {
			console.log('Connected to MongoDB')

			this.server = this.app.listen(port, () =>
				console.log(`Server running on port ${port}`)
			)
		})

		connection.on('error', error => {
			console.error(error)
			logEvents(
				`${error.no} : ${error.code}\t${error.syscall}\t${error.hostname}`,
				'mongoErrLog.log'
			)
		})

		return this.server
	}

	unlisten() {
		if (!this.server) return

		this.server.close()
	}

	getApp() {
		return this.app
	}

	_initializeMiddlewares(middlewares) {
		this.app.use(middlewares)
	}

	_initializeRoutes(router) {
		this.app.use('/', router)
	}

	_missingRoutes() {
		return this.app.all('*', (req, res) => {
			res.status(status.notFound)

			if (req.accepts('html')) {
				res.sendFile(path.join(__dirname, 'views', '404.html'))
			} else if (req.accepts('json')) {
				res.json({ message: text.res.notFound })
			} else {
				res.type('txt').send(text.res.notFound)
			}
		})
	}
}
