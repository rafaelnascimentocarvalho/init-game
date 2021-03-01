import Objects from "./objects.js";

export default class Door extends Objects{

	constructor(){
		super();
	}

	setDoor(params){
		this.create(params);
		this.map = params.map;
		this.position = params.position;
	}
}