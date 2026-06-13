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
            style="width: 30px; height: 30px; object-fit: cover; object-position: center;"
            alt="commenter"
            onerror="this.src='/images/default-avatar.png'"
        />
        <div>
            <p>${escapeHTML(comment.body)}</p>
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

// fucntion for create reply
function createReply(reply) {
	let innerHTML = `
        <img
            src="${escapeHTML(reply.profilePic || '/images/default-avatar.png')}"
            class="rounded-circle flex-shrink-0 me-3"
            style="width: 25px; height: 25px; object-fit: cover; object-position: center;"
            alt="commenter"
            onerror="this.src='/images/default-avatar.png'"
        />
        <div>
            <p>${escapeHTML(reply.body)}</p>
        </div>
    `

	let div = document.createElement('div')
	div.className = 'd-flex'
	div.innerHTML = innerHTML

	return div
}

// starting workflow on page load
window.addEventListener('load', function () {
	const comment = document.getElementById('comment')
	const commentHolder = document.getElementById('comment-holder')

	if (comment) {
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

	if (commentHolder) {
		commentHolder.addEventListener('keypress', (event) => {
			if (commentHolder.hasChildNodes(event.target)) {
				if (event.key.toLowerCase() === 'enter') {
					let commentId = event.target.dataset.comment
					let value = event.target.value

					if (value) {
						let data = { body: value }
						let req = generateRequest(
							`/api/comments/replies/${commentId}`,
							'post',
							data,
						)
						fetch(req)
							.then((res) => res.json())
							.then((data) => {
								let replyElement = createReply(data)
								let parent = event.target.parentElement
								parent.previousElementSibling.appendChild(
									replyElement,
								)
								event.target.value = ''
							})
							.catch((error) => {
								console.log(error)
								alert(error.message)
							})
					} else {
						alert('please enter a valid reply')
					}
				}
			}
		})
	}
})