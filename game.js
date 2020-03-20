class Game {
  constructor({ width, height }, notesPositions) {
    this.notesPosition = notesPositions;
    this.width = width;
    this.height = height;
    this.level = 0;
    this.pos = { x: 0, y: 0 };
    this.score = null;
    this.notes = null;
    this.prevSound = null;
    this.border = null;
    this.isPaused = false;
  }
  adjust() {
    canvas.style.width = this.width;
    canvas.style.height = this.height;
    root.style.width = this.width;
    root.style.height = this.height;
    let arr = this.notesPosition;
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].map(function(x) {
        x[0] *= 2;
        x[1] *= 2;
        return x;
      });
    }
    this.notesPosition = arr;
    console.log(this);
  }
  initLevel(lvl = 0) {
    level(lvl);
    this.notes = JSON.parse(JSON.stringify(this.notesPosition[lvl]));
    this.score = this.notes.length;
    this.border = this.notes[this.notes.length - 1][0];
    this.pos.x = 0;
    this.isPaused = false;
  }
  moveY(arg) {
    arg === "-" ? (this.pos.y += 15) : (this.pos.y -= 15);
  }
  levelUp() {
    let lvl = this.level;
    let _this = this;
    let promise = new Promise((resolve, reject) => show(lvl, resolve)).then(
      function() {
        _this.level === 3 ? (_this.level = 0) : _this.level++;
        _this.initLevel(_this.level);
      }
    );
  }
  update() {
    if (!this.isPaused) {
      let { x, y } = this.pos;
      let author = authors[this.level];
      let pannel = `${author}_pannel`;
      draw(pannel, 0, -160, 3600, 860);
      draw("plane", x, y, 100, 100);
      this.notes.map(function(note) {
        if (note[2] === 0) {
          return;
        } else {
          let x = note[0];
          let y = note[1];
          let img = note[3];
          draw(img, x, y, 50, 75);
        }
      });
      this.pos = move({ x, y }, 5);
      let closest = close1(x, this.notes);
      let isPlay = detectCollision({ x, y }, closest);
      if (isPlay) {
        let index = this.notes.indexOf(closest);
        this.notes[index][2] = 0;
        let sound = sounds[this.level][index];
        pause(this.prevSound);
        play(sound);
        this.score--;
        this.prevSound = sound;
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0); //reset the transform matrix as it is cumulative
      ctx.translate(-x, 0);
      if (x === this.border) {
        this.isPaused = true;
        this.score <= 3 ? this.levelUp() : this.initLevel(this.level);
      }
    }
  }
}
