const canvas = document.getElementById("game");
const debug = document.getElementById("debug");
const context = canvas.getContext("2d");
const tileset = new Image();
const cursor = new Image();
let mapData = null;
let tileSize = 0;
let mousePosition = new Vector(0, 0); 
tileset.src = "assets/tileset.png";
cursor.src = "assets/cursor.png";
canvas.addEventListener('mousemove', mouseMove);

initialize();

function gameLoop() 
{
    update();
    draw();
    window.requestAnimationFrame(gameLoop);
}

function update()
{
}

function draw()
{
    context.clearRect(0, 0, canvas.width, canvas.height); // Clean tout
    
    drawMap(); // Draw the map

    drawCursor(); // Draww the cursor
}

async function initialize()
{
    mapData = await getJSON("data/map.json");
    tileSize = mapData.tileSize;
    canvas.height = mapData.data.length * tileSize;
    canvas.width = mapData.data[0].length  * tileSize;

    window.requestAnimationFrame(gameLoop);
}

function drawCursor()
{
    let x = Math.floor(mousePosition.x / tileSize);
    let y = Math.floor(mousePosition.y / tileSize);

    logDebug(x + "-" + y);

    context.drawImage(cursor, x * tileSize, y * tileSize);
}

function drawMap()
{
    for (let y = 0; y < mapData.background[0].length; y++)
    {
        for (let x = 0; x < mapData.background.length; x++)
        {
            context.drawImage(tileset, tileSize * mapData.data[x][y], 0, tileSize, tileSize, y * tileSize, x * tileSize, tileSize, tileSize);
        }
    }
}

function drawGrid()
{
    
}

function logDebug(message)
{
    debug.innerHTML = message;
}

function mouseMove(e)
{
    mousePosition = new Vector(e.offsetX, e.offsetY);
}