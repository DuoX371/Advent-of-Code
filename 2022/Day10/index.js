const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8').trimEnd().split('\r\n')
const _ = require('lodash');
// Part 1
let x = 1
let cycle = 1;
let sum = 0;
for(let i = 0; i < data.length; i++) {
  let perCycle = data[i].startsWith('noop') ? 1 : 2;
  do {
    const xVal = parseInt(data[i].split(' ')[1]);
    if(!isNaN(xVal) && perCycle === 1) x += xVal;
    cycle++
    if(cycle % 40 === 20 && cycle < 240){
      sum += x * cycle;
    }
  } while (--perCycle);
}
console.log(sum)

// Part 2
let x2 = 1
let crtPos = 0; // everyime draw till 40 reset to 0
const array = []
for(let i = 0; i < data.length; i++){
  const key = data[i].split(' ')[0];
  switch (key) {
    case 'noop':
      runCycle();
      break;
    case 'addx':
      runCycle();
      runCycle();
      x2 += parseInt(data[i].split(' ')[1]);
      break;
  }
}
function runCycle(){
  array.push(crtPos >= x2 - 1 && crtPos <= x2 + 1 ? '#' : '.')
  crtPos++;
  if(crtPos === 40) crtPos = 0;
}
const ans = _.chunk(array, 40).map(x => x.join('')).join('\n')
console.log(ans)