const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8').trimEnd()

// Part 1
for(let i = 0; i < data.length; i++) {
  if(/(.).*\1/.test(data.slice(i, i+4))) continue;
  console.log(`Position: ${i+4}`)
  break;
}

// Part 2
for(let i = 0; i < data.length; i++) {
  if(/(.).*\1/.test(data.slice(i, i+14))) continue;
  console.log(`Position: ${i+14}`)
  break;
}