const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');

// Коды клавиш на клавиатуре
const LEFT_KEYCODE = 37;
const UP_KEYCODE = 38;
const RIGHT_KEYCODE = 39;
const DOWN_KEYCODE = 40;

// Задаем поле боя
const ground = new Image();
ground.src = 'img/ground.png';

// Задаем еду
const foodImg = new Image();
foodImg.src = 'img/food.png';

// Размер ячейки для еды
let box = 32;

// Общий счет
let score = 0;

// координаты еды
let food = {
  x: Math.floor((Math.random() * 17 + 1)) * box,
  y: Math.floor((Math.random() * 15 + 3)) * box
};


// координаты змейки
let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box
};

document.addEventListener('keydown', direction);

let dir = '';

function direction (evt) {
  if (evt.keyCode === LEFT_KEYCODE && dir != 'right') {
    dir = 'left';
  } else if (evt.keyCode === UP_KEYCODE && dir != 'down') {
    dir = 'up';
  } else if (evt.keyCode === RIGHT_KEYCODE && dir != 'left') {
    dir = 'right';
  } else if (evt.keyCode === DOWN_KEYCODE && dir != 'up') {
    dir = 'down';
  }
};

// Рисуем объекты
function drawGame() {
  // Поле
  ctx.drawImage(ground, 0, 0);

  // Змея
  for(let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? 'green' : 'white';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Еда
  ctx.drawImage(foodImg, food.x, food.y);

  // Счет
  ctx.fillStyle = 'white';
  ctx.font = '44px Arial';
  ctx.fillText(score, box * 2, box * 1.6);

  // Передвижение змеи

  // Координаты змеи
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (snakeX === food.x && snakeY === food.y) {
    score++;
    food = {
      x: Math.floor((Math.random() * 17 + 1)) * box,
      y: Math.floor((Math.random() * 15 + 3)) * box
    };
  } else {
    snake.pop();
  }

  // проверка на удар о границы
  if (snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17) {
    clearInterval(game);
  }

  // проверка на поедание своего хвоста
  function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
      if (head.x === arr[i].x && head.y === arr[i].y) {
        clearInterval(game);
      }
    }
  }

  if (dir === 'left') {
    snakeX -=box;
  }

  if (dir === 'right') {
    snakeX +=box;
  }

  if (dir === 'up') {
    snakeY -=box;
  }

  if (dir === 'down') {
    snakeY +=box;
  }

  let newHead = {
    x: snakeX,
    y: snakeY
  };

  eatTail(newHead, snake);

  snake.unshift(newHead);
};

// Вызываем функцию drawGame каждые 100 мс
let game = setInterval(drawGame, 100);