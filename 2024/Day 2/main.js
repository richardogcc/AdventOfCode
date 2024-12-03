import { readFileSync } from 'fs';

const input = './debug.txt';
const fileRead = (fileName) => (readFileSync(fileName)).toString();
const read = (fileRead(input)).split('\r\n')
const print = (txt) => console.log(txt);

// Part 1
function isUpOrDown(arr) {
    if(arr.every((value, index) => index === 0 || value > arr[index - 1])) return true;
    arr.reverse()
    return arr.every((value, index) => index === 0 || value > arr[index - 1]);
}

const safety = (arr) => {
    for(let i = 0; i < arr.length; i++){
        const r = arr[i] < arr[i+1] ? arr[i+1] - arr[i] : arr[i] - arr[i+1];
        if(r < 1 || r > 3) return false;
    }

    return true;
}

const lvls = read.map(x => x.split(' ').map(Number))
const a1 = lvls.filter(x => isUpOrDown(x) && safety(x)).length
// Response 524
print(a1)

// Part 2

