let monsters = {
  monster1: {
    id: 'monster1',
    axisY: 25,
    axisX: 25
  },
   monster2: {
    id: 'monster2',
    axisY: 10,
    axisX: 25
  },
   monster3: {
    id: 'monster3',
    axisY: 25,
    axisX: 10
  }
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
  monsters: monsters,
  blocks: blocks,
  doors: doors
};