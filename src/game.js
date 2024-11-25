import {Engine,Map} from "./engine.js"
const SCREEN_WIDHT = 800; 
const SCREEN_HEIGHT = 608;
const TILE_SIZE = 32;

const engine = new Engine();
const levels = new Map();


const canvas = document.getElementById('gameCanvas');
canvas.width = SCREEN_WIDHT; 
canvas.height = SCREEN_HEIGHT;
const ctx = canvas.getContext('2d');

// Текущий уровень
let currentLevel = 0;
let coinsCollected = 0;
let hasKey = false;



// Карта текущего уровня
let map = levels.levels("level",currentLevel);
console.log("111  "+levels.levels("length"))
    //x = 25
    //y = 18

// Игрок
const player = {
    x: findSpawnPoint(map).x,
    y: findSpawnPoint(map).y,
    width: 32,
    height: 32,
    color: 'green',
    lives: 5 
};

let enemies = [];

function findSpawnPoint(map) {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === 5) {
                return { x: x * 32, y: y * 32 }; // Перевод в пиксели
            }
        }
    }
    // Если спавнпоинт не найден, возвращаем координаты по умолчанию
    return { x: 32, y: 32 };
}

function spawnEnemies() {
    enemies = []; // Очищаем массив врагов
    const enemyCount = Math.floor(Math.random() * 5) + 1; // Случайное количество врагов (от 1 до 5)
  
    for (let i = 0; i < enemyCount; i++) {
      let spawnX, spawnY;
  
      // Ищем пустую клетку для спауна
      do {
        const col = Math.floor(Math.random() * map[0].length);
        const row = Math.floor(Math.random() * map.length);
        
        console.log('enemies'+ map[row][col])
        // Если клетка пустая (0) или не является стеной (1)
        if (map[row][col] === 0) { 
          spawnX = col * TILE_SIZE; // Умножаем на размер клетки
          spawnY = row * TILE_SIZE; // Умножаем на размер клетки
          
          break;
        }
      } while (true);
  
      enemies.push({ 
            x: spawnX, 
            y: spawnY,
            width: 32,
            height: 32,
            color: 'red'
        });
      console.log(enemies)
      for (const enemy of enemies) {
        console.log(enemy.x)
        console.log(enemy.y)
      }
    }
    console.log('enemies')
};




// Проверка взаимодействия с объектами карты
function checkInteractions() {
  const col = Math.floor(player.x / TILE_SIZE);
  const row = Math.floor(player.y / TILE_SIZE);

  const cell = map[row][col];

  switch (cell) {
    case 2: // Монета
      coinsCollected++;
      map[row][col] = 0; // Убираем монету с карты
      break;
    case 3: // Ключ
      hasKey = true;
      map[row][col] = 0; // Убираем ключ с карты
      break;
    case 4: // Дверь
      if (hasKey) {
        nextLevel(); // Переход на следующий уровень
      }
      break;
  }
}
// Переход на следующий уровень
function nextLevel() {
    currentLevel++;
    hasKey = false;
    console.log("levels.levels "+levels.levels("length"))
    if (currentLevel < levels.levels("length")) {   
        map = levels.levels("level", currentLevel);
    } else {
      // Если уровни закончились, генерируем новый случайный уровень
        map = levels.generateRandomLevel(25, 19); // 10x15 клеток
        player.x = Math.floor(Math.random() * 25) *TILE_SIZE; // Сброс позиции игрока
        player.y = Math.floor(Math.random() * 19) *TILE_SIZE;
    }
    player.x = findSpawnPoint(map).x; // Сброс позиции игрока
    player.y = findSpawnPoint(map).y;

    spawnEnemies();
}
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
};

// Отрисовка карты
function drawMap() {
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            const cell = map[row][col];
            switch (cell) {
                case 1: // Стена
                    ctx.fillStyle = 'gray';
                    ctx.fillRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                break;
                case 2: // Монета
                    ctx.fillStyle = 'gold';
                    ctx.beginPath();
                    ctx.arc(
                    col * TILE_SIZE + TILE_SIZE / 2,
                    row * TILE_SIZE + TILE_SIZE / 2,
                    TILE_SIZE / 4,
                    0,
                    Math.PI * 2
                    );
                    ctx.fill();
                break;
                case 3: // Ключ
                    ctx.fillStyle = 'orange';
                    ctx.fillRect(
                    col * TILE_SIZE + TILE_SIZE / 4,
                    row * TILE_SIZE + TILE_SIZE / 4,
                    TILE_SIZE / 2,
                    TILE_SIZE / 2
                    );
                break;
                case 4: // Дверь
                    ctx.fillStyle = 'brown';
                    ctx.fillRect(
                    col * TILE_SIZE,
                    row * TILE_SIZE,
                    TILE_SIZE,
                    TILE_SIZE
                    );
                break;
                case 5: // Дверь
                ctx.fillStyle = 'darkgreen';
                ctx.fillRect(
                col * TILE_SIZE,
                row * TILE_SIZE,
                TILE_SIZE,
                TILE_SIZE
                );
            break;
                default: // Пустая клетка
                    ctx.fillStyle = 'lightblue';
                    ctx.fillRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                break;
            }
        }
    }
}
  

// Рисуем врага
function drawEnemies() {
    for (const enemy of enemies) {
      ctx.fillStyle = 'red';
      ctx.fillRect(enemy.x, enemy.y, enemy.height, enemy.width); // Враг в центре клетки
    }
}
// Функция для случайного передвижения врага
function moveEnemies() {
    const directions = [
      { dx: 0, dy: -32 }, // Вверх
      { dx: 0, dy: 32 },  // Вниз
      { dx: -32, dy: 0 }, // Влево
      { dx: 32, dy: 0 }   // Вправо
    ];
  
    for (const enemy of enemies) {

        // Выбираем случайное направление
        const randomDirection = directions[Math.floor(Math.random() * directions.length)];
        const newX = enemy.x + randomDirection.dx;
        const newY = enemy.y + randomDirection.dy;
    
        // Убедимся, что враг остаётся в границах карты (добавьте свои размеры карты)
        const mapWidth = 800; // Ширина карты
        const mapHeight = 600; // Высота карты
        // enemy.x = Math.max(0, Math.min(enemy.x, mapWidth - enemy.width));
        // enemy.y = Math.max(0, Math.min(enemy.y, mapHeight - enemy.height));
        // Проверяем столкновение со стенами
        if (!checkWallCollision(newX, enemy.y) ) {
            enemy.x = newX;
        }else{}
        if (!checkWallCollision(enemy.x, newY)) {
            enemy.y = newY;
        }else{}
    }
    
    
};setInterval(moveEnemies, 1000);

function checkPlayerCollision() {
    
    for (const enemy of enemies) {
        
        if (
            
            player.x < enemy.x + TILE_SIZE &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + TILE_SIZE &&
            player.y + player.height > enemy.y
        ){
            
            player.lives -= 1; // Уменьшаем количество жизней
            console.log(`Player hit! Lives left: ${player.lives}`);
            spawnEnemies();
            
            if (player.lives <= 0) {
                console.log('Game Over!');
                alert('You lost all lives! Restarting game...');
                restartGame(); // Полный сброс игры
            } else {
                // Перемещаем игрока в начальное положение после столкновения
                player.x = findSpawnPoint(map).x; // Сброс позиции игрока
                player.y = findSpawnPoint(map).y;
            }
        }
    }
}



function checkWallCollision(newX, newY) {
    const col = Math.floor(newX / TILE_SIZE);
    const row = Math.floor(newY / TILE_SIZE);
  
    // Проверяем, находится ли игрок в границах карты
    if (row < 0 || row >= map.length || col < 0 || col >= map[0].length) {
        return true; // Если вне карты, считаем столкновением
    }
  
    return map[row][col] === 1; // Проверяем, является ли клетка стеной
}

function movePlayer(dx, dy) {
    const newX = player.x + dx;
    const newY = player.y + dy;
  
    // Проверяем столкновение с границами карты и стенами
    if (!checkWallCollision(newX, player.y)) {
        player.x = newX;
    }
    if (!checkWallCollision(player.x, newY)) {
        player.y = newY;
    }
}
document.addEventListener('keydown', (event) => {
    const speed = TILE_SIZE;
    switch (event.key) {
    case 'ArrowUp':
        movePlayer(0, -speed);
        break;
    case 'ArrowDown':
        movePlayer(0, speed);
        break;
    case 'ArrowLeft':
        movePlayer(-speed, 0);
        break;
    case 'ArrowRight':
        movePlayer(speed, 0);
        break;
    }
});
function restartGame() {
    player.lives = 5; // Восстановление жизней
    player.x = 1*TILE_SIZE; // Сброс позиции игрока
    player.y = 1*TILE_SIZE;
    enemy.x = 12*TILE_SIZE; // Перемещаем врага в начальную позицию
    enemy.y = 13*TILE_SIZE;
}
function drawHUD() {
    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.fillText(`Lives: ${player.lives}`, 10, 20);
    ctx.fillText(`Level: ${currentLevel + 1}`, 110, 20);
    ctx.fillText(`Coins: ${coinsCollected}`, 210, 20);
    ctx.fillText(`Key: ${hasKey ? 'Yes' : 'No'}`, 310, 20);
}

spawnEnemies();

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    
    drawMap();
    drawPlayer(); 
    drawEnemies(); 
    moveEnemies;
    drawHUD(); 


    requestAnimationFrame(gameLoop);
    checkInteractions(); 
    checkPlayerCollision();

};


gameLoop();