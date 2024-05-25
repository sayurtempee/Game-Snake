const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

let snake = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 }
];

let food = {
  x: Math.floor(Math.random() * 40) * 10,
  y: Math.floor(Math.random() * 40) * 10
};

let score = 0;

let direction = "RIGHT";

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      direction = "UP";
      break;
    case "ArrowDown":
      direction = "DOWN";
      break;
    case "ArrowLeft":
      direction = "LEFT";
      break;
    case "ArrowRight":
      direction = "RIGHT";
      break;
  }
});

function drawSnake() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "red";
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
  }
}

function moveSnake() {
  let newX = snake[0].x;
  let newY = snake[0].y;

  switch (direction) {
    case "UP":
      newY -= 10;
      break;
    case "DOWN":
      newY += 10;
      break;
    case "LEFT":
      newX -= 10;
      break;
    case "RIGHT":
      newX += 10;
      break;
  }

  snake.unshift({ x: newX, y: newY });

  if (snake[0].x === food.x && snake[0].y === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 40) * 10,
      y: Math.floor(Math.random() * 40) * 10
    };
  } else {
    snake.pop();
  }

  if (
    snake[0].x < 0 ||
    snake[0].x > canvas.width - 10 ||
    snake[0].y < 0 ||
    snake[0].y > canvas.height - 10 ||
    checkCollision(snake)
  ) {
    alert(`Game Over! Your score is ${score}`);
    return;
  }
}

function checkCollision(snake) {
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  return false;
}

function drawFood() {
  ctx.fillStyle = "green";
  ctx.fillRect(food.x, food.y, 10, 10);
}

setInterval(() => {
  moveSnake();
  drawSnake();
  drawFood();
  ctx.fillStyle = "black";
  ctx.font = "24px Arial";
  ctx.textAlign = "righ";
  ctx.textBaseline = "top";
  ctx.fillText(`Score: ${score}`, 10, 10);
}, 100);