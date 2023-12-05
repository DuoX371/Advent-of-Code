const fs = require('fs');
const { flatMap } = require('lodash');
const file = fs.readFileSync('./input.txt', 'utf8').split('\r\n\r\n')

const sss = file.shift()
const seeds = sss.split(': ')[1].split(' ').map(Number)

/**@Part1 */
const ans = seeds.map((s, si) => {
  let curr = s;
  file.map((e) => {
    let round = e.split('\r\n')
    round.shift()
    round = round.map(a => {
      const [start, source, range] = a.split(' ').map(Number)
      if(curr >= source && curr < source + range) {
        return start + (curr - source)
      }
      return undefined;
    }).filter(e => e !== undefined)
    curr = round.pop() ?? curr
  })
  return curr
}).sort((a, b) => a - b)[0]
console.log(ans)


/**@Part2 
 * 
 * This part was brute forced by incrementing the find which cast returns the lowest which in my case is input 6
 * Once the lowest pair was discovered, use that as the main input instead to find the lowest 
*/
let lowest;
const seeds2 = sss.split(': ')[1].split(/\s+/).map(Number).reduce((a, n, i, arr) => {
  if(i % 2 === 0) a.push([n, arr[i + 1]])
  return a;
}, [])

Promise.all(seeds2.map((e, ei) => {
  if(ei !== 6) return Promise.resolve(`Done ${ei}`)
  return new Promise((resolve, reject) => {

    const [start1, range] = e

    console.log(`Current: ${ei} ${e}`)
    // 1901414562 516150861
    // 2243422640 2008785
    let test = 2243422640;
    for (let i = test; i > start1; i--) {
      let curr = i;

      file.map((e) => {
        let round = e.split('\r\n');
        round.shift();
        round = round.map(a => {
          const [start, source, range] = a.split(' ').map(Number);
          if (curr >= source && curr < source + range) {
            return start + (curr - source);
          }
          return undefined;
        }).filter(e => e !== undefined);
        curr = round.pop() ?? curr;
      });

      if (lowest === undefined) {
        lowest = curr;
        console.log(`Current Lowest: ${lowest}, Start: ${i}`);
      }
      if (curr < lowest) {
        lowest = curr;
        console.log(`Current Lowest: ${lowest}, Start: ${i}`);
      }
    }

    resolve(`Done ${ei}`)
  })
})).then(finalResults => {
  console.log("Overall Lowest:", lowest);
})