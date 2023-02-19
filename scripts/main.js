const canvas = document.getElementById("game");
const debug = document.getElementById("debug");
const context = canvas.getContext("2d");
const cursor = new Image();

let level;
let mousePosition = new Vector(0, 0);

cursor.src = "assets/cursor.png";
canvas.addEventListener("mousemove", mouseMove);
canvas.addEventListener("click", mouseClick);

initialize();

async function initialize() {
  mapData = await getJSON("data/map.json");

  level = new Level(mapData);

  await level.load();

  canvas.height = level.mapData.background.length * level.tileSize;
  canvas.width = level.mapData.background[0].length * level.tileSize;

  window.requestAnimationFrame(gameLoop);
}

function gameLoop() {
  update();
  draw();

  window.requestAnimationFrame(gameLoop);
}

function update() {
  level.update();
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height); // Clean tout

  level.draw(context); // Draw the map

  drawCursor(); // Draw the cursor
}

function drawCursor() {
  let gridPosition = mouseToGridPixel(mousePosition, level.tileSize);

  logDebug(mouseToGrid(mousePosition, level.tileSize));

  context.drawImage(cursor, gridPosition.x, gridPosition.y);
}

function logDebug(message) {
  debug.innerHTML = message;
}

function mouseMove(e) {
  mousePosition = new Vector(e.offsetX, e.offsetY);
}

function mouseClick(e) {
  let position = mouseToGrid(mousePosition, level.tileSize);

  // spawnTower(position);
  spawnEnemy(position);
}

function spawnTower(position)
{
      if (level.canSpawn(position)) {
    level.slots[position.x][position.y] = new Tower();
    level.slots[position.x][position.y].load();
  }
}

function spawnEnemy(position)
{
    let enemy = new Enemy();

    enemy.load();

    level.enemies.push(enemy);
}