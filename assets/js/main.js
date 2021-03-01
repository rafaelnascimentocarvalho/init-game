import Draw from "./maker/draw.js";

let prop = 50;


let main = document.getElementById("main");
	main.style.width  = (prop * prop) + "px";
	main.style.height = (prop * prop) + "px";

let data = [];
let draw = new Draw();

let map = 'map2';
draw.renderMap( map );

let keyState = {'16': false, '87': false, '83': false, '65': false, '68': false};

window.addEventListener("keydown", keydown, true);
window.addEventListener("keyup", keyup, true);

function keydown(e){
	keyState[e.keyCode || e.which] = true;
}

function keyup(e){
	keyState[e.keyCode || e.which] = false;
}

function gameLoop() {

	data = draw.update(keyState);
    setTimeout(gameLoop, 10);
}

gameLoop();