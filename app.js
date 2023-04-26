const express = require('express')
require('express-async-errors')
const path = require('path')
const cookieParser = require('cookie-parser')
const errorHandler = require('./middleware/errorHandler')
const DBConnection = require('./config/dbConnection')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const Config = require('./config/app')
const router = require('./routes')
const App = require('./config/app/initializer')

const config = new Config()
const dbConnection = new DBConnection()

const middlewares = [
	cookieParser(),
	cors(corsOptions),
	express.json(),
	express.urlencoded({ extended: true }),
	express.static(path.join(__dirname, '/public'))
]
const errorHandlers = [errorHandler]

const app = new App(config, dbConnection, middlewares, errorHandlers, router)

module.exports = app
