import { text } from '../config/common'
import JwtUtil from '../utils/jwt.util'
import BcryptUtil from '../utils/bcrypt.util'
import UserRepository from '../repository/user.repository'

class AuthenticationService {
	constructor() {
		this._jwtUtil = new JwtUtil()
		this._bcryptUtil = new BcryptUtil()
		this._userRepo = new UserRepository()
	}

	// @desc Register
	// @route POST /auth/register
	// @access Public
	async register(username, password, email, roles) {
		const isBodyComplete = [username, email, password].every(Boolean)

		if (!isBodyComplete) {
			throw new Error(text.res.allFieldsReq)
		}
		const duplicateEmail = await this._userRepo.getByEmail(email)
		if (duplicateEmail) {
			throw new Error(text.res.emailExists)
		}
		const hashedPwd = await this._bcryptUtil.hashValue(password)

		const isRolesInBody = !Array.isArray(roles) || !roles.length
		const userObject = isRolesInBody
			? { username, password: hashedPwd, roles: [], email, active: false }
			: { username, password: hashedPwd, roles, email, active: false }

		const createUser = await this._userRepo.create(userObject)
		if (!createUser) {
			throw new Error(text.res.invalidUserData)
		}

		const tokens = this._jwtUtil.createTokens(createUser)
		return tokens
	}

	// @desc   Login
	// @route  POST /auth
	// @access Public
	async login(username, password) {
		const confirmData = [username, password].some(Boolean)
		if (!confirmData) {
			throw new Error(text.res.allFieldsReq)
		}

		const foundUser = await this._userRepo.getByUserName(username)
		const isFoundUserActive = [foundUser, foundUser?.isActive].some(Boolean)

		if (!isFoundUserActive) {
			throw new Error(text.res.unauthorized)
		}

		const isMatch = await this._bcryptUtil.compare(
			password,
			foundUser?.password
		)

		if (!isMatch) {
			throw new Error(text.res.unauthorized)
		}

		const tokens = this._jwtUtil.createTokens(foundUser)
		return tokens
	}

	// @desc   Refresh
	// @route  GET /auth/refresh
	// @access Public - because access token has expired
	async refresh(refreshToken) {
		return this._jwtUtil.verify(refreshToken)
	}
}

export default AuthenticationService
