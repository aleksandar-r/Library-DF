import jwt from 'jsonwebtoken'
import { auth, text } from '../config/common'
import UserModel from '../models/User'

export default class JwtUtil {
	constructor() {}

	_newRefreshToken(username) {
		return jwt.sign({ username: username }, process.env.REFRESH_TOKEN_SECRET, {
			expiresIn: auth.refreshTokenExpiry
		})
	}

	_newAccessToken(user) {
		return jwt.sign(
			{
				UserInfo: {
					id: user?._id,
					username: user?.username,
					roles: user?.roles
				}
			},
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: auth.accessTokenExpiry }
		)
	}

	verify(refreshToken) {
		let accessToken

		jwt.verify(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET,
			async (error, decoded) => {
				if (error) {
					throw new Error(text.res.forbidden)
				}

				const foundUser = await UserModel.findOne({
					username: decoded.username
				})

				accessToken = this._newAccessToken(foundUser)
			}
		)

		return accessToken
	}

	createTokens(user) {
		const accessToken = this._newAccessToken(user)
		const refreshToken = this._newRefreshToken(user.username)

		return { accessToken, refreshToken }
	}
}
