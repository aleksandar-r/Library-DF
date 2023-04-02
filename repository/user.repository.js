import BaseRepository from './base.repository'
import UserModel from '../models/User'

export default class UserRepository extends BaseRepository {
	constructor() {
		super(() => UserModel)
	}

	async getByEmail(email) {
		return await UserModel.findOne({ email })
			.collation({ locale: 'en', strength: 2 })
			.lean()
	}

	async getByUserName(username) {
		return await UserModel.findOne({ username: username })
			.collation({ locale: 'en', strength: 2 })
			.lean()
	}

	async getAllWSelect(selection = '') {
		return await UserModel.find().select(selection).lean().exec()
	}

	async getByIdWSelect(id, selection = '') {
		return await UserModel.findById(id).select(selection).exec()
	}
}
