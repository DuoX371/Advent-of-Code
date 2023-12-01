const fs = require('fs');
const [crates, moves] = fs.readFileSync('input.txt', 'utf8').split('\r\n\r\n').map(x => x.split('\r\n'));

/*
Data structure
crate = {
  1: [N, W, B]
  ...
}
*/

// Object mapping 
function buildCrate(crates) {
  let obj = {}
  for(let i = 0; i < crates.length; i++) {
    const row = crates[i].split('');
    let pos = 0;
    for(let j = 0; j < row.length; j++) {
      if(j % 4 === 2){
        const el = row[j-1].trim();
        pos++;
        if(!el) continue;
        obj[pos] = obj[pos] || [];
        obj[pos].unshift(el);
      }
    }
    if(i === crates.length - 2) break;
  }
  // lol fucking reference
  return [obj, JSON.parse(JSON.stringify(obj))];
}

const [crate, crate2] = buildCrate(crates);
// console.log(crate, crate2);

// Part 1
for(let i = 0; i < moves.length; i++){
  const [count, from, to] = moves[i].split(' ').map(Number).filter(Boolean);
  // A loop for the count
  for(let j = 0; j < count; j++){
    // Pop the last element from the from array and push it to the to array
    crate[to].push(crate[from].pop());
  }
}
const result = Object.values(crate).map(x => {return x.pop();}).join('')
console.log(result)

// Part 2
for(let i = 0; i < moves.length; i++){
  const [count, from, to] = moves[i].split(' ').map(Number).filter(Boolean);
  crate2[to].push(...crate2[from].splice(crate2[from].length-count, crate2[from].length));
}

const result2 = Object.values(crate2).map(x => {return x.pop();}).join('')
console.log(result2)