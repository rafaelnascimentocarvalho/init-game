import Char from "../elements/char.js";
import Items from "../elements/items.js";
import Maps from "../elements/maps.js";

let start = false;

let char  = new Char();
let monsters  = [];
let drop = [];

let loaded_maps = {};

let prop = 50;
let objects = [];
let collision = [];
let main = document.getElementById("main");

export default class Draw{

	renderMap(map){

		main.classList.add('change-map');

		let maps = new Maps();

		collision['map'] = map;
		this.map = map;

		if(loaded_maps[map] == undefined){
			maps.constructMap(map);
			let setMap = {map: maps};
			loaded_maps[map] = maps;
		}else{
			maps = loaded_maps[map];
		}

		let blocks_render = '';

		let y = 0;
		let x = 0;

		for (let i = 0; i < prop*prop; i++) {

			blocks_render += '<div id="block'+i+'" class="floor"> '+i+'<br>y:'+y+' <br>x:'+x+'</div>';

			if(x < (prop-1)){
				x++;	
			}
			else{
				x = 0;
				y++;
			}	
		}

		main.innerHTML = blocks_render;

		let blocks = maps.placesMap();
		
		let up = [];
		let left = [];
		let right = [];
		let down = [];

		blocks.forEach((object) => {

			up = up.concat(object.getCollision('up'));
			left = left.concat(object.getCollision('left'));
			right = right.concat(object.getCollision('right'));
			down = down.concat(object.getCollision('down'));

			main.appendChild(object.element);
		});

		collision['up']    = up;
		collision['left']  = left;
		collision['right'] = right;
		collision['down']  = down;

		let doors = maps.doorsMap();

		let goto = [];
		let passes = [];

		doors.forEach((door) => {

			goto = goto.concat(door.getCollision('up'));
			goto = goto.concat(door.getCollision('left'));
			goto = goto.concat(door.getCollision('right'));
			goto = goto.concat(door.getCollision('down'));

			goto.forEach((go) => {
				passes[go] = door;
			});

			main.appendChild(door.element);
		});

		collision['doors'] = {doors: goto, passes: passes};

		collision['attack'] = [];
		collision['busy']   = [];

		if(!start) char.create();
		main.appendChild( char.loadCreature() );

		monsters = maps.getMonsters();
		monsters.forEach((creature) => {
			main.appendChild( creature.loadCreature() );
		});

		// items drop
		drop = maps.getDrop();
		Object.keys(drop).forEach((item) => {
			main.appendChild( drop[item].element );
		});
		collision['drop'] = drop;
		// --

		start = true;

		setTimeout(function(){		
			main.classList.remove('change-map');
		}, 350);
	}

	update(keyState){

		let data = [];

		monsters.forEach((monster) => {
			collision = monster.existence(char, collision);
		});

		collision = char.mechanics(keyState, collision);

		// Gerando loot de drop no chão
		let checkdrop = collision['drop'];
		Object.keys(checkdrop).forEach((block, key) => {
			if(checkdrop[block].dropped == undefined){

				let item = new Items();
					item.dropItem(checkdrop[block], block);

				main.appendChild( item.element );

				console.log(item);

				checkdrop[block] = item;
			}
		});
		loaded_maps[this.map].setDrop(checkdrop);
		collision['drop'] = checkdrop;
		// ---

		char.useItem(keyState);

		loaded_maps[this.map].setMonsters(monsters);

		if(collision['map'] != this.map){
			this.renderMap(collision['map']);
			char.ajustScreen();
		}

		return data;
	}
}
