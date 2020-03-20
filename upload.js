function loadImages(resolve, reject) {
  let res = resolve;
  let bg = document.getElementById("res");
  let length = authors.length;
  let allLength = length + 4;
  let sum = 0;
  loadauthors();
  notes();
  let timer = setInterval(() => {
    console.log(sum);
    if (sum >= allLength) {
      clearInterval(timer);
      res();
      console.log("loaded images");
    }
  }, 500);
  function loadauthors() {
    let i = 0;
    while (i < length) {
      let author = authors[i];
      let img = document.createElement("img");
      let src = `images/authors/${author}.gif`;
      console.log(src);
      img.id = author;
      img.src = src;
      img.width = "200";
      img.height = "300";
      img.onload = sum++;
      bg.appendChild(img);
      i++;
    }
  }
  function notes() {
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
  }
}

function loadAudio(resolve, reject) {
  let res = resolve;
  let bg = document.getElementById("res");
  let length = uniq.length;
  let i = 0;
  let sum = 0;
  audios();
  let timer = setInterval(() => {
    if (sum >= length) {
      clearInterval(timer);
      console.log("loaded audio");
      res();
    }
  }, 500);
  function audios() {
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
}
