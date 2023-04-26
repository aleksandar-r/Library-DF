const express = require('express')
const AuthenticationMiddleware = require('../middleware/authenticate.js')
const AuthorizationMiddleware = require('../middleware/authorize.js')
const BcryptUtil = require('../utils/bcrypt.util.js')
const JwtUtil = require('../utils/jwt.util.js')
const Calculate = require('../utils/calc.util.js')
const AuthenticationService = require('../services/auth.service.js')
const UserRepository = require('../repository/user.repository.js')
const UserService = require('../services/user.service.js')
const BookRepository = require('../repository/book.repository.js')
const BookService = require('../services/book.service.js')
const CheckoutRepository = require('../repository/checkout.repository.js')
const CheckoutService = require('../services/checkout.service.js')

const AuthRoute = require('./auth.route.js')
const BookRoute = require('./book.route.js')
const rootRoute = require('./root.route.js')
const UserRoute = require('./user.route.js')
const CheckoutRoute = require('./checkout.route.js')

const authenticate = new AuthenticationMiddleware()
const authorize = new AuthorizationMiddleware()
const bcryptUtil = new BcryptUtil()
const calculate = new Calculate()
const jwtUtil = new JwtUtil()

const router = express.Router({ mergeParams: true })

const userRepository = new UserRepository()
const authService = new AuthenticationService(
	jwtUtil,
	bcryptUtil,
	userRepository
)
const authRoute = new AuthRoute(authService)

const bookRepository = new BookRepository(calculate)
const bookService = new BookService(bookRepository)
const bookRoute = new BookRoute(bookService, authorize, authenticate)

const userService = new UserService(userRepository, bcryptUtil)
const userRoute = new UserRoute(userService, authorize, authenticate)

const checkoutRepository = new CheckoutRepository()
const checkoutService = new CheckoutService(checkoutRepository)
const checkoutRoute = new CheckoutRoute(
	checkoutService,
	authorize,
	authenticate
)

router.use('/', rootRoute)
router.use('/auth', authRoute.route)
router.use('/book', bookRoute.route)
router.use('/user', userRoute.route)
router.use('/checkout', checkoutRoute.route)

module.exports = router
