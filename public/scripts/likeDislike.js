// function for like-dislike control
function likeDislikeController(type, postId) {
	let headers = new Headers()
	headers.append('Accept', 'Application/JSON')
	headers.append('Content-Type', 'Application/JSON')

	let req = new Request(`/api/${type}/${postId}`, {
		method: 'get',
		mode: 'cors',
		headers,
	})

	return fetch(req)
}

// starting workflow on page load
window.onload = function () {
	// selecting like and dislike buttons here
	const likeBtn = document.getElementById('likeBtn')
	const dislikeBtn = document.getElementById('dislikeBtn')

	// implementing like button functionalities
	likeBtn.addEventListener('click', (event) => {
		let postId = likeBtn.dataset.post
		likeDislikeController('likes', postId)
			.then((res) => res.json())
			.then((data) => {
				let likeTxt = data.liked ? 'liked' : 'like'
				likeTxt = `${likeTxt} - ${data.totallikes}`
				let dislikeTxt = `dislike - ${data.totaldislikes}`

				likeBtn.innerHTML = likeTxt
				dislikeBtn.innerHTML = dislikeTxt
			})
			.catch((err) => {
				console.log(err)
				alert(err.response.data.error)
			})
	})

	// implementing dislike button functionalities
	dislikeBtn.addEventListener('click', (event) => {
		let postId = dislikeBtn.dataset.post
		likeDislikeController('dislikes', postId)
			.then((res) => res.json())
			.then((data) => {
				let dislikeTxt = data.disliked ? 'disliked' : 'dislike'
				dislikeTxt = `${dislikeTxt} - ${data.totaldislikes}`
				let likeTxt = `like - ${data.totallikes}`

				dislikeBtn.innerHTML = dislikeTxt
				likeBtn.innerHTML = likeTxt
			})
			.catch((err) => {
				console.log(err)
				alert(err.response.data.error)
			})
	})
}