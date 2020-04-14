
function draw(img, x, y, width, height) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    img = document.getElementById(img);
    ctx.drawImage(img, x, y, width, height);
}
function fly({ x, y, speed}) {
    x += speed;
    y += 0.5;
    return { x, y, speed};   
} 
async function prepare({ width, height }) {
    const loadingScreen = document.getElementById("loadingScreen");
    loadingScreen.style.width = width + "px";
    loadingScreen.style.height = height + "px";
    let load = await new Promise((resolve) => initialAnimation(resolve));
    let imagesP = await new Promise((resolve, reject) => downloadFiles(resolve, reject));
    return load + imagesP
};
function gameLoop() {
    let timer = setInterval(()=>game.update(), 7)
}
function start() {
    game.adjust()
    changeText('Press Enter to start')
    game.startLevel()
    gameLoop()
}
