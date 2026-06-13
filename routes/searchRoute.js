// extracting router form express
const router = require('express').Router()

// importing controllers
const { searchResultGetController } = require('../controllers/searchController')

// all search routes
router.get('/', searchResultGetController)

// exporting router
module.exports = router