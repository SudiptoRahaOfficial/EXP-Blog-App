// extracting router form express
const router = require('express').Router()

// importing auth controllers
const { explorerGetController } = require('../controllers/explorerController')

// ALL EXPLORER ROUTES ----------
// explorer get route
router.get('/', explorerGetController)

// exporting router
module.exports = router