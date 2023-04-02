export default class BaseRepository {
	constructor(resolveModelFn) {
		if (!resolveModelFn) {
			throw new Error('You must specify which collection you want to query')
		}

		this._mongooseModel = resolveModelFn()
	}

	create = async objectToCreate => {
		return await this._mongooseModel.create(objectToCreate)
	}

	findById = async id => {
		return await this._mongooseModel.findById({ _id: id }).lean()
	}

	findAll = async () => {
		return await this._mongooseModel.find().lean()
	}

	remove = async id => {
		return await this._mongooseModel.remove({ _id: id }).lean()
	}

	update = async (id, baseObject) => {
		return await this._mongooseModel
			.updateOne({ _id: id }, { baseObject })
			.lean()
	}
}
