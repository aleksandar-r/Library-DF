import bcrypt from 'bcrypt'

export default class CryptUtil {
	async hashValue(valueToHash) {
		// 10 is number of salt rounds, it is default
		return await bcrypt.hash(valueToHash, 10)
	}

	async compare(pwdFromModel, pwdFromClient) {
		return await bcrypt.compare(pwdFromModel, pwdFromClient)
	}
}
