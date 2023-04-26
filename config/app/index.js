const ENV = require('./env.js')

class Config {
	static get env() {
		return this.env
	}

	env = new ENV()
}

module.exports = Config
