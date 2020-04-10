class Game {
  constructor({ width, height }, notesPositions) {
    this.notesPositions = notesPositions;
    this.screen = {width:width, height:height}
    this.pos = { x: 0, y: 150, speed:1 };
    this.data = {border:null, score:null, notes:null, prevSound:null, isOk:false, isPaused:true, level:0}
    this.initLevel = this.initLevel.bind(this);
    this.setSpeed = this.setSpeed.bind(this);
  }
  adjust() {
    const canvas = document.getElementById("canvas");
    const root = document.getElementById("root");
    let aspRatio, newNotesPos
    let {width, height} = this.screen 
    canvas.style.width = width;
    canvas.style.height = height;
    root.style.width = width;
    root.style.height =height;
    aspRatio = 4/(width/height)
    newNotesPos = this.notesPositions;
    width<height?
    aspRatio /=1.5:aspRatio
    for (let i = 0; i < newNotesPos.length; i++) {
      newNotesPos[i] = newNotesPos[i].map(function(x) {
        x[0] *= aspRatio
        x[1] *= aspRatio
        return x;
      });
    }
    this.notesPositions = newNotesPos
  }
  startLevel(lvl = this.data.level) {
    this.data.isOk = true
    this.data.notes = JSON.parse(JSON.stringify(this.notesPositions[lvl]));
    let length = this.data.notes.length; 
    this.data.score = length
    this.data.border = this.data.notes[length - 1][0];
    this.pos.x = 0;
  }
  moveY(arg) {
    arg === "-" ? (this.pos.y += 15) : (this.pos.y -= 15);
  }
  levelUp() {
    let lvl, _this, promise
    this.data.isOk=false
    lvl = this.data.level;
    _this = this;
    promise = new Promise((resolve, reject) => showComposer(lvl, resolve)).then(
      function() {
        _this.data.level === 3 ? (_this.data.level = 0) : _this.data.level++;
        _this.initLevel(_this.data.level);
        _this.data.isOk = true
      }
    );
  }
  setSpeed() {
    let speed = document.getElementById("speed1");
    this.pos.speed == 3 ? (this.pos.speed = 1) : this.pos.speed++;
    speed.src = `images/other/speed${this.pos.speed}.png`;
  }

  togglePause() {
    if (!this.data.isOk) {
      return
    }
    this.data.isPaused = !this.data.isPaused
    let toggle =this.data.isPaused
    toggle?
     showAndHide('loadingScreen', 'app') : showAndHide('app', 'loadingScreen')
     this.data.isPaused=toggle
  }
  update() {
    if (!this.data.isPaused && this.data.isOk) {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      let {width, height} = this.screen
      let { x, y, speed } = this.pos;
      let {notes,level, score, prevSound, border} = this.data 
      let composer, pannel, closest, isPlay;
      composer = composers[level];
      pannel = `${composer}_pannel`;
      ctx.clearRect(0, 0, width, height);
      draw(pannel, 0, -160, 3600, 860);
      draw("plane", x, y, 100, 100);
      notes.map(function(note) {
        if (note[2] === 0) {
          return;
        } else {
          let x = note[0];
          let y = note[1];
          let img = note[3];
          draw(img, x, y, 50, 75);
        }
      });
      this.pos = move({ x, y, speed});
       closest = close1(x, notes);
       isPlay = detectCollision({ x, y }, closest);
      if (isPlay) {
        let index = notes.indexOf(closest);
        this.data.notes[index][2] = 0;
        let sound = sounds[level][index];
        pause(prevSound);
        play(sound);
        this.data.score--;
        this.data.prevSound = sound;
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0); //
      ctx.translate(-x, 0);
      
      if (x >= border) {
        this.data.isOk=false
        score <= 3 ? this.levelUp() : this.initLevel(level);
      }
      if (y < 0 || y > 600) {
        document.getElementById("crash").play();
        this.pos.y = 300;
      }
    }
  }
}
