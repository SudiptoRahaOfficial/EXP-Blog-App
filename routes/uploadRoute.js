// extracting router from express
const router = require('express').Router()

// importing middlewares
const { isAuthenticated } = require('../middlewares/authMiddleware')
const upload = require('../middlewares/uploadMiddleware')

// importing controllers
const {
	uploadProfilePic,
	removeProfilePic,
	uploadPostImage,
} = require('../controllers/uploadController')

// route for upload profile pic
router.post(
	'/profilePic',
	isAuthenticated,
	upload.single('profilePic'),
	uploadProfilePic,
)

// route for delete profile pic
router.delete('/profilePic', isAuthenticated, removeProfilePic)

// route for upload post image
router.post(
	'/postimage',
	isAuthenticated,
	upload.single('file'),
	uploadPostImage,
)

// exporting router
module.exports = router