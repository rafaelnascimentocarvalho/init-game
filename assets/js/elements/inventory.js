let hotkeys  = {'79': 'health', '80': 'mana'};
let keyState = {'health': false, 'mana': false};

let health_cooldown = true;
let mana_cooldown = true;

export default class Inventory{

	useItem(keyState, char){

		if(keyState['79'] && health_cooldown){
			char.addHealth(10);
			health_cooldown = false;
			setTimeout(function(){
				health_cooldown = true;
			}, 1000);
		}

		if(keyState['80'] && mana_cooldown){
			mana_cooldown = false;
			setTimeout(function(){
				mana_cooldown = true;
			}, 1000);
		}

	}

	dropItems(items, creature){

		let down = (((creature.axisY + creature.height) * creature.prop) + creature.axisX).toString();
		let up = (((creature.axisY - 1) * creature.prop) + creature.axisX).toString();
		let right = (((creature.axisY * creature.prop) + creature.axisX) + 1).toString();
		let left = (((creature.axisY * creature.prop) + creature.axisX) - 1).toString();
		let up_right = (((creature.axisY - 1) * creature.prop) + creature.axisX + 1).toString();
		let down_right = (((creature.axisY + 1) * creature.prop) + creature.axisX + 1).toString();
		let left_up = (((creature.axisY - 1) * creature.prop) + creature.axisX - 1).toString();
		let left_down = (((creature.axisY + 1) * creature.prop) + creature.axisX - 1).toString();

		let blocks = [ down, up, right, up_right, down_right, left_up, left_down, left ];

		let loot = creature.loot;

		Object.keys(loot).forEach(function(drop){
			Object.keys(loot[drop]).forEach(function(obj){

				let chance = false;

				if(drop == 'default'){
					chance = true;
				}

				if(drop == 'common'){
					chance = Math.floor( Math.random() * (0 - 50) ) + 50;
					chance = (chance < 25) ? true : false;
				}

				if(drop == 'rare'){
					chance = Math.floor( Math.random() * (0 - 100) ) + 100;
					chance = (chance < 10) ? true : false;
				}				

				if(drop == 'veryrare'){
					chance = Math.floor( Math.random() * (0 - 100) ) + 100;
					chance = (chance < 10) ? true : false;
				}

				if(chance){

					let item = loot[drop][obj];

					if(item.min != undefined){
						let qtd  = Math.floor( Math.random() * (item.min - item.max) ) + item.max;

						item = '{"'+obj+'": '+qtd+'}';
						item = JSON.parse(item);

						let pos = Math.floor( Math.random() * (0 - blocks.length) ) + blocks.length;

						let block = blocks[pos];

						items[ block ] = item;

						blocks.slice(1, pos);
					}
				}
			});
		});

		return items;
	}
}