function addInputs(game) {
    document.addEventListener(
        "keydown",
        event => {
            switch (event.keyCode) {
                case 38:
                    game.moveY("+");
                    break;
                case 40:
                    game.moveY("-");
                    break;
                case 32:
                    game.togglePause()
                    break;
                case 13:
                    game.togglePause()
                    break;
                default:
                    break;
            }
        },
        {
            passive: true
        }
    );
    document.addEventListener(
        "touchstart",
        event => {
            game.togglePause(false)
            let height = document.documentElement.clientHeight;
            let touchY = event.targetTouches[0].clientY;
            let middle = height / 2;
            touchY >= middle ? game.moveY("-") : game.moveY("+");

        },
        { passive: true }
    );
}