

function getScreenSize() {
  let width, height
  width = document.documentElement.clientWidth;
  height = document.documentElement.clientHeight;
  return { width, height };
}
function createBtn(name, func) {
  const tools = document.getElementById("btn_bar");
  let btn = document.createElement("img");
  btn.className = "btn";
  btn.id = name;
  btn.src = `images/other/${name}.png`;
  btn.ontouchstart = e => {
    e.stopPropagation();
  };
  btn.onclick = () => func();
  tools.appendChild(btn);
}
