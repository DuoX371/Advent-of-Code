const fs = require('fs');
const file = fs.readFileSync('./input.txt', 'utf8').split('\r\n')

/**@Part1 */
const ans = file.map(e => {
  const [win, list] = e.split(': ')[1].split(' | ').map(e => e.trim()).map(a => a.split(' ').filter(e => e).map(c=>c.trim()).map(Number))
  const wins = list.filter(e => win.includes(e))
  return wins.length === 0 ? 0 : 2 ** (wins.length - 1)
}).reduce((a, b) => a + b, 0)

console.log(ans)

/**@Part2 */
let cards = Array.from({length: file.length}, () => 0)
file.map((e,i) => {
  const [win, list] = e.split(': ')[1].split(' | ').map(e => e.trim()).map(a => a.split(' ').filter(e => e).map(c=>c.trim()).map(Number))
  const wins = list.filter(e => win.includes(e))
  cards[i]++
  wins.forEach((_, a) => cards[i+a+1] += cards[i])
})
const ans2 = cards.reduce((a, b) => a + b, 0)

console.log(ans2)