// Save the current tile palette to a JSON file
function savePalette() {
  const palette = tiles.map(t => ({
    csvValue: t.csvValue,
    src: t.img?.src || ''
  }));

  const blob = new Blob([JSON.stringify(palette, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'palette.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Load a saved palette JSON and rebuild the tile palette
function loadPalette(paletteJson) {
  tiles.length = 0;
  document.getElementById('tilePalette').innerHTML = '';

  paletteJson.forEach((t, i) => {
    const img = new Image();
    img.src = t.src;
    img.onload = () => draw();
    tiles.push({ img: img, csvValue: t.csvValue });
    createTileElement(img, i, t.csvValue);
  });
}

// Load a CSV file and map each value to a tile using the current palette
function loadCSV(csvText) {
  const rowsArr = csvText.trim().split('\n');
  const newRows = rowsArr.length;
  const newCols = rowsArr[0].split(',').length;

  // Resize map and canvas
  rows = newRows;
  cols = newCols;
  map = Array.from({ length: rows }, () => Array(cols).fill(0));
  canvas.width = cols * tileSize;
  canvas.height = rows * tileSize;

  for (let y = 0; y < rows; y++) {
    const colsArr = rowsArr[y].split(',');
    for (let x = 0; x < cols; x++) {
      const csvVal = colsArr[x].trim();
      const tileID = tiles.findIndex(t => t.csvValue == csvVal);
      map[y][x] = tileID !== -1 ? tileID : 0;
    }
  }

  draw();

  // Update UI inputs to match new size
  document.getElementById('rowsInput').value = rows;
  document.getElementById('colsInput').value = cols;
}