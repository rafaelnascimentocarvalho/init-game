import Mechanic from "./maker/mechanics.js";
import Draw from "./maker/draw.js";
import Map from "./maps/map.js";

let prop = 50;

let main = document.getElementById("main");
	main.style.width  = (prop * prop) + "px";
	main.style.height = (prop * prop) + "px";

let mechanic  = new Mechanic();
let draw      = new Draw();
let map = new Map();

draw.setMap( map.constructMap('level1') );

let keyState = {'87': false, '83': false, '65': false, '68': false};

window.addEventListener("keydown", keydown, true);
window.addEventListener("keyup", keyup, true);

function keydown(e){
	keyState[e.keyCode || e.which] = true;
}

function keyup(e){
	keyState[e.keyCode || e.which] = false;
}

function gameLoop() {

	draw.update(keyState);
    setTimeout(gameLoop, 10);
}

gameLoop();