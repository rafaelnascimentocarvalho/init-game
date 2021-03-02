import handle from "../monsters/handle.js";

let monsters = {
  handle1: handle('handle1', 25, 25)
}

let blocks = {
  box1: {
    axisY: 0,
    axisX: 0, 
    width: 6,
    height: 2,
    ClassName: '' 
  },
  box2: {
    axisY: 6,
    axisX: 8, 
    width: 2,
    height: 6,
    ClassName: '' 
  },
  box3: {
    axisY: 10,
    axisX: 30, 
    width: 5,
    height: 2,
    ClassName: '' 
  }
}

let doors = {
  door1: {
    axisY: 49,
    axisX: 10,
    width: 4,
    height: 1,
    map: 'map2',
    position: {      
      axisY: 1,
      axisX: 8
    },
    ClassName: 'door'
  }
}

export default {
  monsters: monsters,
  blocks: blocks,
  doors: doors
};