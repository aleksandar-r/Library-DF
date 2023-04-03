import { Router } from 'express'
import AuthRoute from './auth.route'
import BookRoute from './book.route'
import rootRoute from './root.route'
import UserRoute from './user.route'
import CheckoutRoute from './checkout.route'

const router = Router()

const authRoute = new AuthRoute()
const bookRoute = new BookRoute()
const userRoute = new UserRoute()
const checkoutRoute = new CheckoutRoute()

router.use('/', rootRoute)
router.use('/auth', authRoute.initRoutes)
router.use('/book', bookRoute.initRoutes)
router.use('/user', userRoute.initRoutes)
router.use('/checkout', checkoutRoute.initRoutes)

export default router
