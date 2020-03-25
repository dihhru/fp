
let size = screenSize();
let game = new Game(size, notesPositions);

addInputs(game);
let prepare = async function({ width, height }) {
  const loading = document.getElementById("loading");
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
  .then(x => gameLoop())
  .catch(e => alert(e));
;
