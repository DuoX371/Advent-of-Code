const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8').trimEnd().split('\r\n')

const cols = data.length
const rows = data[0].length
let grid = new Array(cols)

let openSet = []
let closedSet = []

let start, end, path = []

const heuristic = (a, b) => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}

class GridPoint {
  constructor(x, y) {
    this.x = x; //x location of the grid point
    this.y = y; //y location of the grid point
    this.f = 0; //total cost function
    this.g = 0; //cost function from start to the current grid point
    this.h = 0; //heuristic estimated cost function from current grid point to the goal
    this.neighbors = []; // neighbors of the current grid point
    this.parent = undefined; // immediate source of the current grid point

    this.updateNeighbors = (grid) => {
      let i = this.x;
      let j = this.y;
      if (i < cols - 1) {
        this.neighbors.push(grid[i + 1][j]);
      }
      if (i > 0) {
        this.neighbors.push(grid[i - 1][j]);
      }
      if (j < rows - 1) {
        this.neighbors.push(grid[i][j + 1]);
      }
      if (j > 0) {
        this.neighbors.push(grid[i][j - 1]);
      }
    };
  }
}

// initialize the grind
const init = () => {
  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows)
  }
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new GridPoint(i, j)
    }
  }
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].updateNeighbors(grid)
    }
  }

  start = grid[0][0]
  end = grid[cols - 1][rows - 1]
  openSet.push(start)
  // console.log(grid)
}

const search = () => {
  init()
  // implement A* algorithm to find the shortest path from A to Z
  while (openSet.length > 0){
    let lowestIndex = 0
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[lowestIndex].f) {
        lowestIndex = i
      }
    }
    console.log(openSet)
    break;
  }
  
  // while (openSet.length > 0) {
  //   let lowestIndex = 0
  //   for (let i = 0; i < openSet.length; i++) {
  //     if (openSet[i].f < openSet[lowestIndex].f) {
  //       lowestIndex = i
  //     }
  //   }
  //   let current = openSet[lowestIndex]
  //   console.log(current)
  //   if (current === end) {
  //     let temp = current
  //     path.push(temp)
  //     while (temp.parent) {
  //       path.push(temp.parent)
  //       temp = temp.parent
  //     }
  //     console.log('DONE!')
  //     break
  //   }
  //   openSet.splice(lowestIndex, 1)
  //   closedSet.push(current)
  //   let neighbors = current.neighbors
  //   for (let i = 0; i < neighbors.length; i++) {
  //     let neighbor = neighbors[i]
  //     if (!closedSet.includes(neighbor)) {
  //       let possibleG = current.g + 1
  //       if(!openSet.includes(neighbor)) {
  //         openSet.push(neighbor)
  //       } else if (possibleG >= neighbor.g) {
  //         continue
  //       }
  //       neighbor.parent = current
  //       neighbor.g = possibleG
  //       neighbor.h = heuristic(neighbor, end)
  //       neighbor.f = neighbor.g + neighbor.h
  //     }
  //   } 
  // }
}

const res = search()
// console.log(res)