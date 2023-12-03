const fs = require('fs');
const { flatMap } = require('lodash');
const file = fs.readFileSync('./input.txt', 'utf8').split('\r\n').map((e) => e.split(''));

const symbols = Array.from(new Set(flatMap(file).join('').match(/\D/g).filter(e => e !== '.')))

/**@Part1 */
const part = []
file.map((e, x) => {
  let curr = '';
  let index = [];
  for(let y = 0; y < e.length + 1; y++){
    if(!isNaN(e[y])) {
      index.push([x,y]);
      curr += e[y];
    }
    if(curr !== '' && !isNaN(e[y])) continue;

    // Convert indexes to a list of coordinates thaht needs to be searched
    index.forEach(e => {
      const cx = e[0];
      const cy = e[1];
      index.push([cx-1, cy], [cx+1, cy], [cx, cy-1], [cx, cy+1], [cx-1,cy-1], [cx+1,cy+1], [cx-1,cy+1], [cx+1,cy-1])
    })
    index = Array.from(new Set(index.map(e => e.join(',')))).map(e => e.split(',').map(e=>+e))
    for(let i = 0; i < index.length; i++){
      const cx = index[i][0];
      const cy = index[i][1];
      if(cx < 0 || cx >= file.length || cy < 0 || cy >= e.length) continue;
      if(symbols.includes(file[cx][cy])) {
        part.push(curr)
        break;
      }
    }
    curr = '';
    index = [];
  }
})
const ans = part.map(Number).reduce((a,b) => a+b, 0)
console.log(ans)


/**@Part2 */
let numbers = []
let symbolsL = []
file.map((e, x) => {
  let curr = '';
  for(let y = 0; y < e.length + 1; y++){
    if(!isNaN(e[y])) {
      curr += e[y];
    }
    if(curr !== '' && !isNaN(e[y])) continue;
    if(curr === '') continue;

    const coords = Array.from({length: curr.length}, (_, i) => [x, y - curr.length + i]).map(e => e.join(','))
    numbers.push({val: curr, coor: coords})
    curr = '';
  }

  for(let y = 0; y < e.length + 1; y++){
    const current = e[y]
    if(current === undefined) continue;
    if(symbols.includes(current)){
      symbolsL.push({val: current, searchRange: [[x-1, y], [x+1, y], [x, y-1], [x, y+1], [x-1,y-1], [x+1,y+1], [x-1,y+1], [x+1,y-1]].map(e => e.join(',')), nums: []})
    }
  }
})

let part2 = []
for(let i = 0; i < symbolsL.length; i++){
  const current = symbolsL[i]
  for(let j = 0; j < numbers.length; j++){
    const num = numbers[j]
    if(num.coor.some(e => current.searchRange.includes(e))) {
      current.nums.push(num.val)
    }
  }
  if(current.nums.length === 2) part2.push(current.nums.map(Number).reduce((a,b) => a*b, 1))
}

const ans2 = part2.reduce((a,b) => a+b, 0)
console.log(ans2)