export default function(id, axisY, axisX){
	return {
		name: 'Handle',
		slug: 'handle',
		life: 1,
		width: 1,
		height: 1,
		skills: {
			attack: 40,
			defense: 38
		},
		habitat: 4,
		respaw: 1000,
		loot: {
			default: {
				gold: {
					min: 1,
					max: 16
				}
			},
			common: {
				health:{
					min: 1,
					max: 2
				}
			},
			rare: {},
			veryrare: {},
		},
		id: id,
		axisY: axisY,
		axisX: axisX
	};
}

