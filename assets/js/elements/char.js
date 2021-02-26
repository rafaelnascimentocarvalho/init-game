import Scroll from "../maker/ajust-scroll.js";
import Creature from "../elements/creature.js";

let scroll = new Scroll();
let prop   = 50;
let width  = 1;
let height = 1;
let walking = true;

export default class Char extends Creature{

	constructor(){
		super();
	}

	create(){

		let axisY = 5;
		let axisX = 5;

		var element = document.createElement("div");

		element.style.width  = (width * prop) + "px";
		element.style.height = (height * prop) + "px";
		element.style.top    = prop * axisY + "px";
		element.style.left   = prop * axisX + "px";
		element.className = 'creature char';

		this.type    = 'char';
		this.element = element;
		this.axisY   = axisY;
		this.axisX   = axisX;
		this.width   = width;
		this.height  = height;

		return this;
	}

	mechanics(params){

		let keyState  = params.keyState;	
		let collision = params.collision;

		if(this.checkPress('up', keyState) && !(collision['up'].includes(this.validNextPosition('up')))){
			scroll.ajustScroll('up', this);			
			this.moveChar(keyState);
		}

		if(this.checkPress('down', keyState) && !(collision['down'].includes(this.validNextPosition('down')))){	
			scroll.ajustScroll('down', this);		
			this.moveChar(keyState);
		}

		if(this.checkPress('left', keyState) && !(collision['left'].includes(this.validNextPosition('left')))){	
			scroll.ajustScroll('left', this);		
			this.moveChar(keyState);
		}

		if(this.checkPress('right', keyState) && !(collision['right'].includes(this.validNextPosition('right')))){
			scroll.ajustScroll('right', this);
			this.moveChar(keyState);	
		}

		if(this.checkPress('up_right', keyState) && !(collision['up'].concat(collision['right']).includes(this.validNextPosition('up_right')))){			
			scroll.ajustScroll('up', this);
			scroll.ajustScroll('right', this);		
			this.moveChar(keyState, true);
		}

		if(this.checkPress('down_right', keyState) && !(collision['down'].concat(collision['right']).includes(this.validNextPosition('down_right')))){
			scroll.ajustScroll('down', this);
			scroll.ajustScroll('right', this);
			this.moveChar(keyState, true);
		}

		if(this.checkPress('left_up', keyState) && !(collision['up'].concat(collision['left']).includes(this.validNextPosition('left_up')))){						
			scroll.ajustScroll('left', this);
			scroll.ajustScroll('up', this);
			this.moveChar(keyState, true);
		}

		if(this.checkPress('left_down', keyState) && !(collision['down'].concat(collision['left']).includes(this.validNextPosition('left_down')))){						
			scroll.ajustScroll('down', this);
			scroll.ajustScroll('left', this);
			this.moveChar(keyState, true);
		}
	}

	moveChar(keyState, timeout){

		timeout = (timeout) ? 350 : 200;

		if(walking){
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

			this.element.style.top  = this.prop * this.axisY + "px";
			this.element.style.left = this.prop * this.axisX + "px";

			walking = false;

			setTimeout(function(){
				walking = true;
			}, timeout);
		}
	}

}