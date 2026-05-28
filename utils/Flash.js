// making a Flash class for alerts
class Flash {
	constructor(req) {
		this.req = req
		this.success = this.extractFlashMessage('success')
		this.fail = this.extractFlashMessage('fail')
	}

	// method for extracting flash message
	extractFlashMessage(name) {
		const message = this.req.flash(name)
		return message.length > 0 ? message[0] : false
	}

	// method for flash message exist or not
    hasMessage() {
        return !this.success && !this.fail ? false : true
    }

	// static method for getting flash message
	static getMessage(req) {
		const flash = new Flash(req)
		return {
			success: flash.success,
			fail: flash.fail,
			hasMessage: flash.hasMessage()
		}
	}
}

// exporting Flash class
module.exports = Flash