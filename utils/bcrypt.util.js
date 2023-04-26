const bcrypt = require('bcrypt')

class CryptUtil {
	async hashValue(valueToHash) {
		// 10 is default number of salt rounds
		return await bcrypt.hash(valueToHash, 10)
	}

	async compare(pwdFromModel, pwdFromClient) {
		return await bcrypt.compare(pwdFromModel, pwdFromClient)
	}
}

module.exports = CryptUtil
