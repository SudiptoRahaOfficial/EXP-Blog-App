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

// all auth routes
router.get('/signup', signupGetController)
router.post('/signup', signupValidator, signupPostController)
router.get('/signin', signinGetController)
router.post('/signin', signinValidator, signinPostController)
router.get('/signout', signoutController)

// exporting router
module.exports = router