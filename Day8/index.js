const fs = require('fs');
const { concat } = require('lodash');
const data = fs.readFileSync('input.txt', 'utf8').trimEnd().split('\r\n').map(x => x.split(''))

// Part 1
let count = 0;
for(let i = 0; i < data.length; i++){
  for(let j = 0; j < data[i].length; j++){
    let visible = {left: true, right: true, top: true, bottom: true}
    // check if the left tree is blocking the current
    for (let k=0; k < j; k++) {
      if(data[i][j] <= data[i][k]) visible.left = false;
    }
    // check if the right tree is blocking the current
    for (let k=j+1; k < data[i].length; k++) {
      if(data[i][j] <= data[i][k]) visible.right = false;
    }
    // check if the top tree is blocking the current
    for (let k=0; k < i; k++) {
      if(data[i][j] <= data[k][j]) visible.top = false;
    }
    // check if the bottom tree is blocking the current
    for (let k=i+1; k < data.length; k++) {
      if(data[i][j] <= data[k][j]) visible.bottom = false;
    }
    if(!(visible.left || visible.right || visible.top || visible.bottom)) continue; // if there is atleast 1 true, then it is visible
    count++;
  }
}
console.log(count)

// Part 2
let highest = 0
for(let i = 0; i < data.length; i++){
  for(let j = 0; j < data[i].length; j++){
    const visibleCount = {left: 0, right: 0, top: 0, bottom: 0}
    // Bruh i should have wrote my part 1 properly lol
    // Left
    for(let k = j - 1; k >= 0; k--){
      visibleCount.left++;
      if(data[i][j] <= data[i][k]) break;
    }
    // Right
    for(let k = j + 1; k < data[i].length; k++){ 
      visibleCount.right++;
      if(data[i][j] <= data[i][k]) break;
    }
    // Top
    for(let k = i - 1; k >= 0; k--){
      visibleCount.top++;
      if(data[i][j] <= data[k][j]) break;
    }
    // Bottom
    for(let k = i + 1; k < data.length; k++){
      visibleCount.bottom++;
      if(data[i][j] <= data[k][j]) break;
    }
    const sum = Object.values(visibleCount).reduce((a,b) => a * b, 1);
    highest = Math.max(highest, sum);
  }
}
console.log(highest)