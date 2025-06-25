let tileSize = 32;
let rows = 12;
let cols = 16;
let map = Array.from({ length: rows }, () => Array(cols).fill(0));

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let currentTile = 0;
const tiles = []; // Loaded tile images

function resizeMap(newRows, newCols) {
  // Adjust map size, preserving existing data
  const newMap = Array.from({ length: newRows }, (_, y) =>
    Array.from({ length: newCols }, (_, x) => (map[y] && map[y][x] !== undefined ? map[y][x] : 0))
  );
  rows = newRows;
  cols = newCols;
  map = newMap;
  canvas.width = cols * tileSize;
  canvas.height = rows * tileSize;
  draw();
}

canvas.addEventListener('click', (e) => {
  const x = Math.floor(e.offsetX / tileSize);
  const y = Math.floor(e.offsetY / tileSize);
  if (tiles[currentTile]) {
    map[y][x] = currentTile;
    draw();
  }
});

function draw() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const tileID = map[y][x];
      const tile = tiles[tileID];
      if (tile && tile.img) {
        ctx.drawImage(tile.img, x * tileSize, y * tileSize, tileSize, tileSize);
      } else {
        ctx.clearRect(x * tileSize, y * tileSize, tileSize, tileSize);
      }
      ctx.strokeStyle = '#ccc';
      ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }
}