import Creature from "../elements/creature.js";
import Inventory from "../elements/inventory.js";

let inventory = new Inventory();

let prop   = 50;
let direct = ['up', 'down', 'right', 'left'];

export default class Monster extends Creature{

	constructor(){
		super();
		this.alive = true;
	}

	create(params){

		this.life    = params.life;
		this.habitat = params.habitat;
		this.respaw  = params.respaw;
		this.width   = params.width;
		this.height  = params.height;
		this.loot    = params.loot;

		this.hurt = this.life;
		this.attack_cooldown = true;
		this.respaw_cooldown = this.respaw;

		this.id   = params.id;
		let axisY = params.axisY;
		let axisX = params.axisX;

		this.type    = 'monster';
		this.axisY   = params.axisY;
		this.axisX   = params.axisX;
		this.position = {axisY: params.axisY, axisX: params.axisX};

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
			let first = ((this.position.axisY - this.habitat) * this.prop) + (this.position.axisX - this.habitat);

			for (let y = 0; y < this.habitat * 2; y++) {
				area = [...area, first];
				for (let x = 0; x < this.habitat * 2; x++) {
					let blockX = first + x;
					area = [...area, blockX];
				}
				first = first + this.prop;
			}

			first = ((this.position.axisY - (this.habitat + 4)) * this.prop) + (this.position.axisX - (this.habitat + 4));

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
			
			let checkdrop = collision['drop'];

			if(this.respaw_cooldown == this.respaw){
				collision['drop'] = inventory.dropItems(checkdrop, this);				
			}
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

		if(this.axisY > this.position.axisY){
			dir = 'up'
		}

		if(this.axisY < this.position.axisY){
			dir = 'down'
		}

		if(this.axisX > this.position.axisX){
			dir = 'left'
		}

		if(this.axisX < this.position.axisX){
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

		this.respaw_cooldown = this.respaw
		this.hurt  = this.life;
		this.alive = true;

		let health = document.querySelectorAll('#' + this.id + " .life span")[0];
		let current = health.style.offsetWidth;
			current = (this.hurt * 100) / this.life;

		health.style.width = current + '%';
	}

}