import healthpotion from './healthpotion.js';
import manapotion from './manapotion.js';

const items = {
  healthpotion: healthpotion,
  manapotion: manapotion
}

export default function Items(item){
    return items[item];
}
