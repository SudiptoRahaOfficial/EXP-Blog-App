// 404 catcher
const notFound = (req, res, next) => {
	const err = new Error('Page not found')
	err.status = 404
	next(err)
}

// Central error handler - these 4 parameters required
const errorHandler = (err, req, res, next) => {
	const status = err.status || 500

	if (status === 404) {
		return res.status(404).render('pages/error/404')
	}

	return res.status(500).render('pages/error/500')
}

module.exports = {
	notFound,
	errorHandler,
}