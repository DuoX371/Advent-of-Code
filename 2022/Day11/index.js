const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8').trimEnd().split('\r\n\r\n')

const monkey = {}
for(let i = 0; i < data.length; i++){
  const [monkeyNo, start, op, test, ifTrue, ifFalse] = data[i].split('\r\n').map(x => x.trim()).map((x, i) => {return x = i === 2 ? x.split('= ')[1] : x.match(/\d+/g).map(Number)})
  monkey[monkeyNo] = {start, op, test: test[0], ifTrue: ifTrue[0], ifFalse: ifFalse[0], count: 0}
}

// Part 1
const p1 = (monkey) => {
  const rounds = 20
  for(let a = 0; a < rounds; a++){
    for(const i in monkey){
      const current = monkey[i]
      while(current.start.length > 0){
        current.count++;
        const toInspect = current.start.shift()
        const worryLevel = parseInt(eval(`(${current.op.replaceAll('old', toInspect)})/3`))
        const check = worryLevel % current.test === 0 ? current.ifTrue : current.ifFalse
        monkey[check].start.push(worryLevel)
      }
    }
  }
  const ans = Object.keys(monkey).map(x => monkey[x].count).sort((a, b) => b - a).slice(0, 2).reduce((a, b) => a * b, 1)
  console.log(ans)
}

const p2 = (monkey) => {
  const rounds = 10000
  const divVal = Object.keys(monkey).reduce((acc, m) => acc * monkey[m].test, 1); // get the highest test value to reduce precision loss
  for(let a = 0; a < rounds; a++){
    for(const i in monkey){
      const current = monkey[i]
      while(current.start.length > 0){
        const toInspect = current.start.shift()
        let worryLevel = parseInt(eval(`${current.op.replaceAll('old', toInspect)}`)) % divVal
        const check = worryLevel % current.test === 0 ? current.ifTrue : current.ifFalse
        monkey[check].start.push(worryLevel)
        current.count++;
      }
    }
  }

  const ans = Object.keys(monkey).map(x => monkey[x].count).sort((a, b) => b - a).slice(0, 2).reduce((a, b) => a * b, 1)
  console.log(ans)
}

const monkey2 = JSON.parse(JSON.stringify(monkey))
p1(monkey)
p2(monkey2)