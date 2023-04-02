import mongoose from 'mongoose'

export default class DBConnection {
	constructor() {}

	async seedDB(Model, entities) {
		await Model.deleteMany({})
		await Model.insertMany(entities)
	}

	async connect() {
		try {
			// if new fields, not specified in schema are added
			// strictQuery option will determine will they be accepted
			mongoose.set('strictQuery', true)
			await mongoose.connect(process.env.DATABASE_URI)
		} catch (error) {
			console.error(error)
		}
	}
	closeDatabase() {
		throw new Error('Method not implemented.')
	}
	clearDatabase() {
		throw new Error('Method not implemented.')
	}
}
