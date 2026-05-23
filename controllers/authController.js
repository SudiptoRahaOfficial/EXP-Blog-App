// controller for signup get route
const signupGetController = (req, res, next) => {
	res.render('pages/auth/signup', { title: 'Create an account' })
}

// controller for signup post route
const signupPostController = (req, res, next) => {}

// controller for signin get route
const signinGetController = (req, res, next) => {}

// controller for signin post route
const signinPostController = (req, res, next) => {}

// controller for signout route
const signoutController = (req, res, next) => {}

// exporting all controllers
module.exports = {
	signupGetController,
	signupPostController,
	signinGetController,
	signinPostController,
	signoutController,
}