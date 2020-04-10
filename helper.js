
function draw(img, x, y, width, height) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    img = document.getElementById(img);
    ctx.drawImage(img, x, y, width, height);
}
function move({ x, y, speed}) {
    x += 2 * speed;
    y += 0.2;
    return { x, y, speed};   
} 
async function prepare({ width, height }) {
    const loading = document.getElementById("loading");
    loading.style.width = width + "px";
    loading.style.height = height + "px";
    let load = await new Promise((resolve, reject) => initAnime(resolve));
    let imagesP = await new Promise((resolve, reject) => loadImages(resolve, reject));
    return load + imagesP
};
function gameLoop() {
    // let ok = await new Promise((res) => game.update(res)).then(requestAnimationFrame(gameLoop))
    // return ok
    let timer = setInterval(()=>game.update(), 7)
}
function start() {
    game.adjust()
    changeText()
    game.initLevel()
    gameLoop()
}
