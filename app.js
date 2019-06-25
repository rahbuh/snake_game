window.onload = () => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  const startButton = document.querySelector("#start");
  const score = document.querySelector("#score");

  canvas.width = 800;
  canvas.height = 600;
  const xCenter = canvas.width / 2;
  const yCenter = canvas.height / 2;

  const snake = {
    body: [],
    segmentSize: 8,
    color: '#ffffff',
    xDir: 0,
    yDir: -8
  }

  const apple = {
    x: 0,
    y: 0,
    size: 8,
    color: "#ff0000",
    eaten: true
  };

  const game = {
    on: false,
    score: 0,
    speed: 200,
    action: null
  };

  function init() {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    showText("Click Start button to begin");
    createNewSnake();
  }

  function showText(message) {
    ctx.font = "24px Roboto Mono";
    ctx.fillStyle = "#f5f5f6";
    ctx.textAlign = "center";
    ctx.fillText(message, xCenter, yCenter);
  }

  function drawRect(x, y, width, height, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
    ctx.closePath();
  }

  function createNewSnake() {
    snake.body.length = 0;
    for (let i = 0; i < 3; i++) {
      snake.body.push({ x: xCenter, y: yCenter + snake.segmentSize * i });
    }
  }

  function showApple() {
    apple.x = Math.floor(Math.random() * (canvas.width - 20)) + 10;
    apple.y = Math.floor(Math.random() * (canvas.height - 20)) + 10;
    apple.eaten = !apple.eaten;
    drawRect(apple.x, apple.y, apple.size, apple.size, apple.color);
  }
  
  function drawSnake() {
    snake.body.forEach(section => {
      drawRect(section.x, section.y, snake.segmentSize, snake.segmentSize, snake.color);
    });
  }

  function runGame() {
    game.on = !game.on;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    game.action = setInterval(() => {
      if (apple.eaten) {
        showApple();
        console.log('new apple')
      }
      moveSnake();
    }, game.speed);
  }

  function moveSnake() {
    let nextX = snake.body[0].x + snake.xDir;
    let nextY = snake.body[0].y + snake.yDir;

    snake.body.unshift({ x: nextX, y: nextY });
    let segmentToRemove = snake.body.pop();

    drawSnake();
    ctx.clearRect(segmentToRemove.x,segmentToRemove.y,snake.segmentSize,snake.segmentSize);
  }

  function updateScore() {
    game.score += 1;
    score.childNodes[1].innerText = game.score;
  }

  document.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft" && snake.yDir !== 0) {
      snake.xDir = -snake.segmentSize;
      snake.yDir = 0;
    }
    if (e.key === "ArrowRight" && snake.yDir !== 0) {
      snake.xDir = snake.segmentSize;
      snake.yDir = 0;
    }
    if (e.key === "ArrowUp" && snake.xDir !== 0) {
      snake.xDir = 0;
      snake.yDir = -snake.segmentSize;
    }
    if (e.key === "ArrowDown" && snake.xDir !== 0) {
      snake.xDir = 0;
      snake.yDir = snake.segmentSize;
    }
  });

  startButton.addEventListener("click", e => {
    e.preventDefault();
    if (!game.on) {
      runGame();
    }
  });

  init();
};
