import Object from "../elements/object.js";

let objects = [];

export default class Maps{

	constructMap(level){

		let box1 = new Object();
		box1.create(0, 0, 6, 2);
		objects.push(box1);

		let box2 = new Object();
		box2.create(6, 8, 2, 6);
		objects.push(box2);

		let box3 = new Object();
		box3.create(10, 30, 5, 2);
		objects.push(box3);

		return objects;
	}
}