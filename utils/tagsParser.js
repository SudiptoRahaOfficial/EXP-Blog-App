// function for parse tags
function tagsParser(tags) {
	if (tags) {
		let = tags = String(tags)
			.trim()
			.split(',')
			.map((tag) => tag.trim())
			.filter(Boolean)

		return tags
	}
}

// exporting tagsParser
module.exports = tagsParser