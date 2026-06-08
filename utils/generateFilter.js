// importing dependencis
const moment = require('moment')

// function for generate date
function generateDate(days) {
	let date = moment().subtract(days, 'days')
	return date.toDate()
}

// function for generate filterobj
function generateFilterObj(filter) {
	let filterObj = {}
	let order = 1

	switch (filter) {
		case 'week': {
			filterObj = {
				createdAt: {
					$gt: generateDate(7),
				},
			}
			order: -1
			break
		}
		case 'month': {
			filterObj = {
				createdAt: {
					$gt: generateDate(30),
				},
			}
			order: -1
			break
		}
		case 'all': {
			order: -1
			break
		}
	}

	return { filterObj, order }
}

// exporting generateFilterObj
module.exports = generateFilterObj