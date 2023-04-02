import { text } from '../config/common'
import CheckoutRepository from '../repository/checkout.repository'

export default class CheckoutService {
	constructor() {
		this.repository = new CheckoutRepository()
	}

	// @desc   Get all checkouts
	// @route  GET /checkout/all
	// @access Private Editor
	async getAllCheckouts() {
		const checkouts = this.repository.findAllAndPopulate(
			'user',
			'id name status'
		)
		return checkouts
	}

	// @desc   Get logged in users checkouts
	// @route  GET /checkout/mycheckouts
	// @access Private
	async getLoggedInUserCheckouts(id) {
		const checkouts = await this.repository.findAllByUserID(id)
		return checkouts
	}

	// @desc   Get checkout by id
	// @route  GET /checkout
	// @access Private
	async getCheckoutById(id) {
		if (!id) {
			throw new Error(text.res.checkoutIDReq)
		}

		const checkout = await this.repository.findByIDAndPopulate(
			id,
			'user',
			'name email'
		)

		if (!checkout) {
			throw new Error(text.res.checkoutNotFound)
		}
		return checkout
	}

	// @desc   Create new checkout
	// @route  POST /checkout
	// @access Private
	async createNewCheckout(id, baseObject) {
		const { books } = baseObject

		const checkoutItemsExist = [books, books?.length].every(Boolean)

		if (!checkoutItemsExist) {
			throw new Error(text.res.checkoutNoItems)
		}

		const newCheckout = {
			user: id,
			books
		}

		const createdCheckout = await this.repository.create(newCheckout)
		return createdCheckout
	}

	// @desc   Update checkout
	// @route  PATCH /checkout
	// @access Private Admin
	async updateCheckout(paymentObject) {
		if (!paymentObject.id) {
			throw new Error(text.res.checkoutIDReq)
		}

		const { id, status, books } = paymentObject

		const checkout = await this.repository.findById(id)

		if (!checkout) {
			throw new Error(text.res.checkoutNotFound)
		}

		const updateObject = {
			status,
			books
		}

		const result = await this.repository.update(id, updateObject)
		return result
	}
}
