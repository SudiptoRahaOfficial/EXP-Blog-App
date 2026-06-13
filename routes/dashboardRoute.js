// extracting router form express
const router = require('express').Router()

// importing validators
const profileValidator = require('../validators/profileValidator')

// importing middlewares
const { isAuthenticated } = require('../middlewares/authMiddleware')

// importing controllers
const {
	dashboardGetController,
	createProfileGetController,
	createProfilePostController,
	editProfileGetController,
	editProfilePostController,
	bookmarksGetController,
	commentsGetController,
} = require('../controllers/dashboardController')

// ALL DASHBOARD ROUTES ----------

// comments get route
router.get('/comments', isAuthenticated, commentsGetController)

// bookmarks get route
router.get('/bookmarks', isAuthenticated, bookmarksGetController)

// edit-profile get route
router.get('/edit-profile', isAuthenticated, editProfileGetController)
// edit-profile post route
router.post(
	'/edit-profile',
	isAuthenticated,
	profileValidator,
	editProfilePostController,
)

// create-profile get route
router.get('/create-profile', isAuthenticated, createProfileGetController)
// create-profile post route
router.post(
	'/create-profile',
	isAuthenticated,
	profileValidator,
	createProfilePostController,
)

// dashboard route
router.get('/', isAuthenticated, dashboardGetController)

// exporting router
module.exports = router