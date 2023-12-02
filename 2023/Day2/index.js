const fs = require('fs');
const file = fs.readFileSync('./input.txt', 'utf8').split('\r\n')

/**@Part1 */
const config = {red: 12, green: 13, blue: 14}
const ans = file.map((e) => {
  const [game, allSets] = e.split(': ')
  const sets = allSets.split(';').map(gr => gr.split(', '))

  for(const set of sets){
    const setCount = {red: 0,green: 0,blue: 0}
    for(const card of set){
      const [count, color] = card.trim().split(' ')
      setCount[color] += parseInt(count)
    }
    if(setCount.red > config.red || setCount.green > config.green || setCount.blue > config.blue){
      return null
    }
  }
  return game.split(' ')[1]
}).filter(e=>e).map(e=>+e).reduce((a,b)=>a+b,0)

console.log(ans)



/**@Part2 */
const ans2 = file.map((e) => {
  const [game, allSets] = e.split(': ')
  const sets = allSets.split(';').map(gr => gr.split(', '))

  const setCount = {red: 0,green: 0,blue: 0}
  for(const set of sets){
    for(const card of set){
      const [count, color] = card.trim().split(' ')
      if(setCount[color] > parseInt(count)) continue;
      setCount[color] = parseInt(count)
    }
  }
  return Object.values(setCount).reduce((a,b)=>a*b,1)
}).reduce((a,b)=>a+b,0)

console.log(ans2)