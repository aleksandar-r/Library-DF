const BaseRepository = require('./base.repository.js')
const CheckoutModel = require('../models/Checkout.js')

class CheckoutRepository extends BaseRepository {
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

module.exports = CheckoutRepository
