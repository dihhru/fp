const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const bg = document.getElementById("res");
const root = document.getElementById("root");
const tools = document.getElementById("tools");
const loading = document.getElementById("loading");
const app = document.getElementById("app");
const bar = document.getElementById("bar");
let size = screenSize();
let game = new Game(size, notesPositions);

function initAnime(resolve) {
  showhide('text', 'img')
  setTimeout(()=>{
    showhide('img', 'text')
    resolve()
  }, 2500)
}
function changeText() {
  showhide('text', 'img')
  let text = document.getElementById('text')
  text.innerHTML = 'Press Enter to start'

}
addInputs(game);
let prepare = async function({ width, height }) {
  loading.style.width = width + "px";
  loading.style.height = height + "px";
  let load = await new Promise((resolve, reject) => initAnime(resolve));
  let imagesP = await new Promise((resolve, reject) => loadImages(resolve, reject));

  return load+imagesP
};

create("restart", game.initLevel);
create("speed1", game.setSpeed)
prepare(size)
  .then(x => game.adjust())
  .then(x => game.initLevel())
  .then(x => 
    changeText())
  .then(x => start())
  .catch(e => alert(e));
;
