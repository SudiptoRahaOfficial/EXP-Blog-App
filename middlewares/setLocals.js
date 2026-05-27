// middleware function for set locals
const setLocals = () => {
	return (req, res, next) => {
		res.locals.user = req.user
		res.locals.isLoggedIn = req.session.isLoggedIn

		next()
	}
}

// exporting setLocals middleware function
module.exports = { setLocals }