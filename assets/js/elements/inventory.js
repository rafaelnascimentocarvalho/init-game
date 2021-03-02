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
}