document.addEventListener("DOMContentLoaded", () => {
  const counter = document.getElementById('counter')
  let counterCurrent = parseInt(counter.innerText)

  function incrementTimer() {
    counter.innerText = ++counterCurrent
  }

  function decrementTimer() {
    counter.innerText = --counterCurrent
  }

  let paused = false
  let invervalId
  intervalId = setInterval(incrementTimer, 1000)

  const minusButton = document.getElementById('minus')
  minusButton.addEventListener('click', (e) => {
    decrementTimer()
  })

  const plusButton = document.getElementById('plus')
  plusButton.addEventListener('click', (e) => {
    incrementTimer()
  })

  const likesList = new LikesList()
  const likeList = document.querySelector('ul.likes')
  const renderLikesList = () => (likeList.innerHTML = likesList.renderLikes())

  const heartButton = document.getElementById('heart')
  heartButton.addEventListener('click', (e) => {
    likesList.addLike(counterCurrent)
    renderLikesList()
  })

  const buttonsToDisable = document.querySelectorAll('button.disable')
  const pauseButton = document.getElementById('pause')
  pauseButton.addEventListener('click', (e) => {
    if (paused === false) {
      clearInterval(intervalId)
      buttonsToDisable.forEach((b) => b.disabled = true)
      pauseButton.innerHTML = 'resume'
    } else {
      intervalId = setInterval(incrementTimer, 1000)
      buttonsToDisable.forEach((b) => b.disabled = false)
      pauseButton.innerHTML = 'pause'
    }

    paused = !paused
  })

  const commentsList = new CommentsList()
  const comments = document.querySelector('div.comments')
  const renderCommentsList = () => (comments.innerHTML = commentsList.renderComments())

  const commentInput = document.getElementById('comment-input')
  const commentForm = document.getElementById('comment-form')
  commentForm.addEventListener('submit', (e) => {
    e.preventDefault()
    commentsList.newComment(commentInput.value)

    e.target.reset()
    renderCommentsList()
  })
})

class Like {
  constructor(currentNum) {
    this.currentNum = currentNum
    this.totalLikes = 1
  }

  incrementLikes() {
    this.totalLikes++
  }

  renderLike() {
    return `
      <li>${this.currentNum} has been liked ${this.totalLikes} time.</li>
    `
  }
}

class LikesList {
  constructor() {
    this.list = []
  }

  addLike(currentNum) {
    const existingLike = this.list.filter((l) => l.currentNum === currentNum)

    if (existingLike.length === 0) {
      const newLike = new Like(currentNum)
      this.list.push(newLike)
    } else {
      const like = existingLike[0]
      like.incrementLikes()
    }
  }

  renderLikes() {
    return this.list.map((t) => t.renderLike()).join("")
  }
}

class Comment {
  constructor(comment) {
    this.comment = comment
  }

  renderComment() {
    return `
      <p>${this.comment}</p>
    `
  }
}

class CommentsList {
  constructor() {
    this.list = []
  }

  newComment(comment) {
    const newComment = new Comment(comment)
    this.list.push(newComment)
  }

  renderComments() {
    return this.list.map((c) => c.renderComment()).join("")
  }
}
