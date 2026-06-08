window.onload = function () {
	const bookmarks = document.getElementsByClassName('bookmark')
	;[...bookmarks].forEach((bookmark) => {
		bookmark.style.cursor = 'pointer'
		bookmark.addEventListener('click', (event) => {
			let target = event.target.parentElement

			let headers = new Headers()
			headers.append('Accept', 'Application/JSON')

			let req = new Request(`/api/bookmarks/${target.dataset.post}`, {
				method: 'get',
				mode: 'cors',
				headers,
			})

			fetch(req)
				.then((res) => res.json())
				.then((data) => {
					if (data.bookmark) {
						target.innerHTML =
							'<img src="/images/icons/bookmarked.png" alt="bookmarked" width="20">'
					} else {
						target.innerHTML =
							'<img src="/images/icons/bookmark.png" alt="bookmark" width="20">'
					}
				})
				.catch((err) => {
					console.error(e.response.data.error)
					alert(e.response.data.error)
				})
		})
	})
}