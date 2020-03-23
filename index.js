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
let n = fetch("/images/other/speed1.png").then((x)=>console.log(x))
addInputs(game);
let prepare = async function({ width, height }) {
  loading.style.width = width + "px";
  loading.style.height = height + "px";
  let images;
  let imagesP = new Promise((resolve, reject) => loadImages(resolve, reject));
  images = await imagesP;
  return images;
};

prepare(size)
  .then(x => game.adjust())
  .then(x => {
    app.style.display = "";
    loading.style.display = "none";
  })
  .then(x => game.initLevel())
  .then(x => start())
  .catch(e => alert(e));
create("restart", game.initLevel);
create("speed1", game.setSpeed);
