const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\r\n').map(x => x.split(','));

// Part 1
let count = 0;
for(let i = 0; i < input.length; i++){
  const [[ffNum, fsNum], [sfNum, ssNum]] = input[i].map(x => x.split('-').map(Number));
  // Get fully contained numbers
  // ff = first pair first num, ss = second pair second num etc..
  // ff smaller than sf and fs bigger than ss / sf smaller than ff and ss bigger than fs 
  if(!((ffNum <= sfNum && fsNum >= ssNum) || (sfNum <= ffNum && ssNum >= fsNum))) continue;
  count++;
  
}
console.log(count)


// Part 2
let count2 = 0;
for(let i = 0; i < input.length; i++){
  const [[ffNum, fsNum], [sfNum, ssNum]] = input[i].map(x => x.split('-').map(Number));
  // Get overlaps
  if((fsNum >= sfNum && fsNum <= ssNum) || // ex. 24 <90> [89 91]
   (sfNum >= ffNum && sfNum <= fsNum) || // ex. [15 17] <16> 99
    (ffNum >= sfNum && ffNum <= ssNum) || // ex. <75> 80 [74 79]
     (ssNum >= ffNum && ssNum <= fsNum)){ //ex. [32 89] 14 <33>
    count2++;
  }
}
console.log(count2)