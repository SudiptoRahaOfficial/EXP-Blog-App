// function for escapes HTML special characters
function escapeHTML(str) {
	if (!str) return ''
	return String(str)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#x27;')
}

// function for generate request
function generateRequest(url, method, body) {
	let headers = new Headers()
	headers.append('Accept', 'Application/JSON')
	headers.append('Content-Type', 'Application/JSON')

	return new Request(url, {
		method,
		headers,
		body: JSON.stringify(body),
		mode: 'cors',
	})
}

// fucntion for create comment
function createComment(comment) {
	let innerHTML = `
        <img
            src="${escapeHTML(comment.user.profilePic || '/images/default-avatar.png')}"
            class="rounded-circle flex-shrink-0 me-3"
            style="width: 40px; height: 40px; object-fit: cover; object-position: center;"
            alt="commenter"
            onerror="this.src='/images/default-avatar.png'"
        />
        <div class="flex-grow-1 my-3">
            <p class="mb-1">${escapeHTML(comment.body)}</p>
            <div class="my-2">
                <input
                    type="text"
                    class="form-control form-control-sm"
                    name="reply"
                    data-comment="${escapeHTML(comment._id)}"
                    placeholder="press enter to reply"
                />
            </div>
        </div>
    `

	let div = document.createElement('div')
	div.className = 'd-flex border p-2 mb-2'
	div.innerHTML = innerHTML

	return div
}

// starting workflow on page load
window.onload = function () {
	const comment = document.getElementById('comment')
	const commentHolder = document.getElementById('comment-holder')

	comment.addEventListener('keypress', (event) => {
		if (event.key.toLowerCase() === 'enter') {
			if (event.target.value.trim()) {
				let postId = comment.dataset.post
				let data = { body: event.target.value.trim() }
				let req = generateRequest(
					`/api/comments/${postId}`,
					'post',
					data,
				)

				fetch(req)
					.then((res) => res.json())
					.then((data) => {
						let commentElement = createComment(data)
						commentHolder.insertBefore(
							commentElement,
							commentHolder.children[0],
						)
						event.target.value = ''
					})
					.catch((error) => {
						console.log(error)
						alert(error.message)
					})
			} else {
				alert('please enter a valid comment!')
			}
		}
	})
}