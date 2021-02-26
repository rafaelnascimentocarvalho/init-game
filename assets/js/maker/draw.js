import Monster from "../elements/monster.js";
import Char from "../elements/char.js";

let char = new Char();
let monster = new Monster();

let prop = 50;
let objects = [];
let collision = [];
let main = document.getElementById("main");

export default class Draw{

	setMap(items){

		objects = items;

		let blocks = '';

		let x = 0;
		let y = 0;
		for (let i = 0; i < prop*prop; i++) {

			blocks += '<span id="block'+i+'">'+i+'<br>y:'+y+'<br>x:'+x+'</span>';

			if(y < (prop-1)){
				y++;	
			}	
			else{
				y = 0;
				x++;
			}	
		}

		main.innerHTML = blocks;

		let up = [];
		let left = [];
		let right = [];
		let down = [];

		items.forEach((object) => {

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

		char.create();

		monster.create();

		main.appendChild(char.element);
		main.appendChild(monster.element);
	}

	update(keyState){

		char.mechanics({keyState, collision});

		monster.existence(collision, char);
	}
}
