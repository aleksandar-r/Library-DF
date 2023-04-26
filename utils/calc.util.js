class Calculate {
	constructor() {}

	calculateReviewRating = reviews => {
		if (!reviews) return 0

		const sumReviews = reviews.reduce((acc, item) => item.rating + acc, 0)
		return sumReviews / reviews?.length
	}
}

module.exports = Calculate
