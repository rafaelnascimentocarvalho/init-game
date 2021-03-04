import simple from './simple.js';
import double from './double.js';

const attacks = {
  simple: simple,
  double: double
}

export default function Attack(direction, type, creature){

    return attacks[type](direction, creature);
}
