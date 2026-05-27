// extracting router form express
const router = require('express').Router()

// importing middlewares
const { isAuthenticated } = require('../middlewares/authMiddleware')

// importing controllers
const { dashboardGetController } = require('../controllers/dashboardController')

// all routes
router.get('/', isAuthenticated, dashboardGetController)

// exporting router
module.exports = router