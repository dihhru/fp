
let size = getScreenSize();
let game = new Game(size, notesPositions);
createBtn("restart", game.startLevel);
createBtn("speed1", game.setSpeed)
addInputs(game);
prepare(size)
  .then(()=>start())
  .catch(e => alert(e));
;
