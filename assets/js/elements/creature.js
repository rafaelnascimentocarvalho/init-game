let walking  = true;
let cooldown = true;

export default class Creature{

	constructor() {
		this.prop = 50;
		this.focus = 'down';

		var creatue_id = Math.floor(Math.random() * 1000);

		this.id = 'creature_'+creatue_id;
	}

	moveTo(direct){

		if(walking){

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

			walking = false;

			setTimeout(function(){
				walking = true;
			}, 800);
		}
	}

	loadCreature(){
		this.element.innerHTML = '<div class="life"><span style="width: 100%"></span></div>';
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

	getAttack(){

		let timeout = 400;

		if(cooldown){

			let attack = [(this.axisY * this.prop) + this.axisX];
			cooldown = false;

			setTimeout(function(){
				cooldown = true;
			}, timeout);

			if(this.focus == 'down'){
				attack = [...attack, ((this.axisY + this.height) * this.prop) + this.axisX];
			}

			if(this.focus == 'up'){
				attack = [...attack, ((this.axisY - 1) * this.prop) + this.axisX];
			}

			if(this.focus == 'right'){
				attack = [...attack, ((this.axisY * this.prop) + this.axisX) + 1];
			}

			if(this.focus == 'left'){
				attack = [...attack, ((this.axisY * this.prop) + this.axisX) - 1];
			}

			// diagonal
			if(this.focus == 'up_right'){
				attack = [...attack, ((this.axisY - 1) * this.prop) + this.axisX + 1];
			}	

			if(this.focus == 'down_right'){
				attack = [...attack, (((this.axisY + 1) * this.prop) + this.axisX + 1)];
			}	

			if(this.focus == 'left_up'){
				attack = [...attack, ((this.axisY - 1) * this.prop) + this.axisX - 1];
			}

			if(this.focus == 'left_down'){
				attack = [...attack, (((this.axisY + 1) * this.prop) + this.axisX - 1)];
			}

			return attack;
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

		let receive = attacks;

		if(receive.length){

			let current_block = (this.axisY * this.prop) + this.axisX;

			if(this.defense != true){
				if(receive.indexOf(current_block) > -1){

					let hurt = creature.generateAttack();
					this.removeHealth(hurt);

					creature = document.getElementById(this.id);
					creature.className += ' receive';

					setTimeout(function(){
						creature.classList.remove('receive');
					}, 200);
				}
			}
			else{
				let creature = document.getElementById(this.id);
					creature.classList.add('defense');

				setTimeout(function(){
					creature.classList.remove('defense');
				}, 200);				
			}

			receive.forEach(function(atk){
				if(attacks.indexOf(atk) > -1){
					attacks = attacks.splice(1, atk);
				}
			});
		}

		return attacks;
	}

	generateAttack(){
		return 1;
	}

	removeHealth(hurt){

		this.hurt -= hurt;

		let health = document.querySelectorAll('#' + this.id + " .life span")[0];
		let current = health.style.offsetWidth;
			current = (this.hurt * 100) / this.life;

		health.style.width = current + '%';

		if(this.hurt <= 0){
			this.finishCreature();
		}
	}

	currentBlock(){
		return (this.axisY * this.prop) + this.axisX;
	}
}