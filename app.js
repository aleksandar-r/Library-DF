import express from 'express'
import cookieParser from 'cookie-parser'
import { connection } from 'mongoose'
import dotenv from 'dotenv'
import 'express-async-errors'
import path from 'path'
import cors from 'cors'
import { logger, logEvents } from './middleware/logger'
import errorHandler from './middleware/errorHandler'
import corsOptions from './config/corsOptions'

import {
	AuthRoute,
	BookRoute,
	rootRoute,
	CheckoutRoute,
	UserRoute
} from './routes'
import { status, text } from './config/common'

export class Application {
	app = express()
	PORT = process.env.PORT || 3500

	constructor(dbConnection) {
		this.dbConnection = dbConnection
	}

	async initialize() {
		dotenv.config()
		await this.dbConnection.connect()

		if (process.env.NODE_ENV === 'development') {
			this.app.use(logger)
		}

		this.app.use(cors(corsOptions))
		this.app.use(express.json())
		this.app.use(cookieParser())

		this.app.use('/', express.static(path.join(__dirname, '/public')))

		const authRoute = new AuthRoute()
		const bookRoute = new BookRoute()
		const userRoute = new UserRoute()
		const checkoutRoute = new CheckoutRoute()

		this.app.use('/', rootRoute)
		this.app.use('/auth', authRoute.initRoutes)
		this.app.use('/book', bookRoute.initRoutes)
		this.app.use('/user', userRoute.initRoutes)
		this.app.use('/checkout', checkoutRoute.initRoutes)

		// WIP Introducing paypal as payment form
		// TODO app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

		this.app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

		this.app.all('*', (req, res) => {
			res.status(status.notFound)

			if (req.accepts('html')) {
				res.sendFile(path.join(__dirname, 'views', '404.html'))
			} else if (req.accepts('json')) {
				res.json({ message: text.res.notFound })
			} else {
				res.type('txt').send(text.res.notFound)
			}
		})

		this.app.use(errorHandler)
	}

	async startListening() {
		connection.once('open', () => {
			console.log('Connected to MongoDB')
			this.app.listen(this.PORT, () =>
				console.log(`Server running on port ${this.PORT}`)
			)
		})

		connection.on('error', error => {
			console.error(error)
			logEvents(
				`${error.no} : ${error.code}\t${error.syscall}\t${error.hostname}`,
				'mongoErrLog.log'
			)
		})
	}
}
