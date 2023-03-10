const canvas = document.getElementById("game");
const debugPanel = document.getElementById("debug");
const context = canvas.getContext("2d");
const debugMode = true;
const cursor = new Image();

let level;
let camera;
let mousePosition = new Vector(0, 0);
let lastUpdateTime = 0;
let wasPaused = false;
let isDragging = false;
let dragPosition;
let mouseDragPosition;

cursor.src = "assets/cursor.png";
canvas.addEventListener("mousemove", mouseMove);
canvas.addEventListener("mousedown", mouseDown);
canvas.addEventListener("mouseup", mouseUp);
canvas.addEventListener("contextmenu", rightMouseClick);
document.addEventListener("visibilitychange", visibilityChanged);

function visibilityChanged() {
  if (!document.hidden) {
    wasPaused = true;
  }
}

initialize();

async function initialize() {
  mapData = await getJSON("data/map.json");

  level = new Level(mapData);

  await level.load();

  canvas.width = level.mapData.background[0].length * level.tileSize;
  canvas.height = level.mapData.background.length * level.tileSize;

  window.requestAnimationFrame(gameLoop);

  camera = new Camera(context);

  camera.moveTo(canvas.width / 2, canvas.height / 2);
}

function gameLoop(currentTime) {
  if (wasPaused) {
    lastUpdateTime = currentTime;

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

  camera.begin();

  level.draw(context); // Draw the map

  drawCursor(); // Draw the cursor

  camera.end();
}

function drawCursor() {
  let gridPosition = mouseToGridPixel(mousePosition, level.tileSize, camera);

  logDebug(mouseToGrid(mousePosition, level.tileSize));

  context.drawImage(cursor, gridPosition.x, gridPosition.y);
}

function logDebug(message) {
  debugPanel.innerHTML = message;
}

function mouseMove(e) {
  mousePosition = new Vector(e.offsetX, e.offsetY);

  if (isDragging) {
    camera.moveTo(dragPosition.x + (mouseDragPosition.x - mousePosition.x) * camera.zoom, dragPosition.y + (mouseDragPosition.y - mousePosition.y) * camera.zoom);
  }

  mousePosition = camera.screenToWorld(mousePosition.x, mousePosition.y);
}

function mouseDown(e) {
  if (e.button == 0) {
    // Click gauche
    let position = mouseToGrid(mousePosition, level.tileSize);

    spawnTower(position);
  } else if (e.button == 2) {
    // Click droit
    isDragging = true;

    dragPosition = new Vector(camera.lookAt[0], camera.lookAt[1]); // Permet de prendre la valeur et non la réference

    mouseDragPosition = new Vector(e.offsetX, e.offsetY);
  }
}

function mouseUp(e) {
  if (e.button == 2) {
    isDragging = false;
  }
}

function rightMouseClick(e) {
  e.preventDefault(); // On empêche juste le menu de s'ouvrir pour que mousedown detect le droit aussi
}

function spawnTower(position) {
  if (level.canSpawn(position)) {
    level.slots[position.x][position.y] = new Tower(position.x, position.y);
    level.slots[position.x][position.y].load();
  }
}
