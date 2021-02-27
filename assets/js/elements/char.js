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
		this.life = 70;
		this.hurt = this.life;
	}

	create(){

		let axisY = 5;
		let axisX = 5;

		var element = document.createElement("div");

		element.id = this.id;
		element.style.width  = (width * this.prop) + "px";
		element.style.height = (height * this.prop) + "px";
		element.style.top    = this.prop * axisY + "px";
		element.style.left   = this.prop * axisX + "px";
		element.className = 'creature char';

		this.type    = 'char';
		this.element = element;
		this.axisY   = axisY;
		this.axisX   = axisX;
		this.width   = width;
		this.height  = height;

		return this;
	}

	mechanics(keyState, collision){

		let up    = [...collision['up'], collision['busy'] ];
		let down  = [...collision['down'], collision['busy'] ];
		let left  = [...collision['left'], collision['busy'] ];
		let right = [...collision['right'], collision['busy'] ];
		let up_right   = [...collision['up'], ...right ];
		let down_right = [...collision['down'], ...right ];
		let left_up    = [...collision['up'], ...left ];
		let left_down  = [...collision['down'], ...left ];

		if(this.checkPress('up', keyState) && up.indexOf(this.validNextPosition('up')) < 0){
			scroll.ajustScroll('up', this);			
			this.moveChar(keyState);
		}

		if(this.checkPress('down', keyState) && down.indexOf(this.validNextPosition('down')) < 0){
			scroll.ajustScroll('down', this);		
			this.moveChar(keyState);
		}

		if(this.checkPress('left', keyState) && left.indexOf(this.validNextPosition('left')) < 0){
			scroll.ajustScroll('left', this);		
			this.moveChar(keyState);
		}

		if(this.checkPress('right', keyState) && right.indexOf(this.validNextPosition('right')) < 0){
			scroll.ajustScroll('right', this);
			this.moveChar(keyState);	
		}

		if(this.checkPress('up_right', keyState) && up_right.indexOf(this.validNextPosition('up_right')) < 0){
			scroll.ajustScroll('up', this);
			scroll.ajustScroll('right', this);		
			this.moveChar(keyState, true);
		}

		if(this.checkPress('down_right', keyState) && down_right.indexOf(this.validNextPosition('down_right')) < 0){
			scroll.ajustScroll('down', this);
			scroll.ajustScroll('right', this);
			this.moveChar(keyState, true);
		}

		if(this.checkPress('left_up', keyState) && left_up.indexOf(this.validNextPosition('left_up')) < 0){
			scroll.ajustScroll('left', this);
			scroll.ajustScroll('up', this);
			this.moveChar(keyState, true);
		}

		if(this.checkPress('left_down', keyState) && left_down.indexOf(this.validNextPosition('left_down')) < 0){
			scroll.ajustScroll('down', this);
			scroll.ajustScroll('left', this);
			this.moveChar(keyState, true);
		}

		return this.whenAttack(keyState, collision);
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
		}		
	}

	whenAttack(keyState, collision){

		let attack  = [];

		if(attacking){

			if(keyState["75"]){

				attack = this.getAttack();

				if(attack.length){

					attack.forEach(function(obj){
						let block = document.getElementById("block"+obj);
							block.className += ' attack';

							setTimeout(function(){
								block.classList.remove('attack');
							}, 100);
					});
				}

				collision['attack'] = attack;
			}

			attacking = false;

			setTimeout(function(){
				attacking = true;
			}, 100);
		}

		return collision;
	}

	finishCreature(){
		alert('oloco véi, vc perdeu... ruim em... caraca');
		document.location.reload(true);
	}
}