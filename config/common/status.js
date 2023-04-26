const status = {
	OK: 200,
	created: 201,
	accepted: 202,
	noContent: 204,
	movedPerm: 301,
	notModified: 304,
	permRedirect: 308,
	badReq: 400,
	unauthorized: 401,
	payReq: 402,
	forbidden: 403,
	notFound: 404,
	conflict: 409,
	unproEntity: 422,
	tooManyReq: 429,
	clientClosedReq: 499,
	intSrvErr: 500
}

module.exports = status
