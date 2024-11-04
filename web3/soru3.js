const fs = require('fs');
function asalSayiBul(limit) {
  const asalSayilar = [];
  for (let num = 2; num < limit; num++) {
    let asalMi = true;
    for (let i = 2; i < num; i++) {
      if (num % i === 0) {
        asalMi = false;
        break;
      }
    }
    if (asalMi) {
      asalSayilar.push(num);
    }
  }
  return asalSayilar;
}
const limit = 90;
const asalNumaralar = asalSayiBul(limit);
fs.writeFileSync('asal_sayi.txt', asalNumaralar.join('\n'));
console.log('Asal sayılar asal_sayi.txt dosyasına kaydedildi.');
const asalSayilar = fs.readFileSync('asal_sayi.txt', 'utf8').split('\n').map(Number);
const tumSayilar = Array.from({ length: 90 }, (_, i) => i + 1);
const eksikSayilar = tumSayilar.filter(sayi => !asalSayilar.includes(sayi));
fs.writeFileSync('tum_sayilar.txt', eksikSayilar.join('\n'), 'utf8');
console.log('Eksik sayılar tum_sayilar.txt dosyasına yazıldı.');








