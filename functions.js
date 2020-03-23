function throttle(func, ms) {
  let isThrottled = false,
    savedArgs,
    savedThis;
  function wrapper() {
    if (isThrottled) {
      // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }
    func.apply(this, arguments); // (1)
    isThrottled = true;
    setTimeout(function() {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }
  return wrapper;
}
let game1 = throttle(gameLoop, 15);
function start() {
  game1();
}
let lastTime = 0;

function gameLoop() {
  game.update();
  requestAnimationFrame(gameLoop);
}

function draw(img, x, y, width, height) {
  img = document.getElementById(img);
  ctx.drawImage(img, x, y, width, height);
}
function move({ x, y }, speed) {
  x += 2 * speed;
  y += 0.2;
  return { x, y };
}
function screenSize() {
  let width, height, n;
  width = document.documentElement.clientWidth;
  height = document.documentElement.clientHeight;
  if (width < height) {
    height /= 2;
  }
  return { width, height };
  // if (width < height) {
  //     height /= 2;
  //     n = 2;
  // }
  // loading.style.width = width + "px";
  // loading.style.height = height + "px";

  // root.style.width = width + "px";
  // root.style.height = height + "px";

  // canvas.style.width = width + "px";
  // canvas.style.height = height + "px";

  // for (let i = 0; i < notesPositions.length; i++) {
  //     notesPositions[i] = notesPositions[i].map(function (x) {
  //         x[0] *= n;
  //         x[1] *= 2;
  //         return x;
  //     });
  // }
}
function close1(x, arg) {
  let needle = x;
  let arr = arg.filter(el => el[2] !== 0);
  if (!arr.length) {
    return;
  }
  let closest = arr.reduce((a, b) => {
    return Math.abs(b[0] - needle) < Math.abs(a[0] - needle) ? b : a;
  });
  return closest;
}
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
function addInputs(game) {
  document.addEventListener(
    "keydown",
    event => {
      switch (event.keyCode) {
        case 38:
          game.moveY("+");
          break;
        case 40:
          game.moveY("-");
          break;
        case 32:
          game.isPaused = !game.isPaused;
          break;
        case 13:
          game.isPaused = !game.isPaused;
          break;
        default:
          break;
      }
    },
    {
      passive: true
    }
  );
  //   document.addEventListener(
  //     "touchstart",
  //     event => {
  //       let height = document.documentElement.clientHeight;
  //       let touchY = event.targetTouches[0].clientY;
  //       let middle = height / 2;
  //       touchY >= middle ? plane.moveY("-") : plane.moveY("+");
  //       controller.isStarted = true;
  //     },
  //     { passive: true }
  //   );
}
function play(note) {
  let id = uniq.indexOf(note);
  let doc = document.getElementById("s" + id);
  doc.muted = false;
  doc.play();
}
function pause(note) {
  if (!!note) {
    let id = uniq.indexOf(note);
    let doc = document.getElementById("s" + id);
    doc.currentTime = 0;
    doc.muted = true;
    doc.pause();
  }
}
function show(lvl, resolve) {
  img = document.getElementById(authors[lvl]);
  clone = img.cloneNode();
  clone.className = "author";
  root.appendChild(clone);
  setTimeout(() => clone.classList.add("authorA"), 500);
  setTimeout(() => {
    root.removeChild(clone);
    resolve();
  }, 3500);
}

function create(name, func) {
  let object = document.createElement("img");
  object.className = "object";
  object.id = name;
  object.src = `images/other/${name}.png`;
  object.ontouchstart = e => {
    e.stopPropagation();
  };
  object.onclick = () => func();
  tools.appendChild(object);
}
