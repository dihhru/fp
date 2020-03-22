function loadImages(resolve, reject) {
  let res = resolve;
  let bg = document.getElementById("res");
  let length = 4 + 3 + 1 + uniq.length;
  let sum = 0;
  let timer = setInterval(() => {
    console.log(sum);
    if (sum === length) {
      clearInterval(timer);
      setTimeout(() => res(),14445000);
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
  let i2 = 1;
  while (i2 <= 3) {
    let img = document.createElement("img");
    img.src = `images/other/speed${i2}.png`;
    img.width = "150";
    img.id = i2;
    img.onload = () => sum++;
    bg.appendChild(img);
    i2++;
  }
  let i3 = 0;
  while (i3 < uniq.length) {
    let sound = uniq[i3];
    let doc = document.createElement("audio");
    doc.muted = true; //prevents "user didn't interact with the document first. err"
    doc.src = `sounds/${sound}.wav`;
    doc.id = "s" + i3;
    doc.muted = true;
    doc.onloadedmetadata = () => sum++;
    bg.appendChild(doc);
    i3++;
  }
  let plane = document.createElement("img");
  plane.id = "plane";
  plane.src = "images/other/plane.png";
  plane.onload = () => sum++;
  bg.appendChild(plane);
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
