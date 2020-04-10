function show(lvl, resolve) {
    const root = document.getElementById("root");
    img = document.getElementById(authors[lvl]);
    clone = img.cloneNode();
    clone.className = "author";
    root.appendChild(clone);
    setTimeout(() => clone.classList.add("authorA"), 500);
    setTimeout(() => {
        root.removeChild(clone);
        resolve();
    }, 3500);
}
function showhide(el, el2) {
    let show, hide
    show = document.getElementById(el)
     hide = document.getElementById(el2)
    show.style.display = ''
    hide.style.display = 'none'
}
function initAnime(resolve) {
    showhide('text', 'img')
    setTimeout(() => {
        showhide('img', 'text')
        resolve()
    }, 2500)
}
function changeText() {
    showhide('text', 'img')
    let text = document.getElementById('text')
    text.innerHTML = 'Press Enter to start'
}