import ENV from './env'

export default class Config {
	static get env() {
		return this.env
	}

	env = new ENV()
}
