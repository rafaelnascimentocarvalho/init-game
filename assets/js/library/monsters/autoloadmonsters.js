import handle from './handle.js';

const monsters = {
  handle: handle
}

export default function Monsters(monster, id, axisY, axisX){
    return monsters[monster](id, axisY, axisX);
}
