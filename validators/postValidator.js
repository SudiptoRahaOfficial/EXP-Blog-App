// extracting body from express-validator
const { body } = require('express-validator')

// importing dependencis
const cheerio = require('cheerio')

// validation array for create post route
const postValidator = [
	body('title')
		.trim()
		.notEmpty()
		.withMessage(`title can't be empty`)
		.isLength({ max: 100 })
		.withMessage(`title must be under 100 character`),
	body('body')
		.trim()
		.notEmpty()
		.withMessage(`body can't be empty`)
		.custom((value) => {
			let node = cheerio.load(value)
			let text = node.text()

			if (text.length > 5000) {
				throw new Error(`body must be under 5000 character`)
			}
			return true
		}),
	body('tags').trim().notEmpty().withMessage(`tags can't be empty`),
]

// exporting validator
module.exports = { postValidator }