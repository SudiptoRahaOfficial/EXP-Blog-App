window.onload = function () {
	const cropElement = document.getElementById('cropped-image')

	const baseCropping = new Croppie(cropElement, {
		viewport: {
			width: 200,
			height: 200,
		},
		boundary: {
			width: 300,
			height: 300,
		},
		showZoomer: true,
		enforceBoundary: true,
	})

	function readableFile(file) {
		const reader = new FileReader()

		reader.onload = function (event) {
			baseCropping
				.bind({
					url: event.target.result,
					points: [0, 0, 500, 500],
				})
				.then(() => {
					const slider = document.querySelector('.cr-slider')
					if (slider) {
						slider.min = 0.1
						slider.max = 1

						// start zoomed out
						slider.value = 0

						// update croppie zoom
						baseCropping.setZoom(0)
					}
				})
		}

		reader.readAsDataURL(file)
	}

	const profilePicFile = document.getElementById('profilePicFile')
	const cropModalElement = document.getElementById('crop-modal')
	const cancelCroppingBtn = document.getElementById('cancel-cropping')
	const uploadBtn = document.getElementById('upload-image')

	const cropModal = new bootstrap.Modal(cropModalElement, {
		backdrop: 'static',
		keyboard: false,
	})

	profilePicFile.addEventListener('change', function () {
		if (this.files && this.files.length > 0) {
			readableFile(this.files[0])
			cropModal.show()
		}
	})

	cancelCroppingBtn.addEventListener('click', function () {
		cropModal.hide()
	})

	uploadBtn.addEventListener('click', function () {
		baseCropping
			.result({
				type: 'blob',
			})
			.then((blob) => {
				let formData = new FormData()

				let file = profilePicFile.files[0]
				let name = generateFileName(file.name)

				formData.append('profilePic', blob, name)

				let headers = new Headers()
				headers.append('Accept', 'application/json')

				let req = new Request('/uploads/profilePic', {
					method: 'POST',
					headers,
					mode: 'cors',
					body: formData,
				})

				return fetch(req)
			})
			.then((res) => res.json())
			.then((data) => {
				document.getElementById('removeProfilePic').style.display =
					'block'
				document.getElementById('profilePic').src = data.profilePic

				cropModal.hide()
			})
	})
}

function generateFileName(name) {
	let types = /(.jpeg|.jpg|.png)/
	return name.replace('png', types)
}