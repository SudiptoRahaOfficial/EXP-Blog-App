// extracting router form express
const router = require('express').Router()

// importing middlewares
const { isAuthenticated } = require('../../middlewares/authMiddleware')

// importing controllers
const {
	commentPostController,
	repliesPostController,
} = require('../controllers/commentController')
const {
	likesGetController,
	dislikesGetController,
} = require('../controllers/likeDislikeController')

// ALL API ROUTES ----------
// comments post route
router.post('/comments/:postId', isAuthenticated, commentPostController)

// replies post route
router.post(
	'/comments/replies/:commentId',
	isAuthenticated,
	repliesPostController,
)

// likes get route
router.get('/likes/:postId', isAuthenticated, likesGetController)

// dislikes get route
router.get('/dislikes/:postId', isAuthenticated, dislikesGetController)

// exporting router
module.exports = router