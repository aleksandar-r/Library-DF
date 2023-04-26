const { auth, text, status } = require('../config/common')

class AuthorizationMiddleware {
	constructor() {}

	_checkRoles(roles, role) {
		return roles?.includes(role)
	}

	isAdmin(req, res, next) {
		const checkRoles = this._checkRoles(req.roles, auth.role.admin)

		if (!req.user || !checkRoles) {
			return res
				.status(status.unauthorized)
				.json({ message: text.res.unauthorized })
		}

		next()
	}

	isEditor(req, res, next) {
		const checkRoles = this._checkRoles(req.roles, auth.role.editor)

		if (!req.user || !checkRoles) {
			return res
				.status(status.unauthorized)
				.json({ message: text.res.unauthorized })
		}

		next()
	}
}

module.exports = AuthorizationMiddleware
