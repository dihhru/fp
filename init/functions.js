

async function gameLoop() {
  let ok = await new Promise((res) => game.update(res)).then(requestAnimationFrame(gameLoop))
  return ok
}
function screenSize() {
  let width, height, n;
  width = document.documentElement.clientWidth;
  height = document.documentElement.clientHeight;
  return { width, height };
}
function create(name, func) {
  const tools = document.getElementById("tools");
  let object = document.createElement("img");
  object.className = "object";
  object.id = name;
  object.src = `images/other/${name}.png`;
  object.ontouchstart = e => {
    e.stopPropagation();
  };
  object.onclick = () => func();
  tools.appendChild(object);
}
