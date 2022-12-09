const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8').trimEnd().split('\r\n')

const head = [0, 0]
const tail = [0, 0]
const convered = new Set()
// Part 1
for(let i = 0; i < data.length; i++){
  const [dir, dist] = data[i].split(' ').map(x => {return /[0-9]/.test(x) ? parseInt(x) : x})
  // Move the head
  for(let i = 0; i < dist; i++){
    switch (dir) {
      case 'R': head[1]++; break;
      case 'L': head[1]--; break;
      case 'U': head[0]++; break;
      case 'D': head[0]--; break;
    }
    
    if(Math.abs(head[0] - tail[0]) >= 2 || Math.abs(head[1] - tail[1]) >= 2){
      // Add the tail but max 1
      tail[0] += Math.sign(head[0] - tail[0])
      tail[1] += Math.sign(head[1] - tail[1])
    }
    convered.add(tail.join(','))
  }
}
console.log(convered.size)


// Part 2
// This part can be used for first part 1 as well simply by changing the knots to 2
const knots = 10;
const body = Array(knots).fill().map(x => [0, 0])
const convered2 = new Set()
for(let i = 0; i < data.length; i++){
  const [dir, dist] = data[i].split(' ').map(x => {return /[0-9]/.test(x) ? parseInt(x) : x})
  // Move the head
  for(let i = 0; i < dist; i++){
    switch (dir) {
      case 'R': body[0][1]++; break;
      case 'L': body[0][1]--; break;
      case 'U': body[0][0]++; break;
      case 'D': body[0][0]--; break;
    }
    // start from 2nd knot and start moving all the knots
    for(let j = 1; j < knots; j++){
      const xM = body[j][0] - body[j-1][0]
      const yM = body[j][1] - body[j-1][1]
      // If the distance is more than 2 then move the knot
      if(Math.abs(xM) >= 2 || Math.abs(yM) >= 2){
        body[j][0] -= Math.sign(xM)
        body[j][1] -= Math.sign(yM)
      }
    }
    // Append the last data / tail into the set
    convered2.add(body[knots-1].join(','))
  }
}
console.log(convered2.size)