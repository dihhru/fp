function loadImages(resolve, reject) {
  let res = resolve;
  let bg = document.getElementById("res");
  let length = 4 + 3 + 1 + uniq.length + authors.length + authors.length
  let sum = 0;
  let timer = setInterval(() => {
    let prog = 100/length*sum+'%'
     document.getElementById("bar").style.width=prog
    if (sum === length) {
      clearInterval(timer);
      res()
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
    doc.src = `sounds/${sound}.wav`;
    doc.id = "s" + i3;;
    doc.onloadedmetadata = () => sum++;
    bg.appendChild(doc);
    i3++;
  }
  let plane = document.createElement("img");
  plane.id = "plane";
  plane.src = "images/other/plane.png";
  plane.onload = () => sum++;
  bg.appendChild(plane);
  let i4 = 0 
  while (i4<authors.length) {
    let author = authors[i4];
    let img = document.createElement("img");
    img.id = author;
    img.src = `images/authors/${author}.gif`;
    img.width = "200";
    img.height = "300";
    img.onload  = ()=> sum++
    let pannel = document.createElement("img");
    pannel.id = `${author}_pannel`;
    pannel.src = `images/pannels/${author}_pannel.png`;
    pannel.className = "pannel";
    pannel.onload = () => sum++
    bg.appendChild(img);
    bg.appendChild(pannel);
    i4++
  }
}

