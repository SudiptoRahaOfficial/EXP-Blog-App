// importing Flash class for alerts
const Flash = require('../utils/Flash')

// controller function for dashboard get route
const dashboardGetController = (req, res, next) => {
	res.render('pages/dashboard/dashboard', {
		title: 'Dashboard | EXP BLOG',
		flashMessage: Flash.getMessage(req),
	})
}

// exporting controllers
module.exports = { dashboardGetController }