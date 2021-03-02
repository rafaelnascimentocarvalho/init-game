import map1 from './map1.js';
import map2 from './map2.js';

const world = {
  map1: map1,
  map2: map2
}

export default function World(map){
    return world[map];
}
