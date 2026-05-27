// controller function for dashboard get route
const dashboardGetController = (req, res, next) => {
	res.render('pages/dashboard/dashboard', { title: 'Dashboard | EXP BLOG' })
}

// exporting controllers
module.exports = { dashboardGetController }