let prop = 50;

export default class Items{

	dropItem(item, block){

		let name = Object.keys(item)[0];		
		let qtd  = Object.values(item)[0];

		let axisY = parseInt(block);
		let axisX = parseInt(block);

			axisX = axisY - (axisY - (axisY % prop));
			axisY = (axisY - axisX) / prop;

		this.id   = (name + '_') + (axisY * ( Math.floor( Math.random() * (0 - 100) ) + 100) );
		this.name = name;
		this.quantity = qtd;
		this.axisY = axisY;
		this.axisX = axisX;
		this.block = parseInt(block);
		this.dropped = true;

		var element = document.createElement("div");

		element.id = this.id;
		element.style.width  = prop + "px";
		element.style.height = prop + "px";
		element.style.top    = prop * this.axisY + "px";
		element.style.left   = prop * this.axisX + "px";
		element.className = 'item ' + this.name;
		element.innerHTML = this.name;
		this.element = element;

		return this;
	}

	clearItem(){
		var item = document.getElementById(this.id);
		item.remove();
	}
}