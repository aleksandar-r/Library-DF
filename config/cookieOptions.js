const { auth } = require('./common/index.js')

const cookieOptions = {
	httpOnly: true, // accesible only by web browser
	secure: true, // https
	sameSite: 'none', // cross-site cookie
	maxAge: auth.cookieMaxAge // cookie expiry
}

module.exports = cookieOptions
