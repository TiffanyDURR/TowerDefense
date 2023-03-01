async function getJSON(path) {
  return fetch(path)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    });
}

function drawLine(start, end) {
  context.beginPath();
  context.moveTo(start.x, start.y);
  context.lineTo(end.x, end.y);
  context.stroke();
}

function mouseToGridPixel(mousePosition, tileSize, camera) {
  let position = mouseToGrid(mousePosition, tileSize);
  return new Vector(position.x * tileSize, position.y * tileSize);
}

function mouseToGrid(mousePosition, tileSize) {
  let x = Math.floor(mousePosition.x / tileSize);
  let y = Math.floor(mousePosition.y / tileSize);
  return new Vector(x, y);
}
