const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8').trimEnd().split('\r\n\r\n')

// Recursive comparison
const compare = (val1, val2) => {
  if(typeof val1 === 'number' && typeof val2 === 'number'){
    if(val1 < val2) return true // right order
    else if(val1 > val2) return false
    else return null //if both numbers are the same continue next
  } else if(Array.isArray(val1) && Array.isArray(val2)) {
    const length = val1.length < val2.length ? val1.length : val2.length
    for(let i = 0; i < length; i++) {
      const result = compare(val1[i], val2[i])
      if(result !== null) return result;
    }
    if(val1.length < val2.length) return true
    else if(val1.length > val2.length) return false
    else return null
  } else return compare(typeof val1 === 'number' ? [val1] : val1, typeof val2 === 'number' ? [val2] : val2)
  
}

// Part 1
let count = 0;
for(let i = 0; i < data.length; i++) {
    const [val1, val2] = data[i].split('\r\n').map(e => JSON.parse(e))
    const res = compare(val1, val2)
    if(res) count += i + 1
}
console.log(count)

// Part 2 lol idk
const dividers = [[[2]], [[6]]]
for(let i = 0; i < data.length; i++){
  const [val1, val2] = data[i].split('\r\n').map(e => JSON.parse(e))
  console.log(val1, val2)
}