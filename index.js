window.addEventListener('load', () => {
  const ball = document.getElementById('ball')
  const paddle = document.getElementById('paddle')
  const scoreDisplay = document.getElementById('score')

  const screenWidth = 500
  const screenHeight = 800
  const ballDiameter = 50
  const paddleWidth = 150
  const paddleHeight = 20

  let score = 0
  let gameOver = false

  let ballX = 0
  let ballY = 0
  let ballDirectionX = 6
  let ballDirectionY = 6

  let paddleX = 175
  let paddleDirectionX = 0

  const renderBall = () => {
    // Right side
    if (ballX > screenWidth - ballDiameter) {
      ballDirectionX *= -1
    }
    // Left side
    if (ballX < 0) {
      ballDirectionX *= -1
    }
    //Top side
    if (ballY < 0) {
      ballDirectionY *= -1
    }
    // Bottom side
    if (
      ballY > screenHeight - ballDiameter - paddleHeight &&
      ballX > paddleX &&
      ballX < paddleX + paddleWidth
    ) {
      ballDirectionY *= -1
      score += 10
      ballDirectionX *= 1.1
      ballDirectionY *= 1.1
      if (score >= 100) {
        gameOver = true
      }
    } else if (
      ballY > screenHeight - ballDiameter - paddleHeight &&
      (ballX < paddleX || ballX > paddleX + paddleWidth)
    ) {
      gameOver = true
    }
    ballX += ballDirectionX
    ballY += ballDirectionY
    ball.style.left = `${ballX}px`
    ball.style.top = `${ballY}px`
  }

  const renderPaddle = () => {
    paddleX += paddleDirectionX
    if (paddleX < 0) {
      paddleX = 0
    }
    if (paddleX > screenWidth - paddleWidth) {
      paddleX = screenWidth - paddleWidth
    }
    paddle.style.left = `${paddleX}px`
  }

  const renderScore = () => {
    scoreDisplay.innerText = score
  }

  const intervalId = setInterval(() => {
    renderBall()
    renderPaddle()
    renderScore()

    if (gameOver) {
      console.log('gameover')
      clearInterval(intervalId)
    }
  }, 1000 / 60)

  document.addEventListener('keydown', event => {
    if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
      console.log('go left !')
      paddleDirectionX = -10
    }
    if (event.code === 'KeyD' || event.code === 'ArrowRight') {
      console.log('go right !')
      paddleDirectionX = 10
    }
  })
  document.addEventListener('keyup', event => {
    if (
      event.code === 'KeyA' ||
      event.code === 'ArrowLeft' ||
      event.code === 'KeyD' ||
      event.code === 'ArrowRight'
    ) {
      paddleDirectionX = 0
    }
  })
})
