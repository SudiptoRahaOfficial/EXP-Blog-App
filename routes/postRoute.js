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
} = require('../controllers/postController')

// ALL POST ROUTES ----------
// create post get route
router.get('/create', createPostGetController)
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