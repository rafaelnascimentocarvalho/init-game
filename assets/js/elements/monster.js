import Creature from "../elements/creature.js";

let prop   = 50;
let width  = 1;
let height = 1;

let attack_cooldown = true;
let habitat = 4;
let area   = [];
let defense = [];
let direct = ['up', 'down', 'right', 'left'];

export default class Monster extends Creature{

	constructor(){
		super();
		this.life = 70;
		this.hurt = this.life;
		this.alive = true;
	}

	create(){

		let axisY = 5;
		let axisX = 25;

		var element = document.createElement("div");

		element.id = this.id;
		element.style.width  = (width * prop) + "px";
		element.style.height = (height * prop) + "px";
		element.style.top    = prop * axisY + "px";
		element.style.left   = prop * axisX + "px";
		element.className = 'creature monster';

		this.type    = 'monster';
		this.element = element;
		this.respaw  = {axisY: axisY, axisX: axisX};
		this.axisY   = axisY;
		this.axisX   = axisX;
		this.width   = width;
		this.height  = height;

		// Define respaw area
		let first = ((this.respaw.axisY - habitat) * prop) + (this.respaw.axisX - habitat);

		for (let y = 0; y < habitat * 2; y++) {
			area = [...area, first];
			for (let x = 0; x < habitat * 2; x++) {
				let blockX = first + x;
				area = [...area, blockX];
			}
			first = first + prop;
		}

		first = ((this.respaw.axisY - (habitat+3)) * prop) + (this.respaw.axisX - habitat+3);

		for (let y = 0; y < habitat * 3; y++) {
			defense = (first > 0) ? [...defense, first] : [];
			for (let x = 0; x < habitat * 3; x++) {
				let blockX = first + x;
				defense = (blockX > 0) ? [...defense, blockX] : [];
			}
			first = first + prop;
		}

		// --- show respaw/defense area
		defense.forEach(function(obj){

			let block = document.getElementById("block"+obj);
				block.className += ' defense';
		});

		area.forEach(function(obj){

			let block = document.getElementById("block"+obj);
				block.className += ' area';
		});
		// ---

		this.area    = area;
		this.defense = defense;

		return this;
	}

	existence(char, collision){

		if(this.alive){

			let receive = collision['attack'];

			if(receive.length && this.alive){
				collision['attack'] = this.receiveAttack(receive, char);
			}

			let attack = false;
			let char_block = char.currentBlock();
			let in_defense = defense.includes(char_block) || area.includes(char_block);

			// Defense area
			if(in_defense){

				if(this.axisY > char.axisY){
					dir = 'up'
				}

				if(this.axisY < char.axisY){
					dir = 'down'
				}

				if(this.axisX > char.axisX){
					dir = 'left'
				}

				if(this.axisX < char.axisX){
					dir = 'right'
				}

				goto = this.validNextPosition(dir);

				if( (area.includes(goto) || defense.includes(goto)) && !( collision[dir].includes(goto) ) && char_block != goto ){										
					
					this.moveTo(dir);

					collision = this.whenAttack(char, collision);
				}
				else{				
					this.backHabitat(collision);
				}
			}
			else{

				var dir = direct[Math.floor( Math.random() * direct.length )];
				var goto = this.validNextPosition(dir);

				if( area.includes(goto) && !( collision[dir].includes(goto) ) ){
					this.moveTo(dir);
				}
				else{
					this.backHabitat(collision);
				}
			}
		}
		else{
			collision['attack'] = [];
		}
		
		return collision;
	}

	backHabitat(collision){		

		var dir = '';

		if(this.axisY > this.respaw.axisY){
			dir = 'up'
		}

		if(this.axisY < this.respaw.axisY){
			dir = 'down'
		}

		if(this.axisX > this.respaw.axisX){
			dir = 'left'
		}

		if(this.axisX < this.respaw.axisX){
			dir = 'right'
		}

		var goto = this.validNextPosition(dir);

		if( (this.area.includes(goto) || this.defense.includes(goto)) && !( collision[dir].includes(goto) ) ){
			this.moveTo(dir);
		}
	}

	whenAttack(char, collision){

		let attack = this.configureAttack(char);

		if(attack.length){

			attack.forEach(function(obj){
				let block = document.getElementById("block"+obj);
					block.className += ' attack';

					setTimeout(function(){
						block.classList.remove('attack');
					}, 100);
			});

			collision['attack'] = attack;
		}	

		return collision;
	}

	configureAttack(char){

		let find = true;
		let attacks = [(this.axisY * this.prop) + this.axisX];

		if(this.axisY-1 > char.axisY){
			find = false;
		}

		if(this.axisY+1 < char.axisY){
			find = false;
		}

		if(this.axisX-1 > char.axisX){
			find = false;
		}

		if(this.axisX+1 < char.axisX){
			find = false;
		}

		if(find && attack_cooldown){

			let chance = Math.floor(Math.random() * (800 - (800 * 4))) + 800 * 4;

			attacks.push( (char.axisY * prop) + char.axisX );
			attacks = char.receiveAttack(attacks, this);

			attack_cooldown = false;

			setTimeout(function(){
				attack_cooldown = true;
			}, chance);

			return attacks;
		}

		return find;
	}	

	respawCreature(){

		this.hurt  = this.life;
		this.alive = true;

		let health = document.querySelectorAll('#' + this.id + " .life span")[0];
		let current = health.style.offsetWidth;
			current = (this.hurt * 100) / this.life;

		health.style.width = current + '%';
	}

	finishCreature(){

		this.alive = false;
		var that = this;

		let creature = document.getElementById(this.id);
			creature.classList.add('dead');

		setTimeout(function(){
			let creature = document.getElementById(that.id);
				creature.classList.remove('dead');

			that.respawCreature();
		}, 5000);
	}
}