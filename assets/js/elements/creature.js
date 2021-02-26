let walking  = true;

export default class Creature{

	constructor(prop) {
		this.prop = 50;
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

			this.element.style.top  = this.prop * this.axisY + "px";
			this.element.style.left = this.prop * this.axisX + "px";

			walking = false;

			setTimeout(function(){
				walking = true;
			}, 800);
		}
	}

	validNextPosition(direct){

		if(direct == 'down'){
			// console.log(((this.axisY + this.height) * this.prop) + this.axisX);
			return ((this.axisY + this.height) * this.prop) + this.axisX;
		}

		if(direct == 'up'){
			// console.log(((this.axisY - 1) * this.prop) + this.axisX);
			return ((this.axisY - 1) * this.prop) + this.axisX;
		}

		if(direct == 'right'){
			// console.log(((this.axisY * this.prop) + this.axisX) + 1);
			return ((this.axisY * this.prop) + this.axisX) + 1;
		}

		if(direct == 'left'){
			// console.log(((this.axisY * this.prop) + this.axisX) - 1);
			return ((this.axisY * this.prop) + this.axisX) - 1;
		}

		// diagonal
		if(direct == 'up_right'){
			// console.log(((this.axisY - 1) * this.prop) + this.axisX + 1);
			return ((this.axisY - 1) * this.prop) + this.axisX + 1;
		}	

		if(direct == 'down_right'){
			// console.log(((this.axisY + 1) * this.prop) + this.axisX + 1);
			return (((this.axisY + 1) * this.prop) + this.axisX + 1);
		}	

		if(direct == 'left_up'){
			// console.log(((this.axisY - 1) * this.prop) + this.axisX - 1);
			return ((this.axisY - 1) * this.prop) + this.axisX - 1;
		}

		if(direct == 'left_down'){
			// console.log(((this.axisY + 1) * this.prop) + this.axisX - 1);
			return (((this.axisY + 1) * this.prop) + this.axisX - 1);
		}

		return false;
	}

	checkPress(direct, keyState){

		if(direct == 'up' && keyState["87"] && keyState["65"] == false && keyState["68"] == false && keyState["83"] == false){
			return true;
		}

		if(direct == 'down' && keyState["83"] && keyState["65"] == false && keyState["68"] == false && keyState["87"] == false){
			return true;
		}

		if(direct == 'left' && keyState["65"] && keyState["83"] == false && keyState["87"] == false && keyState["68"] == false){
			return true;
		}

		if(direct == 'right' && keyState["68"] && keyState["83"] == false && keyState["87"] == false && keyState["65"] == false){
			return true;
		}

		//  diagonal
		if(direct == 'up_right' && keyState["87"] && keyState["68"] && keyState["83"] == false && keyState["65"] == false){
			return true;
		}

		if(direct == 'down_right' && keyState["83"] && keyState["68"] && keyState["65"] == false && keyState["87"] == false){
			return true;
		}

		if(direct == 'left_up' && keyState["65"] && keyState["87"] && keyState["68"] == false && keyState["83"] == false){
			return true;
		}

		if(direct == 'left_down' && keyState["65"] && keyState["83"] && keyState["87"] == false && keyState["68"] == false){
			return true;
		}

		return false;
	}
}