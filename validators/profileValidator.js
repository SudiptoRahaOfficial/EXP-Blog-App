// extracting body from express-validator
const { body } = require('express-validator')

// importing models
const Profile = require('../models/Profile')

// validation array for create-profile route
const createProfileValidator = []

// exporting validators
module.exports = {
	createProfileValidator,
}