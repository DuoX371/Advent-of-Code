const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8').trimEnd().split('\r\n').map(e => {return {val: +e}})

const order = [...data]

for(const d of data){
    
}