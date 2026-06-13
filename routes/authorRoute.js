// extracting router form express
const router = require('express').Router()

// importing controllers
const {
	authorProfileGetController,
} = require('../controllers/authorController')

// importing middlewares
const { isAuthenticated } = require('../middlewares/authMiddleware')

// routes
router.get('/:userId', isAuthenticated, authorProfileGetController)

// exporting router
module.exports = router