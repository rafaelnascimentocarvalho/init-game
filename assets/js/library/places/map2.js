import monster from "../monsters/autoloadmonsters.js";

let monsters = {
  handle1: monster('handle', 'handle1', 25, 25),
  handle2: monster('handle', 'handle2', 10, 25),
  handle3: monster('handle', 'handle3', 25, 10),
}

let blocks = {
  box1: {
    axisY: 2,
    axisX: 0,
    width: 4,
    height: 2,
    ClassName: '' 
  },
  box2: {
    axisY: 6,
    axisX: 8, 
    width: 2,
    height: 6,
    ClassName: '' 
  }
}

let doors = {
  door1: {
    axisY: 0,
    axisX: 8,
    width: 4,
    height: 1,
    map: 'map1',
    position: {
      axisY: 48,
      axisX: 10
    },
    ClassName: 'door'
  }
}

export default {
  name: 'map2',
  monsters: monsters,
  blocks: blocks,
  doors: doors
};