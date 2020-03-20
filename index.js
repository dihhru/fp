const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const bg = document.getElementById("res");
const root = document.getElementById("root");
let size = screenSize();
let game = new Game(size, notesPositions);
addInputs(game);
let prepare = async function() {
  let images, audio;
  let imagesP = new Promise((resolve, reject) => loadImages(resolve, reject));
  let audioP = new Promise((resolve, reject) => loadAudio(resolve, reject));
  audio = await audioP;
  images = await imagesP;
  return images + audio;
};
prepare()
  .then(x => game.adjust())
  .then(x => game.initLevel())
  .then(x => start())
  .catch(e => alert(e));
