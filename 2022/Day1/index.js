const fs = require('fs');
const file = fs.readFileSync('./input.txt', 'utf8')
				.split('\r\n\r\n')
				.map(x => x.split('\r\n'))
				.map(x => x.map(Number))
				.map(x => {return x.reduce((a, b) => a + b)})
				.sort((a, b) => b - a);
// Part 1
const ans = file[0]
console.log(ans)


// Part 2
const top = 3;
const ans2 = file.slice(0, top).reduce((a, b) => a + b);

console.log(ans2)