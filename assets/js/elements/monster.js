import Creature from "../elements/creature.js";

let prop   = 50;
let width  = 1;
let height = 1;

let direct = ['up', 'down', 'right', 'left'];

export default class Monster extends Creature{

	constructor(){
		super();
		this.alive = true;
		this.life = 10;
		this.habitat = 4;
		this.respaw = 1000;
		this.hurt = this.life;
		this.attack_cooldown = true;
		this.respaw_cooldown = this.respaw;
	}

	create(params){

		this.id   = params.id;
		let axisY = params.axisY;
		let axisX = params.axisX;

		this.type    = 'monster';
		this.respaw  = {axisY: axisY, axisX: axisX};
		this.axisY   = axisY;
		this.axisX   = axisX;
		this.width   = width;
		this.height  = height;

		var element = document.createElement("div");

		element.id = this.id;
		element.style.width  = (this.width * prop) + "px";
		element.style.height = (this.height * prop) + "px";
		element.style.top    = prop * this.axisY + "px";
		element.style.left   = prop * this.axisX + "px";
		element.className = 'creature monster';			
		this.element = element;

		if(this.id != 'char'){
			let area   = [];
			let defense = [];

			// Define respaw area
			let first = ((this.respaw.axisY - this.habitat) * this.prop) + (this.respaw.axisX - this.habitat);

			for (let y = 0; y < this.habitat * 2; y++) {
				area = [...area, first];
				for (let x = 0; x < this.habitat * 2; x++) {
					let blockX = first + x;
					area = [...area, blockX];
				}
				first = first + this.prop;
			}

			first = ((this.respaw.axisY - (this.habitat + 4)) * this.prop) + (this.respaw.axisX - (this.habitat + 4));

			for (let y = 0; y < this.habitat * 4; y++) {
				defense = (first > 0) ? [...defense, first] : [];
				for (let x = 0; x < this.habitat * 4; x++) {
					let blockX = first + x;
					defense = (blockX > 0) ? [...defense, blockX] : [];
				}
				first = first + this.prop;
			}

			this.area    = area;
			this.defense = defense;
		}

		return this;
	}

	existence(char, collision){

		if(this.alive){

			collision['busy'].push(char.currentBlock());
			collision['busy'].push(this.currentBlock());

			let checkcollision = collision['busy'];

			let up    = collision['up'].concat(checkcollision);
			let down  = collision['down'].concat(checkcollision);
			let left  = collision['left'].concat(checkcollision);
			let right = collision['right'].concat(checkcollision);
			let up_right   = collision['up'].concat(right);
			let down_right = collision['down'].concat(right);
			let left_up    = collision['up'].concat(left);
			let left_down  = collision['down'].concat(left);		

			this.receiveAttack(collision['attack'], char);

			let attack = false;
			let char_block = char.currentBlock();
			let in_defense = this.defense.includes(char_block) || this.area.includes(char_block);

			// Defense area
			if(in_defense){

				if(this.axisY > char.axisY){
					dir = 'up';
					checkcollision = up;
				}

				if(this.axisY < char.axisY){
					dir = 'down';
					checkcollision = down;
				}

				if(this.axisX > char.axisX){
					dir = 'left';
					checkcollision = left;
				}

				if(this.axisX < char.axisX){
					dir = 'right';
					checkcollision = right;
				}

				goto = this.validNextPosition(dir);

				if( (this.area.includes(goto) || this.defense.includes(goto)) && !( checkcollision.includes(goto) ) ){										
					
					this.moveTo(dir);
				}
				else{				
					this.backHabitat(collision);
				}

				this.whenAttack(char);
			}
			else{

				var dir = direct[Math.floor( Math.random() * direct.length )];
				var goto = this.validNextPosition(dir);

				if( this.area.includes(goto) && !( collision[dir].includes(goto) ) ){
					this.moveTo(dir);
				}
				else{
					this.backHabitat(collision);
				}

			}

			collision['busy'].push(char.currentBlock());
			collision['busy'].push(this.currentBlock());
		}
		else{
			// Esse cooldown vai funcionar para monstros em outros mapa
			// só quando tiver online, pq se não vai ter q ficar
			// calculando a existencia de todos o tempo todo
			// console.log(this.respaw_cooldown);

			this.respaw_cooldown--;

			if(this.respaw_cooldown == 0){
				this.respawCreature();			
			}
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

	whenAttack(char){

		let attack = this.configureAttack(char);

		if(attack.length){
			attack.forEach(function(obj){
				let block = document.getElementById("block"+obj);
					block.className += ' attack';

					setTimeout(function(){
						block.classList.remove('attack');
					}, 100);
			});
		}	
	}

	configureAttack(char){

		let find = true;
		let attacks = [this.currentBlock()];

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

		if(find && this.attack_cooldown){

			let chance = Math.floor(Math.random() * (800 - (800 * 4))) + 800 * 4;

			attacks.push( char.currentBlock() );
			char.receiveAttack(attacks, this);

			this.attack_cooldown = false;

			setTimeout(function(){
				this.attack_cooldown = true;
			}.bind(this), chance);
		}

		return find;
	}	

	respawCreature(){

		let creature = document.getElementById(this.id);
			creature.classList.remove('dead');

		this.hurt  = this.life;
		this.alive = true;

		let health = document.querySelectorAll('#' + this.id + " .life span")[0];
		let current = health.style.offsetWidth;
			current = (this.hurt * 100) / this.life;

		health.style.width = current + '%';
	}
}