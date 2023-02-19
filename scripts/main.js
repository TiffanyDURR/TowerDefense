const canvas = document.getElementById("game");
const debug = document.getElementById("debug");
const context = canvas.getContext("2d");
const tileset = new Image();
const obstacles = new Image();
const cursor = new Image();
let mapData = null;
let tileSize = 0;
let opacity = 1;
let flagOpacity = false;
let mousePosition = new Vector(0, 0); 
tileset.src = "assets/tileset.png";
obstacles.src = "assets/obstacles.png";
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
    if (flagOpacity)
    {
        opacity += 0.01;
    }

    else
    {
        opacity -= 0.01;
    }

    if (opacity <= 0.1)
    {
        flagOpacity = true;
    }

    else if (opacity >= 0.6)
    {
        flagOpacity = false;
    }
}

function draw()
{
    context.clearRect(0, 0, canvas.width, canvas.height); // Clean tout
    
    drawMap(); // Draw the map
    drawObstacles(); // Draw the obstacles
    drawGrid(); // Draw the grid
    drawCursor(); // Draww the cursor
}

async function initialize()
{
    mapData = await getJSON("data/map.json");
    tileSize = mapData.tileSize;
    canvas.height = mapData.background.length * tileSize;
    canvas.width = mapData.background[0].length  * tileSize;

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
            context.drawImage(tileset, tileSize * mapData.background[x][y], 0, tileSize, tileSize, y * tileSize, x * tileSize, tileSize, tileSize);
        }
    }
}

function drawObstacles()
{
    for (let y = 0; y < mapData.foreground[0].length; y++)
    {
        for (let x = 0; x < mapData.foreground.length; x++)
        {
            if (mapData.foreground[x][y] != 0)
            {
                context.drawImage(obstacles, tileSize * (mapData.foreground[x][y] -1), 0, tileSize, tileSize, y * tileSize, x * tileSize, tileSize, tileSize);
            }
        }
    }
}

function drawGrid()
{
    context.strokeStyle = "rgba(0,0,0," + opacity +")";
    context.lineCap = 'round';
    context.lineWidth = 3;

    for (let y = 0; y < mapData.foreground.length; y++)
    {
        let start = new Vector(0,  y * tileSize);
        let end = new Vector(canvas.width, y  * tileSize);

        drawLine(start, end);
    }

    for (let x = 0; x < mapData.foreground[0].length; x++)
    {
        let start = new Vector(x * tileSize, 0);
        let end = new Vector(x * tileSize, canvas.height);

        drawLine(start, end);
    }
}

function drawLine(start, end)
{
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.stroke();
}

function logDebug(message)
{
    debug.innerHTML = message;
}

function mouseMove(e)
{
    mousePosition = new Vector(e.offsetX, e.offsetY);
}