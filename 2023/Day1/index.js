const fs = require('fs');
const file = fs.readFileSync('./input.txt', 'utf8').split('\r\n')

// /** @Part1 */
const ans = file.map(e => e.match(/\d/g))
                .map(e => e.length > 1 ? `${e[0]}${e.at(-1)}` : `${e[0]}${e[0]}`)
                .map(Number)
                .reduce((a, b) => a + b)

console.log(ans)


/** @Part2 */
const dict = {
  one: 'o1',
  two: 't2',
  three: 't3',
  four: 'f4',
  five: 'f5',
  six: 's6',
  seven: 's7',
  eight: 'e8',
  nine: 'n9'
}

const ans2 = file.map(str => {
                  Object.keys(dict).forEach(e => str = str.replaceAll(e, dict[e] + e))
                  return str
                })
                .map(e => e.match(/\d/g))
                .map(e => e.length > 1 ? e[0] + e[e.length - 1] : e[0] + e[0])
                .map(Number)
                .reduce((a, b) => a + b)
                
console.log(ans2)