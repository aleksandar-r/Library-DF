class MissingValueError extends Error {
	constructor(key) {
		super(`${key} is missing`)
	}
}

module.exports = MissingValueError
