import Monster from "./monster.js";
import Objects from "./objects.js";
import Door from "./door.js";

import world from "../library/places/autoloadmap.js";

export default class Maps{

	constructMap(map){

		this.world = world(map);
		this.map = map;
		this.monsters = false;
		this.drop = false;
	}

	placesMap(){

		let world = this.world['blocks'];
		let blocks = [];

		Object.keys(world).forEach(function(key){
			let config = world[key];
			let block = new Objects();
			block.create(config);
			blocks.push(block);
		});

		this.blocks = blocks;

		return blocks;
	}

	doorsMap(){

		let world = this.world['doors'];
		let doors = [];

		Object.keys(world).forEach(function(key){
			let config = world[key];
			let door = new Door();
			door.setDoor(config);
			doors.push(door);
		});

		this.doors = doors;

		return doors;
	}

	setMonsters(monsters){
		this.monsters = monsters;
	}

	getMonsters(){

		if(this.monsters == false){

			let world = this.world['monsters'];
			let monsters = [];

			Object.keys(world).forEach(function(key){
				let config = world[key];
				let monster = new Monster();
				monster.create(config);
				monsters.push(monster);
			});

			this.monsters = monsters;
		}

		return this.monsters;
	}

	setDrop(drop){
		this.drop = drop;
	}

	getDrop(){

		if(this.drop == false){
			this.drop = {};
		}

		return this.drop;
	}
}