// extracting router form express
const router = require('express').Router()

// importing middlewares
const { isAuthenticated } = require('../../middlewares/authMiddleware')

// importing controllers
const {
	commentPostController,
	repliesPostController,
} = require('../controllers/commentController')

// ALL API ROUTES ----------
// comments post route
router.post('/comments/:postId', isAuthenticated, commentPostController)

// replies post route
router.post(
	'/comments/replies/:commentId',
	isAuthenticated,
	repliesPostController,
)

// exporting router
module.exports = router