import ResponseErorr from './ResponseError'
import { status } from '../../config/common'

const isNotProduction = process.env.NODE_ENV !== 'production'

export const buildError = err => {
	if (err instanceof ResponseErorr) return err

	const fetchErrorInfoFunction =
		ResponseErorr.ERROR_INFO_MAP[err.name || err.constructor.name]

	if (fetchErrorInfoFunction) {
		return fetchErrorInfoFunction(err)
	}

	if (isNotProduction) {
		const message = err.message || err.toString()
		return new ResponseErorr(message, status.intSrvErr)
	}

	return new ResponseErorr('Something went wrong...', status.intSrvErr)
}
