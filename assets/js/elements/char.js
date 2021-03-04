import Inventory from "../elements/inventory.js";
import Creature from "../elements/creature.js";

let inventory = new Inventory();

let width  = 1;
let height = 1;
let walking = true;
let attacking = true;

export default class Char extends Creature{

	constructor(){
		super();

		this.id = 'char';
		this.life = 150;
		this.mana = 70;
		this.skills = {attack: 40, defense: 38};
		this.hurt = this.life;
		this.inventory = {};
	}

	create(){

		let axisY = 5;
		let axisX = 5;

		this.type    = 'char';
		this.axisY   = axisY;
		this.axisX   = axisX;
		this.width   = width;
		this.height  = height;

		var element = document.createElement("div");

		element.id = this.id;
		element.style.width  = (this.width * this.prop) + "px";
		element.style.height = (this.height * this.prop) + "px";
		element.style.top    = this.prop * this.axisY + "px";
		element.style.left   = this.prop * this.axisX + "px";
		element.style.zIndex = (this.prop * this.axisY) + this.axisX;
		element.className = 'creature char';

		this.element = element;

		let dashboard = document.getElementById("health");
		dashboard.innerHTML = JSON.stringify({ life: this.hurt });

			dashboard = document.getElementById("inventory");
		dashboard.innerHTML = JSON.stringify({inventory: this.inventory}, null, 2);

		return this;
	}

	mechanics(keyState, collision){

		let move = false;

		let checkdrop      = collision['drop'];
		let checkdoors     = collision['doors'];
		let checkcollision = collision['busy'];

		collision['busy'] = [];
		collision['busy'].push(this.currentBlock());

		let up    = [...collision['up'], ...checkcollision ];
		let down  = [...collision['down'], ...checkcollision ];
		let left  = [...collision['left'], ...checkcollision ];
		let right = [...collision['right'], ...checkcollision ];
		let up_right   = [...collision['up'], ...right ];
		let down_right = [...collision['down'], ...right ];
		let left_up    = [...collision['up'], ...left ];
		let left_down  = [...collision['down'], ...left ];

		if(this.checkPress('up', keyState) && up.indexOf(this.validNextPosition('up')) < 0){
			move = this.moveChar(keyState);
		}

		if(this.checkPress('down', keyState) && down.indexOf(this.validNextPosition('down')) < 0){
			move = this.moveChar(keyState);
		}

		if(this.checkPress('left', keyState) && left.indexOf(this.validNextPosition('left')) < 0){
			move = this.moveChar(keyState);
		}

		if(this.checkPress('right', keyState) && right.indexOf(this.validNextPosition('right')) < 0){
			move = this.moveChar(keyState);
		}

		if(this.checkPress('up_right', keyState) && up_right.indexOf(this.validNextPosition('up_right')) < 0){
			move = this.moveChar(keyState, true);
		}

		if(this.checkPress('down_right', keyState) && down_right.indexOf(this.validNextPosition('down_right')) < 0){
			move = this.moveChar(keyState, true);
		}

		if(this.checkPress('left_up', keyState) && left_up.indexOf(this.validNextPosition('left_up')) < 0){
			move = this.moveChar(keyState, true);
		}

		if(this.checkPress('left_down', keyState) && left_down.indexOf(this.validNextPosition('left_down')) < 0){
			move = this.moveChar(keyState, true);
		}

		if(keyState["78"]){
			collision['drop'] = this.getItem(checkdrop);
		}

		if(move){
			collision['busy'].push(this.currentBlock());
		}

		collision['attack'] = this.whenAttack(keyState);

		if(checkdoors.doors.indexOf(this.currentBlock()) != -1){

			let door = checkdoors.passes[this.currentBlock()];

			this.setPosition(door.position);

			collision['map'] = door.map;
		}

		return collision;
	}

	moveChar(keyState, timeout){

		timeout = (timeout) ? 350 : 200;

		if(walking){
			// if(keyState['16'] == false){
				if(keyState["87"]){
					this.axisY -= 1;
				}

				if(keyState["83"]){
					this.axisY += 1;
				}

				if(keyState["65"]){
					this.axisX -= 1;
				}

				if(keyState["68"]){
					this.axisX += 1;
				}
			// }

			this.element.style.top  = this.prop * this.axisY + "px";
			this.element.style.left = this.prop * this.axisX + "px";
			this.element.style.zIndex = (this.prop * this.axisY) + this.axisX;

			walking = false;

			setTimeout(function(){
				walking = true;
			}, timeout);

			return true;
		}	
		
		return false;	
	}

	useItem(keyState){
		inventory.useItem(keyState, this);

		let dashboard = document.getElementById("health");
		dashboard.innerHTML = JSON.stringify({ life: this.hurt });

			dashboard = document.getElementById("inventory");
		dashboard.innerHTML = JSON.stringify({inventory: this.inventory}, null, 2);
	}

	getItem(drop){

		let block = this.currentBlock().toString();
		let pos = Object.keys(drop).indexOf(block);

		if(pos > -1){

			let item = drop[block];
				item.clearItem();

			delete drop[block];	

			if(Object.keys(this.inventory).indexOf(item.name) > -1){
				this.inventory[item.name] += item.quantity;
			}
			else{
				this.inventory[item.name] = item.quantity;
			}

			let dashboard = document.getElementById("inventory");
			dashboard.innerHTML = JSON.stringify({inventory: this.inventory}, null, 2);
		}

		return drop;
	}

	whenAttack(keyState){

		let attacks  = [];

		if(attacking){

			if(keyState["75"]){

				attacks = this.getAttack('simple');

				if(attacks.length){

					attacks.forEach(function(obj){
						let block = document.getElementById("block"+obj);
							block.className += ' attack';

							setTimeout(function(){
								block.classList.remove('attack');
							}, 100);
					});
				}
			}

			attacking = false;

			setTimeout(function(){
				attacking = true;
			}, 100);
		}

		return attacks;
	}

	finishCreature(){
		alert('oloco véi, vc perdeu... ruim em... caraca');
		document.location.reload(true);
	}
}