const { text } = require('../config/common/index.js')

class AuthenticationService {
	constructor(token, encrypt, repository) {
		this._token = token
		this._encrypt = encrypt
		this._repository = repository
	}

	// @desc Register
	// @route POST /auth/register
	// @access Public
	async register(username, password, email) {
		const isBodyComplete = [username, email, password].every(Boolean)

		if (!isBodyComplete) {
			throw new Error(text.res.allFieldsReq)
		}
		const duplicateEmail = await this._repository.getByEmail(email)
		if (duplicateEmail) {
			throw new Error(text.res.emailExists)
		}
		const hashedPwd = await this._encrypt.hashValue(password)
		const userObject = { username, password: hashedPwd, roles: [], email }

		const createUser = await this._repository.create(userObject)
		if (!createUser) {
			throw new Error(text.res.invalidUserData)
		}

		const tokens = this._token.createTokens(createUser)
		return tokens
	}

	// @desc   Login
	// @route  POST /auth
	// @access Public
	async login(email, password) {
		const confirmData = [email, password].some(Boolean)
		if (!confirmData) {
			throw new Error(text.res.allFieldsReq)
		}

		const foundUser = await this._repository.getByEmail(email)
		const isFoundUserActive = [foundUser, foundUser?.isActive].some(Boolean)

		if (!isFoundUserActive) {
			throw new Error(text.res.unauthorized)
		}

		const isMatch = await this._encrypt.compare(password, foundUser?.password)

		if (!isMatch) {
			throw new Error(text.res.unauthorized)
		}

		const tokens = this._token.createTokens(foundUser)
		return tokens
	}

	// @desc   Refresh
	// @route  GET /auth/refresh
	// @access Public - because access token has expired
	async refresh(refreshToken) {
		return this._token.verify(refreshToken)
	}
}

module.exports = AuthenticationService
