import cookieParser from 'cookie-parser'
import express from 'express'
import 'express-async-errors'
import path from 'path'
import cors from 'cors'
import errorHandler from './middleware/errorHandler'
import DBConnection from './config/dbConnection'
import corsOptions from './config/corsOptions'
import Config from './config/app'
import router from './routes'
import App from './app'

const config = new Config()
const dbConnection = new DBConnection()

const middlewares = [
	express.json(),
	cookieParser(),
	cors(corsOptions),
	express.static(path.join(__dirname, '/public'))
]
const errorHandlers = [errorHandler]

const app = new App(config, dbConnection, middlewares, errorHandlers, router)

export default app
