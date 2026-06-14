// extracting router form express
const router = require('express').Router()

// importing validators
const {
	signupValidator,
	signinValidator,
} = require('../validators/authValidator')

// importing auth controllers
const {
	signupGetController,
	signupPostController,
	signinGetController,
	signinPostController,
	changePasswordGetController,
	changePasswordPostController,
	signoutController,
} = require('../controllers/authController')

// importing auth middlewares
const {
	isUnAuthenticated,
	isAuthenticated,
} = require('../middlewares/authMiddleware')

// all auth routes
// signup routes
router.get('/signup', isUnAuthenticated, signupGetController)
router.post('/signup', isUnAuthenticated, signupValidator, signupPostController)

// signin routes
router.get('/signin', isUnAuthenticated, signinGetController)
router.post('/signin', isUnAuthenticated, signinValidator, signinPostController)

// change password routes
router.get('/changePassword', isAuthenticated, changePasswordGetController)
router.post('/changePassword', isAuthenticated, changePasswordPostController)

// signout route
router.get('/signout', signoutController)

// exporting router
module.exports = router