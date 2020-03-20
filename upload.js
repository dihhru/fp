function loadImages(resolve, reject) {
  let res = resolve;
  let bg = document.getElementById("res");
  let length = authors.length;
  let sum = 0;
  let timer = setInterval(() => {
    console.log(sum);
    if (sum === length) {
      clearInterval(timer);
      res();
      console.log("loaded images");
    }
  }, 500);
  let i1 = 0;
  while (i1 < 4) {
    let img = document.createElement("img");
    img.src = `images/notes/${i1}.png`;
    img.width = "150";
    img.id = i1;
    img.onload = () => sum++;
    bg.appendChild(img);
    i1++;
  }
  let plane = document.createElement("img");
  plane.id = "plane";
  plane.src = "images/other/plane.png";
  bg.appendChild(plane);
}

function loadAudio(resolve, reject) {
  let res = resolve;
  let bg = document.getElementById("res");
  let length = uniq.length;
  let i = 0;
  let sum = 0;
  let timer = setInterval(() => {
    if (sum === length) {
      clearInterval(timer);
      console.log("loaded audio");
      res();
    }
  }, 500);
  while (i < length) {
    let sound = uniq[i];
    let doc = document.createElement("audio");
    doc.muted = true; //prevents "user didn't interact with the document first. err"
    doc.src = `sounds/${sound}.wav`;
    doc.id = "s" + i;
    doc.muted = true;
    doc.onloadeddata = function() {
      sum++;
    };
    bg.appendChild(doc);
    i++;
  }
}

function level(level) {
  let i = level;
  let author = authors[i];
  let img = document.createElement("img");
  img.id = author;
  img.src = `images/authors/${author}.gif`;
  img.width = "200";
  img.height = "300";
  let pannel = document.createElement("img");
  pannel.id = `${author}_pannel`;
  pannel.src = `images/pannels/${author}_pannel.png`;
  pannel.className = "pannel";
  bg.appendChild(img);
  bg.appendChild(pannel);
}
