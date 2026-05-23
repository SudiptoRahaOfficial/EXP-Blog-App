// extracting router form express
const router = require('express').Router()

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
router.post('/signup', signupPostController)
router.get('/signin', signinGetController)
router.post('/signin', signinPostController)
router.get('/signout', signoutController)

// exporting router
module.exports = router