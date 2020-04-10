
let size = screenSize();
let game = new Game(size, notesPositions);
create("restart", game.initLevel);
create("speed1", game.setSpeed)
addInputs(game);
prepare(size)
  .then(()=>start())
  .catch(e => alert(e));
;
