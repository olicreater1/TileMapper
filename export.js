function exportCSV() {
  const csv = map.map(row =>
    row.map(tileID => tiles[tileID]?.csvValue ?? '').join(',')
  ).join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'tilemap.csv';
  a.click();
  URL.revokeObjectURL(url);
}