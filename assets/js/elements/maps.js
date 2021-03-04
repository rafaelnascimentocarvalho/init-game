import Scroll from "../maker/ajust-scroll.js";
import Monster from "./monster.js";
import Char from "./char.js";
import Objects from "./objects.js";
import Door from "./door.js";

import world from "../library/places/autoloadmap.js";

let scroll = new Scroll();

export default class Maps{

	constructMap(map){

		this.world = world(map);
		this.map = map;
		this.monsters = false;
		this.chars = false;
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

	setChars(chars){
		this.chars = chars;
	}

	getChars(){

		if(this.chars == false){

			let world = this.world['chars'];
			let chars = [];

			Object.keys(world).forEach(function(key){
				let config = world[key];
				let char = new Char();
				char.create(config);
				chars.push(char);
			});

			this.chars = chars;
		}

		return this.chars;
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

	ajustScreen(creature, keyState){

		if(scroll.onScreen(creature) && keyState){

			if( keyState["87"] ){
				scroll.ajustScroll('up', creature);			
			}

			if( keyState["83"] ){
				scroll.ajustScroll('down', creature);			
			}

			if( keyState["65"] ){
				scroll.ajustScroll('left', creature);			
			}

			if( keyState["68"] ){
				scroll.ajustScroll('right', creature);						
			}

			if( keyState["68"] && keyState["87"] ){
				scroll.ajustScroll('up', creature);
				scroll.ajustScroll('right', creature);			
			}

			if( keyState["68"] && keyState["83"] ){
				scroll.ajustScroll('down', creature);
				scroll.ajustScroll('right', creature);			
			}

			if( keyState["65"] && keyState["87"] ){
				scroll.ajustScroll('left', creature);
				scroll.ajustScroll('up', creature);			
			}

			if( keyState["65"] && keyState["83"] ){
				scroll.ajustScroll('down', creature);
				scroll.ajustScroll('left', creature);			
			}
		}
		else{
			scroll.ajustScreen(creature);
		}
	}
}