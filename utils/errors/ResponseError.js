const { status } = require('../../config/common')

class ResponseErorr extends Error {
	constructor(message = '', status = 422, data = {}, code = 0) {
		super(message)
		;(this.status = status), (this.data = data), (this.code = code)
	}

	static ERROR_INFO_MAP = {
		NotFoundError(err) {
			return new ResponseErorr('', status.notFound, err)
		},
		UniqueViolationError(err) {
			return new ResponseErorr('', status.conflict, {
				columns: err.columns,
				table: err.table,
				constraint: err.constraint
			})
		},
		ForeignKeyViolationError(err) {
			return new ResponseErorr('', status.conflict, {
				table: err.table,
				constraint: err.constraint
			})
		},
		NotNullViolationError(_err) {
			return new ResponseErorr('', status.unproEntity)
		},
		UnauthorizedError(err) {
			return new ResponseErorr('Unauthorized', status.unauthorized)
		},
		SyntaxError(err) {
			return new ResponseErorr(err.message, status.badReq, {
				expected: err.expected,
				length: err.length,
				limit: err.limit,
				type: err.type
			})
		},
		ClientError(err) {
			return new ResponseErorr(err.message, status.badReq, {
				body: err.body,
				type: err.type
			})
		},
		ValidationError(err) {
			return new ResponseErorr(err.message, status.unproEntity, err.details)
		},
		ConnectionAbortedError() {
			return new ResponseErorr('Client Closed Request', status.clientClosedReq)
		}
	}
}

module.exports = ResponseErorr
