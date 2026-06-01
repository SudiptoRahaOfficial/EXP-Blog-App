// importing dependencis
const multer = require('multer')
const path = require('node:path')

// configuring storage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/uploads')
	},
	filename: (req, file, cb) => {
		cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`)
	},
})

// configuring upload middleware
const upload = multer({
	storage,
	limits: {
		fileSize: 1024 * 1024 * 5,
	},
	fileFilter: (req, file, cb) => {
		const types = /jpeg|jpg|png/
		const ext = types.test(path.extname(file.originalname).toLowerCase())
		const mimetype = types.test(file.mimetype)

		if (ext && mimetype) {
			cb(null, true)
		} else {
			cb(new Error('File format not supported!'))
		}
	},
})

// exporting upload middleware
module.exports = upload