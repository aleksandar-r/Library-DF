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
		productReviewed: 'Product already reviewed',
		productNotFound: 'Product not found.',
		productRemoved: 'Product removed',
		productIDReq: 'Product ID required.',
		pwdReq: 'Password field required.',
		pwdMatch: 'Password is unchanged.',
		orderNoItems: 'No order items.',
		orderNotFound: 'Order not found.',
		orderIDReq: 'Order ID required.',
		productReviewFn: product => `Added review for ${product}`,
		userUpdatedFn: username => `Updated user ${username}`,
		userCreatedFn: username => `Created new user ${username}`,
		userDeletedFn: (username, id) => `Deleted user ${username} with ID ${id}`
	}
}

export default text
