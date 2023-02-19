const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const tileset = new Image();
tileset.src = "assets/tileset.png";


loadMap();

async function loadMap()
{
    var mapData = await getJSON("data/map.json");
    context.drawImage(tileset, 0, 0);
    console.log(mapData.name);
}