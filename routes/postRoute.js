// extracting router form express
const router = require('express').Router()

// importing controllers
const {
	createPostGetController,
	createPostPostController,
} = require('../controllers/postController')

// ALL POST ROUTES ----------
// create post get route
router.get('/create', createPostGetController)
// create post post route
router.post('/create', createPostPostController)

// exporting router
module.exports = router