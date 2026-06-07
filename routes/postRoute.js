// extracting router form express
const router = require('express').Router()

// importing middlewares
const { isAuthenticated } = require('../middlewares/authMiddleware')
const upload = require('../middlewares/uploadMiddleware')

// importing validators
const { postValidator } = require('../validators/postValidator')

// importing controllers
const {
	createPostGetController,
	createPostPostController,
	editPostGetController,
	editPostPostController,
} = require('../controllers/postController')

// ALL POST ROUTES ----------
// create post get route
router.get('/create', isAuthenticated, createPostGetController)

// create post post route
router.post(
	'/create',
	isAuthenticated,
	upload.single('post-thumbnail'),
	postValidator,
	createPostPostController,
)

// edit post get route
router.get('/edit/:postId', isAuthenticated, editPostGetController)

// edit post post route
router.post(
	'/edit/:postId',
	isAuthenticated,
	upload.single('post-thumbnail'),
	postValidator,
	editPostPostController,
)

// exporting router
module.exports = router