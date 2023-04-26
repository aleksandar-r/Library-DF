const { format } = require('date-fns')
const { v4 } = require('uuid')
const { existsSync } = require('fs')
const { promises } = require('fs')
const { join } = require('path')

const logEvents = async (message, logFileName) => {
	const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss')
	const logItem = `${dateTime}\t${v4()}\t${message}\n`

	try {
		if (!existsSync(join(__dirname, '..', 'logs'))) {
			await promises.mkdir(join(__dirname, '..', 'logs'))
		}
		await promises.appendFile(
			join(__dirname, '..', 'logs', logFileName),
			logItem
		)
	} catch (err) {
		console.log(err)
	}
}

const logger = (req, res, next) => {
	logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
	console.log(`${req.method} ${req.path}`)
	next()
}

module.exports = { logEvents, logger }
