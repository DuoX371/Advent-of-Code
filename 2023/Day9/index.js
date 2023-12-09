const fs = require('fs');
const file = fs.readFileSync('./input.txt', 'utf8').split('\r\n')

/**@Part1 */
const ans = file.map((line) => {
  const val = line.split(' ').map(Number)
  return calculateNextValue(val)
}).reduce((acc, curr) => acc + curr, 0)

console.log(ans)

/**@Part2 */
const ans2 = file.map((line) => {
  const val = line.split(' ').map(Number).reverse()
  return calculateNextValue(val)
}).reduce((acc, curr) => acc + curr, 0)

console.log(ans2)


function calculateNextValue(array) {
  if(array.every(e => e === array[0])) return array[0]
  const differences = array.map((current, index) => current - array[index - 1]).filter(e => !isNaN(e))
  return array.at(-1) + calculateNextValue(differences)
}
