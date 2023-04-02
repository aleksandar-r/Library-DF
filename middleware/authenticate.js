import jwt from 'jsonwebtoken'
import { text, status } from '../config/common'

class AuthenticateMiddleware {
	constructor() {}

	verifyJWT(req, res, next) {
		const authHeader = req.headers.authorization || req.headers.Authorization

		if (!authHeader?.startsWith('Bearer ')) {
			return res
				.status(status.unauthorized)
				.json({ message: text.res.unauthorized })
		}

		const token = authHeader?.split(' ')[1]

		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
			if (err)
				return res
					.status(status.forbidden)
					.json({ message: text.res.forbidden })
			req.user = {
				id: decoded?.UserInfo?.id,
				username: decoded?.UserInfo?.username
			}
			req.roles = decoded?.UserInfo?.roles
			next()
		})
	}
}

export default AuthenticateMiddleware
