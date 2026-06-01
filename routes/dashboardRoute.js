// extracting router form express
const router = require('express').Router()

// importing middlewares
const { isAuthenticated } = require('../middlewares/authMiddleware')

// importing controllers
const {
	dashboardGetController,
	createProfileGetController,
	createProfilePostController,
	editProfileGetController,
	editProfilePostController,
} = require('../controllers/dashboardController')

// ALL DASHBOARD ROUTES ----------

// edit-profile get route
router.get('/edit-profile', editProfileGetController)
// edit-profile post route
router.post('/edit-profile', editProfilePostController)

// create-profile get route
router.get('/create-profile', createProfileGetController)
// create-profile post route
router.post('/create-profile', createProfilePostController)

// dashboard route
router.get('/', isAuthenticated, dashboardGetController)

// exporting router
module.exports = router