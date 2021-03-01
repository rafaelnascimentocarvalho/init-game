let prop = 50;

export default class Objects{

	create(params){

		let axisY = params.axisY;
		let axisX = params.axisX;
		let width = params.width;
		let height = params.height;
		let ClassName = params.ClassName;

		let element = document.createElement("div");

		element.style.width  = (width * prop) + "px";
		element.style.height = (height * prop) + "px";
		element.style.top    = prop * axisY + "px";
		element.style.left   = prop * axisX + "px";
		element.className = 'object';

		if(ClassName){
			element.classList.add(ClassName);
		}

		this.axisX = axisX;
		this.axisY = axisY;
		this.width   = width;
		this.height  = height;
		this.element = element;
		this.type    = 'object';
		this.element = element;

		return this;
	}

	getCollision(direct){

		let collapse = [];

		if(direct == 'down'){

			var top = (this.axisY * prop) + this.axisX;
			for (var i = 0; i < this.width; i++) {
				collapse.push( top + i );
			}	
			// console.log(collapse);	
		}

		if(direct == 'up'){

			var top = (((this.axisY + this.height)-1) * prop) + this.axisX;
			for (var i = 0; i < this.width; i++) {
				collapse.push( top + i );
			}
			// console.log(collapse);
		}

		if(direct == 'right'){

			for (var i = 0; i < this.height; i++) {
				collapse.push( (this.axisY + i) * prop + this.axisX);
			}
			// console.log(collapse);	
		}

		if(direct == 'left'){

			for (var i = 0; i < this.height; i++) {

				let right = ((this.axisY+i) * prop) + ((this.axisX+this.width)-1);

				collapse.push( right );
			}
			// console.log(collapse);	
		}

		return collapse;
	}
}