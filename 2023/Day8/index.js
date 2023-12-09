const fs = require('fs');
const file = fs.readFileSync('./input.txt', 'utf8').split('\r\n').filter(e=>e);

const step = file.shift()
/**@Part1 */

const directions = file.reduce((acc, e)=>{
  const [key, value] = e.split(' = ')
  const val = value.match(/\((.*?)\)/)[1]
  acc[key] = val.split(', ')
  return acc
}, {})


const currentStep = ['AAA'];
while(true){
  const current = currentStep[currentStep.length-1]
  if(current === 'ZZZ') break;
  const next = directions[current][step[(currentStep.length - 1) % step.length] === 'L' ? 0 : 1]
  currentStep.push(next)
}
const ans = currentStep.length - 1
console.log(ans)


/**@Part2 */
console.log(step)

const directions2 = file.reduce((acc, e)=>{
  const [key, value] = e.split(' = ')
  const val = value.match(/\((.*?)\)/)[1]
  acc[key] = val.split(', ')
  return acc
}, {})

let steps = 0;
let currentStep2 = Object.keys(directions2).filter(e => e.endsWith('A'))

while(true){
  if(currentStep2.every(e => e.endsWith('Z'))) break;
  const nextStep = step[steps % step.length] === 'L' ? 0 : 1
  currentStep2 = currentStep2.map(e => directions2[e][nextStep])
  steps++;
}
console.log(steps)

// first input takes 17141 steps
// second input takes 16579 steps
// third input takes 18827 steps
// fourth input takes 12083 steps
// fifth input takes 13207 steps
// sixth input takes 22199 steps


const numEachSteps = [17141, 16579, 18827, 12083, 13207, 22199];

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function lcm(a, b){
  return a * b / gcd(a, b)
}

const resultLCM = numEachSteps.reduce((accumulator, currentValue) => lcm(accumulator, currentValue));

console.log(resultLCM)