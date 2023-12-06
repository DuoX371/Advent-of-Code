const fs = require('fs');
const file = fs.readFileSync('./input.txt', 'utf8').split('\r\n')

/**@Part1 */
const ev = file.map(e => e.match(/\d+/g))
const ans = ev.pop().map((e, i) => {return { time: parseInt(ev[0][i]), distance: parseInt(e), count: 0}}).map(e => {
  e.time * e.distance
  for(let i = 1; i <= e.time; i++){
    const distance = (e.time - i) * i
    if(distance > e.distance) e.count++
  }
  return e
}).map(e=>e.count).reduce((s,v)=> s*v,1)

console.log(ans)

/**@Part2 */

const [tiem, dist] = file.map(e => e.match(/\d+/g)).map(e => e.join('')).map(e=>+e)

let count = 0
for(let i = 1; i <= tiem; i++){
  const distance = (tiem - i) * i
  if(distance > dist) {
    count++
  }
}

console.log(count)