function createTileElement(img, tileID, initialValue) {
  const wrapper = document.createElement('div');
  wrapper.style.display = 'inline-block';
  wrapper.style.textAlign = 'center';
  wrapper.style.marginRight = '8px';

  img.dataset.tileID = tileID;
  img.classList.add('tile-thumb');
  img.onclick = () => {
    currentTile = tileID;
    document.querySelectorAll('.tile-thumb').forEach(el => el.classList.remove('selected'));
    img.classList.add('selected');
  };

  const input = document.createElement('input');
  input.type = 'text';
  input.value = initialValue;
  input.style.width = '32px';
  input.style.marginTop = '4px';
  input.onchange = () => {
    tiles[tileID].csvValue = input.value;
  };

  wrapper.appendChild(img);
  wrapper.appendChild(input);
  document.getElementById('tilePalette').appendChild(wrapper);
}