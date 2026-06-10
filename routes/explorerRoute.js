// extracting router form express
const router = require('express').Router()

// importing auth controllers
const {
	explorerGetController,
	singlePostGetController,
} = require('../controllers/explorerController')

// ALL EXPLORER ROUTES ----------
// post details get route
router.get('/:postId', singlePostGetController)

// explorer get route
router.get('/', explorerGetController)

// exporting router
module.exports = router