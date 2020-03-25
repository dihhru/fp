
function draw(img, x, y, width, height) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    img = document.getElementById(img);
    ctx.drawImage(img, x, y, width, height);
}
function move({ x, y }, speed) {
    x += 2 * speed;
    y += 0.2;
    return { x, y };
}