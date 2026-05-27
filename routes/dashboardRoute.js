// extracting router form express
const router = require('express').Router()

// importing controller
const { dashboardGetController } = require('../controllers/dashboardController')

// all routes
router.get('/', dashboardGetController)

// exporting router
module.exports = router