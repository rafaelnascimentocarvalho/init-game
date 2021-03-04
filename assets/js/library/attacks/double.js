export default function(direction, creature){

	let attacks = [(creature.axisY * creature.prop) + creature.axisX];

	if(direction == 'down'){
		attacks.push( ((creature.axisY + creature.height) * creature.prop) + creature.axisX );
	}

	if(direction == 'up'){
		attacks.push( ((creature.axisY - 1) * creature.prop) + creature.axisX );
	}

	if(direction == 'right'){
		attacks.push( ((creature.axisY * creature.prop) + creature.axisX) + 1 );
	}

	if(direction == 'left'){
		attacks.push( ((creature.axisY * creature.prop) + creature.axisX) - 1 );
	}

	// diagonal
	if(direction == 'up_right'){
		attacks.push( ((creature.axisY - 1) * creature.prop) + creature.axisX + 1 );
	}	

	if(direction == 'down_right'){
		attacks.push( (((creature.axisY + 1) * creature.prop) + creature.axisX + 1) );
	}	

	if(direction == 'left_up'){
		attacks.push( ((creature.axisY - 1) * creature.prop) + creature.axisX - 1 );
	}

	if(direction == 'left_down'){
		attacks.push( (((creature.axisY + 1) * creature.prop) + creature.axisX - 1) );
	}

	return attacks;
}