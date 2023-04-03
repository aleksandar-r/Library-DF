const { logEvents } = require('./logger')

const errorHandler = (err, req, res, next) => {
	if (res.headersSent) {
		return next(err)
	}

	logEvents(
		`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
		'errLog.log'
	)

	const status = res.statusCode ? res.statusCode : 500 // server error

	res.status(status)

	res.json({ message: err.message, isError: true })
}

export default errorHandler
