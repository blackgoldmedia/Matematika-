const input = document.getElementById('input');
const hasil = document.getElementById('hasil');
const summary = document.getElementById('summary');

function hitung() {
  const counts = Array(10).fill(0);
  let total = 0;

  // Hitung tiap karakter yang berupa angka 0-9
  for (const ch of input.value) {
    if (ch >= '0' && ch <= '9') {
      counts[Number(ch)]++;
      total++;
    }
  }

  const max = Math.max(...counts);

  // Tampilkan hasil per angka
  hasil.innerHTML = '';
  counts.forEach((n, d) => {
    const li = document.createElement('li');
    if (n > 0 && n === max) li.className = 'top';
    li.innerHTML =
      '<span class="digit">' + d + '</span>' +
      '<div class="track"><div class="fill" style="width:' + (max ? (n / max) * 100 : 0) + '%"></div></div>' +
      '<span class="count">' + n + 'x</span>';
    hasil.appendChild(li);
  });

  // Ringkasan
  if (total === 0) {
    summary.textContent = 'Belum ada angka. Ketik angka 0-9 di kolom atas.';
  } else {
    const tertinggi = counts.map((n, d) => (n === max ? d : null)).filter(d => d !== null).join(', ');
    const hilang = counts.map((n, d) => (n === 0 ? d : null)).filter(d => d !== null);
    summary.innerHTML =
      'Total <b>' + total + '</b> angka. Terbanyak: <b>' + tertinggi + '</b> (' + max + 'x).' +
      (hilang.length ? ' Tidak muncul: ' + hilang.join(', ') + '.' : '');
  }
}

document.getElementById('hitung').addEventListener('click', hitung);
document.getElementById('reset').addEventListener('click', () => {
  input.value = '';
  hitung();
  input.focus();
});
input.addEventListener('input', hitung);

hitung();
