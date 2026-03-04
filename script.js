const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

let isDragging = false;
let isAddingBusy = true;
let myBusySlots = new Set();
let allUsersData = [];

function buildGrid() {
  const header = document.getElementById('calHeader');
  const body = document.getElementById('calBody');

  days.forEach(day => {
    const div = document.createElement('div');
    div.className = 'col-header';
    div.innerText = day;
    header.appendChild(div);
  });

  hours.forEach(hour => {
    const row = document.createElement('div');
    row.className = 'grid-row';
    const timeLabel = document.createElement('div');
    timeLabel.className = 'time-label';
    timeLabel.innerText = hour;
    row.appendChild(timeLabel);

    days.forEach(day => {
      const cellId = `${day}-${hour}`;
      const cell = document.createElement('div');
      cell.className = 'time-cell';
      cell.dataset.id = cellId;
      
      cell.addEventListener('mousedown', (e) => startDrag(e.target, cellId));
      cell.addEventListener('mouseenter', (e) => { if (isDragging) toggleCell(e.target, cellId); });

      cell.addEventListener('touchstart', (e) => { e.preventDefault(); startDrag(e.target, cellId); }, {passive: false});
      cell.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const target = document.elementFromPoint(touch.clientX, touch.clientY);
        if (target && target.classList.contains('time-cell')) toggleCell(target, target.dataset.id);
      }, {passive: false});
      
      row.appendChild(cell);
    });
    body.appendChild(row);
  });

  const stopDrag = () => isDragging = false;
  document.addEventListener('mouseup', stopDrag);
  document.addEventListener('touchend', stopDrag);
}

function startDrag(el, id) {
  isDragging = true;
  isAddingBusy = !myBusySlots.has(id);
  toggleCell(el, id);
}

function toggleCell(el, id) {
  if (isAddingBusy) {
    myBusySlots.add(id);
    el.classList.add('busy');
    el.classList.remove('matched');
  } else {
    myBusySlots.delete(id);
    el.classList.remove('busy');
  }
}

function generateShareLink() {
  const name = document.getElementById('userName').value.trim();
  if (!name) return showToast("Isi nama dulu bos!", "#ef4444");

  const newData = { name, busy: Array.from(myBusySlots) };
  const idx = allUsersData.findIndex(u => u.name.toLowerCase() === name.toLowerCase());
  if (idx >= 0) allUsersData[idx] = newData; else allUsersData.push(newData);

  const hash = btoa(JSON.stringify(allUsersData));
  const link = `${window.location.origin}${window.location.pathname}?data=${hash}`;
  document.getElementById('shareLink').value = link;

  navigator.clipboard.writeText(link).then(() => showToast("Link Disalin! Bagikan ke Grup.", "#10b981"));
  updateUI();
}

function findIntersection() {
  if (allUsersData.length < 2) return showToast("Butuh min. 2 orang ngisi!", "#ef4444");
  const busySet = new Set();
  allUsersData.forEach(u => u.busy.forEach(s => busySet.add(s)));
  
  const cells = document.querySelectorAll('.time-cell');
  let count = 0;
  cells.forEach(c => {
    c.classList.remove('busy', 'matched');
    if (!busySet.has(c.dataset.id)) { c.classList.add('matched'); count++; }
  });
  showToast(count > 0 ? `Ditemukan ${count} slot kosong!` : "Gak ada waktu pas!", "#10b981");
}

function parseURL() {
  const hash = new URLSearchParams(window.location.search).get('data');
  if (hash) {
    try {
      allUsersData = JSON.parse(atob(hash));
      updateUI();
      allUsersData.forEach(u => u.busy.forEach(id => {
        const cell = document.querySelector(`[data-id="${id}"]`);
        if (cell && !myBusySlots.has(id)) { cell.classList.add('busy'); cell.style.opacity = '0.3'; }
      }));
    } catch (e) { console.error("Data error"); }
  }
}

function updateUI() {
  document.getElementById('userCount').innerText = allUsersData.length;
  const container = document.getElementById('participantBadges');
  container.innerHTML = allUsersData.map(u => `<div class="badge-user">👤 ${u.name}</div>`).join('');
}

function showToast(msg, color) {
  const t = document.createElement('div');
  t.className = 'toast show';
  t.style.background = color;
  t.innerText = msg;
  document.getElementById('toastContainer').appendChild(t);
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 3000);
}

function resetApp() { window.location.href = window.location.origin + window.location.pathname; }

window.onload = () => { buildGrid(); parseURL(); };