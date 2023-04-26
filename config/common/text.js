const text = {
	res: {
		allFieldsExcPwd: 'All fields except password are required.',
		invalidUserData: 'Invalid user data received',
		usernameDuplicate: 'Username is duplicate.',
		emailExists: 'Username already exists.',
		allFieldsReq: 'All fields are required.',
		userNotCreated: 'User is not created.',
		cookieCleared: 'Cookie cleared.',
		noUsersFound: 'No users found.',
		userNotFound: 'User not found.',
		userIDReq: 'User ID required.',
		unauthorized: 'Unauthorized.',
		notFound: '404 Not Found',
		forbidden: 'Forbidden.',
		bookReviewed: 'Book already reviewed',
		bookNotFound: 'Book not found.',
		bookRemoved: 'Book removed',
		bookIDReq: 'Book ID required.',
		pwdReq: 'Password field required.',
		pwdMatch: 'Password is unchanged.',
		checkoutNoItems: 'No checkout items.',
		checkoutNotFound: 'Checkout not found.',
		checkoutIDReq: 'Checkout ID required.',
		booktReviewFn: book => `Added review for ${book}`,
		userUpdatedFn: username => `Updated user ${username}`,
		userCreatedFn: username => `Created new user ${username}`,
		userDeletedFn: (username, id) => `Deleted user ${username} with ID ${id}`
	}
}

module.exports = text
