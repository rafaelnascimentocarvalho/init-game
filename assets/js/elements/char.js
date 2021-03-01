import Scroll from "../maker/ajust-scroll.js";
import Creature from "../elements/creature.js";

let scroll = new Scroll();
let width  = 1;
let height = 1;
let walking = true;
let attacking = true;

export default class Char extends Creature{

	constructor(){
		super();

		this.id = 'char';
		this.life = 70;
		this.hurt = this.life;
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
		element.className = 'creature char';
		this.element = element;

		return this;
	}

	mechanics(keyState, collision){

		let move = false;

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
			scroll.ajustScroll('up', this);
			move = this.moveChar(keyState);
		}

		if(this.checkPress('down', keyState) && down.indexOf(this.validNextPosition('down')) < 0){
			scroll.ajustScroll('down', this);
			move = this.moveChar(keyState);
		}

		if(this.checkPress('left', keyState) && left.indexOf(this.validNextPosition('left')) < 0){
			scroll.ajustScroll('left', this);
			move = this.moveChar(keyState);
		}

		if(this.checkPress('right', keyState) && right.indexOf(this.validNextPosition('right')) < 0){
			scroll.ajustScroll('right', this);			
			move = this.moveChar(keyState);
		}

		if(this.checkPress('up_right', keyState) && up_right.indexOf(this.validNextPosition('up_right')) < 0){
			scroll.ajustScroll('up', this);
			scroll.ajustScroll('right', this);
			move = this.moveChar(keyState, true);
		}

		if(this.checkPress('down_right', keyState) && down_right.indexOf(this.validNextPosition('down_right')) < 0){
			scroll.ajustScroll('down', this);
			scroll.ajustScroll('right', this);
			move = this.moveChar(keyState, true);
		}

		if(this.checkPress('left_up', keyState) && left_up.indexOf(this.validNextPosition('left_up')) < 0){
			scroll.ajustScroll('left', this);
			scroll.ajustScroll('up', this);
			move = this.moveChar(keyState, true);
		}

		if(this.checkPress('left_down', keyState) && left_down.indexOf(this.validNextPosition('left_down')) < 0){
			scroll.ajustScroll('down', this);
			scroll.ajustScroll('left', this);
			move = this.moveChar(keyState, true);
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

			walking = false;

			setTimeout(function(){
				walking = true;
			}, timeout);

			return true;
		}	
		
		return false;	
	}

	whenAttack(keyState){

		let attacks  = [];

		if(attacking){

			if(keyState["75"]){

				attacks = this.getAttack();

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

	ajustScreen(){
		scroll.ajustScreen(this);
	}
}