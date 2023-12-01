const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8').trimEnd().split('\r\n')

const map = {}
let path = [];
let currentPath = map;
for(let i = 0; i < data.length; i++) {
  const cl = data[i]
  if(cl.startsWith('$ cd /')){
    path = []
  }else if (cl.startsWith('$ cd ..')) {
    path.pop()
    currentPath = map
    for(let a of path) currentPath = currentPath[a]
  }else if (cl.startsWith('$ cd')) {
    const dir = cl.split(' ')[2]
    path.push(dir)
    currentPath = currentPath[dir] = {}
  }else if(cl.startsWith('dir')){
    let pos = i
    do {
      pos++;
      if(data[pos] === undefined) break;
      const [size, file] = data[pos].split(' ')
      if(!/[0-9]/.test(size)) break;
      currentPath[file] = parseInt(size)
    } while (true);
  }else if (cl.startsWith('$ ls')){
    let pos = i;
    do {
      pos++;
      if(data[pos] === undefined) break;
      const [size, file] = data[pos].split(' ')
      if(!/[0-9]/.test(size)) break;
      currentPath[file] = parseInt(size)
    } while (true);
  }
}

// Part 1
let total = 0;
const recursive = (obj) => {
  let sum =  Object.values(obj).reduce((acc, val) => {
    if(typeof val === 'object') return acc + recursive(val)
    else return acc + val
  }, 0)
  if(sum <= 100000) {
    total += sum;
  }
  return sum;
}
const used = recursive(map) // store in var for part 2
console.log(total)

// Part 2
let requiredSpace = 30000000 - (70000000 - used);
let smallest = Infinity;
const recursive2 = (obj) => {
  let sum = Object.values(obj).reduce((acc, val) => {
    if(typeof val === 'object') return acc + recursive2(val)
    else return acc + val
  }, 0)
  if(sum >= requiredSpace) {
    smallest = Math.min(smallest, sum)
  }
  return sum;
}
recursive2(map)
console.log(smallest)