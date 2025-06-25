const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const tileSize = 32;
const rows = 12;
const cols = 16;
const map = Array.from({ length: rows }, () => Array(cols).fill(0));
const colors = ['#fff', '#3498db', '#e74c3c', '#2ecc71'];
let currentTile = 1;

function draw() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      ctx.fillStyle = colors[map[y][x]];
      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      ctx.strokeStyle = '#ccc';
      ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }
}

canvas.addEventListener('click', (e) => {
  const x = Math.floor(e.offsetX / tileSize);
  const y = Math.floor(e.offsetY / tileSize);
  map[y][x] = currentTile;
  draw();
});

document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '3') {
    currentTile = parseInt(e.key);
  }
});

draw();