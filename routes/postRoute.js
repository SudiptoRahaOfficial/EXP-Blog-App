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
	deletePostController,
} = require('../controllers/postController')

// ALL POST ROUTES ----------
// delete post route
router.delete('/delete/:postId', isAuthenticated, deletePostController)

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

// exporting router
module.exports = router