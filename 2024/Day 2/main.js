import { readFileSync } from 'fs';

const input = './debug.txt';
const fileRead = (fileName) => (readFileSync(fileName)).toString();
const read = (fileRead(input)).split('\r\n')
const print = (txt) => console.log(txt);

// Part 1
// function isUpOrDown(arr) {
//     let increment = 1;
//     if(arr.every((value, index) => index === 0 || value > arr[index - increment])) {
//         return true;
//     }
//     arr.reverse()
//     return arr.every((value, index) => index === 0 || value > arr[index - increment]);
// }

// const safety = (arr) => {
//     for(let i = 0; i < arr.length; i++){
//         const r = arr[i] < arr[i+1] ? arr[i+1] - arr[i] : arr[i] - arr[i+1];
//         if(r < 1 || r > 3) return false;
//     }

//     return true;
// }

function safety(arr, calledOnce = false) {
    console.log('Called once ', calledOnce);
    console.log('Array ', arr.join(' '));

    for(let i = 0; i < arr.length; i++){
        if(!arr[i+1]) break;
        console.log(`i: ${i} | Math.abs(${arr[i]} - ${arr[i+1]}) = ${Math.abs(arr[i] - arr[i+1])}`);
        // const r = Math.abs(arr[i] - arr[i+1]);
        const r = (arr[i] - arr[i+1]) < 0 ? (arr[i] - arr[i+1]) * -1 : arr[i] - arr[i+1];
        console.log('R ', r);

        if(r < 1 || r > 3 && calledOnce == false){
            arr.splice(i+1, 1);
            safety(arr, true);
        }
        if(r < 1 || r > 3) return [arr, false, `i: ${i} | Math.abs(${arr[i]} - ${arr[i+1]}) = ${r}`];
    }

    console.log('Reached end');
    return [arr, true];
}

const lvls = read.map(x => x.split(' ').map(Number))
// const a1 = lvls.filter(x => /*isUpOrDown(x) && */safety(x)).length
const a1 = lvls.map(x => /*isUpOrDown(x) && */safety(x))
// Response 524
print(a1)

// Part 2