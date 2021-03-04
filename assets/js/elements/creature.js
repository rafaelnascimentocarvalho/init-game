import Attack from "../library/attacks/autoloadattacks.js";
import Inventory from "./inventory.js";

export default class Creature{

	constructor(){
		this.prop = 50;
		this.focus = 'down';

		this.walking  = true;
		this.cooldown = true;
	}

	moveTo(direct){

		if(this.walking){

			if(direct == 'up'){
				this.axisY -= 1;
			}

			if(direct == 'down'){
				this.axisY += 1;
			}

			if(direct == 'left'){
				this.axisX -= 1;
			}

			if(direct == 'right'){
				this.axisX += 1;
			}

			this.setFocus(direct, false);

			this.element.style.top  = this.prop * this.axisY + "px";
			this.element.style.left = this.prop * this.axisX + "px";
			this.element.style.zIndex = (this.prop * this.axisY) + this.axisX;

			this.walking = false;

			let move = Math.floor(Math.random() * (600 - (800))) + 800;

			setTimeout(function(){
				this.walking = true;
			}.bind(this), move);
		}
	}

	loadCreature(){

		let current = (this.hurt * 100) / this.life;

		this.element.style.top  = this.prop * this.axisY + "px";
		this.element.style.left = this.prop * this.axisX + "px";
		this.element.innerHTML  = '<div class="life"><span style="width: '+current+'%"></span></div>';

		return this.element;
	}

	validNextPosition(direct){

		if(direct == 'down'){
			return ((this.axisY + this.height) * this.prop) + this.axisX;
		}

		if(direct == 'up'){			
			return ((this.axisY - 1) * this.prop) + this.axisX;
		}

		if(direct == 'right'){			
			return ((this.axisY * this.prop) + this.axisX) + 1;
		}

		if(direct == 'left'){			
			return ((this.axisY * this.prop) + this.axisX) - 1;
		}

		// diagonal
		if(direct == 'up_right'){			
			return ((this.axisY - 1) * this.prop) + this.axisX + 1;
		}	

		if(direct == 'down_right'){			
			return (((this.axisY + 1) * this.prop) + this.axisX + 1);
		}	

		if(direct == 'left_up'){			
			return ((this.axisY - 1) * this.prop) + this.axisX - 1;
		}

		if(direct == 'left_down'){			
			return (((this.axisY + 1) * this.prop) + this.axisX - 1);
		}

		return false;
	}

	checkPress(direct, keyState){

		this.defense = keyState['16'];

		if(direct == 'up' && keyState["87"] && keyState["65"] == false && keyState["68"] == false && keyState["83"] == false){
			
			this.setFocus(direct, keyState['16']);
			return true;
		}

		if(direct == 'down' && keyState["83"] && keyState["65"] == false && keyState["68"] == false && keyState["87"] == false){			
			
			this.setFocus(direct, keyState['16']);
			return true;
		}

		if(direct == 'left' && keyState["65"] && keyState["83"] == false && keyState["87"] == false && keyState["68"] == false){			
			
			this.setFocus(direct, keyState['16']);
			return true;
		}

		if(direct == 'right' && keyState["68"] && keyState["83"] == false && keyState["87"] == false && keyState["65"] == false){			
			
			this.setFocus(direct, keyState['16']);
			return true;
		}

		//  diagonal
		if(direct == 'up_right' && keyState["87"] && keyState["68"] && keyState["83"] == false && keyState["65"] == false){			
			
			this.setFocus(direct, keyState['16']);
			return true;
		}

		if(direct == 'down_right' && keyState["83"] && keyState["68"] && keyState["65"] == false && keyState["87"] == false){			
			
			this.setFocus(direct, keyState['16']);
			return true;
		}

		if(direct == 'left_up' && keyState["65"] && keyState["87"] && keyState["68"] == false && keyState["83"] == false){			
			
			this.setFocus(direct, keyState['16']);
			return true;
		}

		if(direct == 'left_down' && keyState["65"] && keyState["83"] && keyState["87"] == false && keyState["68"] == false){									

			this.setFocus(direct, keyState['16']);
			return true;
		}

		return false;
	}

	getAttack(type){

		let timeout = 400;

		if(this.cooldown){

			this.cooldown = false;

			setTimeout(function(){
				this.cooldown = true;
			}.bind(this), timeout);

			return Attack(this.focus, type, this);
		}

		return false;
	}

	setFocus(direct, shift){

		if(direct == 'up'){
			this.focus = (shift == false) ? 'up' : 'down';
		}

		if(direct == 'down'){
			this.focus = (shift == false) ? 'down' : 'up';
		}

		if(direct == 'left'){
			this.focus = (shift == false) ? 'left' : 'right';
		}

		if(direct == 'right'){
			this.focus = (shift == false) ? 'right' : 'left';
		}

		//  diagonal
		if(direct == 'up_right'){
			this.focus = (shift == false) ? 'up_right' : 'left_down';
		}

		if(direct == 'down_right'){
			this.focus = (shift == false) ? 'down_right' : 'left_up';
		}

		if(direct == 'left_up'){
			this.focus = (shift == false) ? 'left_up' : 'down_right';
		}

		if(direct == 'left_down'){
			this.focus = (shift == false) ? 'left_down' : 'up_right';
		}

		let monster = document.getElementById(this.id);
			monster.classList.remove('up');
			monster.classList.remove('down');
			monster.classList.remove('left');
			monster.classList.remove('right');
			monster.classList.remove('up_right');
			monster.classList.remove('down_right');
			monster.classList.remove('left_up');
			monster.classList.remove('left_down');
			monster.classList.add(this.focus);
	}

	receiveAttack(attacks, creature){

		let receive = [];

		if(attacks.length){

			if(this.defense != true){

				// console.log(creature.id);

				if(attacks.indexOf(this.currentBlock()) > -1){

					let id = this.id;

					// if(id == 'char'){
					// 	console.log(creature.id, attacks);
					// }

					receive.push(this.currentBlock());

					let hurt = creature.generateAttack();
					this.removeHealth(hurt);

					let creature_ = document.getElementById(this.id);
						creature_.className += ' receive';

					setTimeout(function(){
						creature_.classList.remove('receive');
					}, 200);
				}
			}
			else{
				let creature_ = document.getElementById(this.id);
					creature_.classList.add('defense');

				setTimeout(function(){
					creature_.classList.remove('defense');
				}, 200);				
			}
		}
	}

	generateAttack(){

		let max_hit = this.skills['attack'];
		let min_hit = (max_hit * 15) / 100;

		let hit = Math.floor( Math.random() * (min_hit - max_hit) ) + max_hit;

		return hit;
	}

	removeHealth(hurt){

		let max_def = this.skills['defense'];
		let min_def = (max_def * 15) / 100;

		let def = Math.floor( Math.random() * (min_def - max_def) ) + max_def;

		hurt = (( def - hurt ) > 0) ? def - hurt : 0;

		this.hurt -= hurt;

		if(this.id == 'char'){
			let dashboard = document.getElementById("health");
			dashboard.innerHTML = JSON.stringify({ life: this.hurt });
		}

		let health = document.querySelectorAll('#' + this.id + " .life span")[0];
		let current = health.style.offsetWidth;
			current = (this.hurt * 100) / this.life;

		health.style.width = current + '%';

		if(this.hurt <= 0){

			let creature = document.getElementById(this.id);
				creature.classList.add('dead');

			this.alive = false;
		}
	}

	addHealth(sumhealth){

		if(this.hurt < this.life){

			sumhealth = ((sumhealth + this.hurt) > this.life) ? this.life - this.hurt : sumhealth;

			this.hurt += sumhealth;

			if(this.id == 'char'){
				let dashboard = document.getElementById("health");
				dashboard.innerHTML = JSON.stringify({ life: this.hurt });
			}

			let health = document.querySelectorAll('#' + this.id + " .life span")[0];
			let current = health.style.offsetWidth;
				current = (this.hurt * 100) / this.life;

			health.style.width = current + '%';

			this.alive = false;
		}
	}

	currentBlock(){
		return (this.axisY * this.prop) + this.axisX;
	}

	setPosition(params){
		this.element.classList.add('goto');
		this.axisY   = params.axisY;
		this.axisX   = params.axisX;
		setTimeout(function(){
			this.element.classList.remove('goto');
		}.bind(this), 100);			
	}
}