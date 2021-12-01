const fs = require('fs');

const day1Input = './input.txt';
const fileRead = (fileName) => (fs.readFileSync(fileName)).toString();
const depths = (fileRead(day1Input)).split('\n').map(str => parseInt(str));

function countDepths(depth){
    if(!Array.isArray(depth)) return -1;
    let acc = 0;

    depth.forEach( (d, i) => {
        if(i != 0) {
            if(d > depth[i-1]) acc++;
        }
    });

    return acc;
}

function sumDepthsAndCount(depth){
    if(!Array.isArray(depth)) return -1;
    let sum = []; 

    depth.forEach( (d, i) => {
        if(i+1 > depth.length) return;
        if(i != 0) sum.push(depth[i-1] + d + depth[i+1]);
    });
    
    return countDepths(sum);
}

//First part answer
console.log(countDepths(depths));

//Second part answer
console.log(sumDepthsAndCount(depths));