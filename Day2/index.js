const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8').split('\n').map(e => e.trim().split(' '))
//  A Rock
//  B Paper
//  C Scissors

// X Rock
// Y Paper
// Z Scissors

// 0 Lose
// 3 Tie
// 6 Win
const rules = {
  'A': {'X': 3, 'Y': 6, 'Z': 0},
  'B': {'X': 0, 'Y': 3, 'Z': 6},
  'C': {'X': 6, 'Y': 0, 'Z': 3},
}
const bonus = {
  'X': 1,
  'Y': 2,
  'Z': 3,
}
// Part 1
const score = data.map(e => {
  let elf = e[0];
  let human = e[1];
  return rules[elf][human] + bonus[human]
}).reduce((a, b) => a + b)
console.log(score)


// Part 2
// X needs to lose
// Y needs to tie
// Z needs to win
const rules2 = {
  'X': 0,
  'Y': 3,
  'Z': 6,
}
const bonus2 = {
  'A': {'X': 3, 'Y': 1, 'Z': 2}, // X = Scissors, Y = Rock, Z = Paper
  'B': {'X': 1, 'Y': 2, 'Z': 3}, // X = Rock, Y = Paper, Z = Scissors
  'C': {'X': 2, 'Y': 3, 'Z': 1}, // X = Paper, Y = Scissors, Z = Rock
}
const score2 = data.map(e => {
  let elf = e[0];
  let human = e[1];
  return rules2[human] + bonus2[elf][human]
}).reduce((a, b) => a + b)

console.log(score2)
