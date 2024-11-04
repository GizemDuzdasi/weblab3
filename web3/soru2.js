const fs = require('fs');
fs.readFile('quiz6.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Dosya okuma hatası:', err);
    return;
  }
  const satirlar = data.split('\n');
  const values = {};
  for (const satir of satirlar) {
    const bolum = satir.split('=');
    if (bolum.length === 2) {
      const key = bolum[0].trim();
      const value = parseFloat(bolum[1]);
      values[key] = value;
    }
  }
  const x = values['x'];
  const a = values['a'];
  const b = values['b'];
  const c = values['c'];
  const AA = a * x * x + b * x + c;
  console.log(`Sonuc = ${AA}`);
});
