import BaseRepository from './base.repository'
import CheckoutModel from '../models/Checkout'

export default class CheckoutRepository extends BaseRepository {
	constructor() {
		super(() => CheckoutModel)
	}

	async findByIDAndPopulate(id, property, fields) {
		return await CheckoutModel.findById(id).populate(property, fields).exec()
	}

	async findAllAndPopulate(property, fields) {
		return CheckoutModel.find().populate(property, fields)
	}

	async findAllByUserID(id) {
		return CheckoutModel.find({ user: id })
	}
}
