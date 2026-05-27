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
	signoutController,
} = require('../controllers/authController')

// importing auth middlewares
const { isUnAuthenticated } = require('../middlewares/authMiddleware')

// all auth routes
router.get('/signup', isUnAuthenticated, signupGetController)
router.post('/signup', isUnAuthenticated, signupValidator, signupPostController)
router.get('/signin', isUnAuthenticated, signinGetController)
router.post('/signin', isUnAuthenticated, signinValidator, signinPostController)
router.get('/signout', signoutController)

// exporting router
module.exports = router