const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\r\n')
const data = input.map(x => {return [x.slice(0, x.length/2), x.slice(x.length/2)]})

const getCommonLetters = (array) =>{
  var commonLetters = array[0].split('');
  for (var i = 1; i < array.length; i++) {
    commonLetters = commonLetters.filter(function (letter) {
      return array[i].indexOf(letter) > -1;
    });
  }
  return commonLetters[0];
}
// Part 1
const ans = data.map(x => {
  const common = getCommonLetters(x);
  return /^[A-Z]*$/.test(common) ? common.charCodeAt(0) - 38 : common.charCodeAt(0) - 96;
}).reduce((a, b) => a + b);
console.log(ans)

// Part 2
var _ = require('lodash');
const newD = _.chunk(input, 3);

const ans2 = newD.map(e => {
  const common = getCommonLetters(e);
  return /^[A-Z]*$/.test(common) ? common.charCodeAt(0) - 38 : common.charCodeAt(0) - 96;
}).reduce((a, b) => a + b);
console.log(ans2)


