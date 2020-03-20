function detectCollision({ x, y }, note) {
  if (Array.isArray(note)) {
    let noteX = note[0];
    let noteY = note[1];
    let collX = x >= noteX - 100 && x <= noteX + 150;
    let collY = y >= noteY - 75 && y <= noteY + 75;
    let value;
    collX && collY ? (value = true) : (value = false);
    return value;
  } else {
    return false;
  }
}

function close1(x, arr) {
  let needle = x;
  let arr = this.notesPositions.filter(el => el[2] !== 0);
  if (!arr.length) {
    return;
  }
  let closest = arr.reduce((a, b) => {
    return Math.abs(b[0] - needle) < Math.abs(a[0] - needle) ? b : a;
  });
  return closest;
}

function play(note, index) {
  let id = uniq.indexOf(sound);
  let doc = document.getElementById("s" + id);
  doc.muted = false;
  doc.play();
}
