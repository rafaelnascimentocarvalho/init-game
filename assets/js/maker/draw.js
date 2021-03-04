import Char from "../elements/char.js";
import Items from "../elements/items.js";
import Maps from "../elements/maps.js";

let start = true;

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

		let render = [];
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

		let y = 0;
		let x = 0;

		for (let i = 0; i < prop*prop; i++) {

			var element = document.createElement("div");

			element.id = "block"+i;
			element.classList = "floor";
			element.innerHTML = i+'<br>y:'+y+' <br>x:'+x+'</div>';

			render.push(element);

			if(x < (prop-1)){
				x++;	
			}
			else{
				x = 0;
				y++;
			}
		}

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

			render.push(object.element);
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

			render.push(door.element);
		});

		collision['doors'] = {doors: goto, passes: passes};

		collision['attack'] = [];
		collision['busy']   = [];

		if(start){
			char.create();
		}

		render.push( char.loadCreature() );

		monsters = maps.getMonsters();
		monsters.forEach((creature) => {
			render.push(creature.loadCreature());
		});

		// items drop
		drop = maps.getDrop();
		Object.keys(drop).forEach((item) => {
			render.push(drop[item].element);
		});
		collision['drop'] = drop;
		// --

		start = false;

		main.innerHTML = "";
		main.classList.add('change-map');

		Object.keys(render).forEach((element) => {
			main.appendChild( render[element] );
		});

		maps.ajustScreen(char, false);

		setTimeout(function(){
			main.classList.remove('change-map');
		}, 400);
	}

	update(keyState){

		monsters.forEach((monster) => {
			collision = monster.existence(char, collision);
		});

		collision = char.mechanics(keyState, collision);
		char.useItem(keyState);

		// Gerando loot de drop no chão
		let checkdrop = collision['drop'];
		Object.keys(checkdrop).forEach((block, key) => {

			if(checkdrop[block].dropped != true){

				let item = new Items();
					item.dropItem(checkdrop[block], block);

				main.appendChild( item.element );

				checkdrop[block] = item;
			}

		});
		collision['drop'] = checkdrop;
		// ---

		loaded_maps[this.map].ajustScreen(char, keyState);
		loaded_maps[this.map].setMonsters(monsters);
		loaded_maps[this.map].setDrop(checkdrop);

		if(collision['map'] != this.map){
			console.log('map');
			this.renderMap(collision['map']);
		}

		return collision;
	}
}
