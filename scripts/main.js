const canvas = document.getElementById("game");
const debugPanel = document.getElementById("debug");
const context = canvas.getContext("2d");
const debugMode = true;
const cursor = new Image();

let level;
let mousePosition = new Vector(0, 0);
let lastUpdateTime = 0;
let wasPaused = false;

cursor.src = "assets/cursor.png";
canvas.addEventListener("mousemove", mouseMove);
canvas.addEventListener("click", mouseClick);
document.addEventListener("visibilitychange", visibilityChanged);

function visibilityChanged()
{
    if (!document.hidden)
    {
        wasPaused = true;
    }
}

initialize();

async function initialize() {
  mapData = await getJSON("data/map.json");

  level = new Level(mapData);

  await level.load();

  canvas.height = level.mapData.background.length * level.tileSize;
  canvas.width = level.mapData.background[0].length * level.tileSize;

  window.requestAnimationFrame(gameLoop);
}

function gameLoop(currentTime) {

    if (wasPaused)
    {
        lastUpdateTime = currentTime ;

        wasPaused = false;
    }

  let deltaTime = (currentTime - lastUpdateTime) / 1000;

  update(deltaTime, mousePosition);
  draw();

  lastUpdateTime = currentTime;

  window.requestAnimationFrame(gameLoop);
}

function update(deltaTime, mousePosition) {
  level.update(deltaTime, mousePosition);
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
  debugPanel.innerHTML = message;
}

function mouseMove(e) {
  mousePosition = new Vector(e.offsetX, e.offsetY);
}

function mouseClick(e) {
  let position = mouseToGrid(mousePosition, level.tileSize);

   spawnTower(position);
}

function spawnTower(position)
{
  if (level.canSpawn(position)) {
    level.slots[position.x][position.y] = new Tower(position.x, position.y);
    level.slots[position.x][position.y].load();
  }
}