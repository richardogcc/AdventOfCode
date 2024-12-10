import { readFileSync } from 'fs';

const input = './input.txt';
const fileRead = (fileName) => (readFileSync(fileName)).toString();
const read = (fileRead(input)).split('\r\n')
const print = (txt) => console.log(txt);

// Part 1
function isUpOrDown(arr) {
    let increment = 1;
    if(arr.every((value, index) => index === 0 || value > arr[index - increment])) {
        return true;
    }
    arr.reverse()
    return arr.every((value, index) => index === 0 || value > arr[index - increment]);
}

const safety = (arr) => {
    for(let i = 0; i < arr.length; i++){
        const r = arr[i] < arr[i+1] ? arr[i+1] - arr[i] : arr[i] - arr[i+1];
        if(r < 1 || r > 3) return false;
    }

    return true;
}


function isUpOrDownP2(arr, calledOnce = false) {
    // console.log('Called once ', calledOnce);
    // console.log('Array ', arr.join(' '));

    if (arr.length < 2) return true;

    let ascending = true;
    let descending = true;

    for (let i = 1; i < arr.length; i++) {
        const diff = Math.abs(arr[i] - arr[i - 1]);

        // console.log('Diff: ', diff)
        if (calledOnce && (diff < 1 || diff > 3)) {
            // console.log('Recursión')
            arr.splice(i, 1);
            return isUpOrDownP2(arr, true);
        }

        if (arr[i] < arr[i - 1]) ascending = false;
        if (arr[i] > arr[i - 1]) descending = false;

        if(ascending === descending) {
            if(!calledOnce){
                // console.log('Both wrong', arr[i], arr[i - 1], arr.splice(i, 1))
                return isUpOrDownP2(arr, true);
            }

            return false;
        }
    }

    return ascending !== descending;
}

function safetyP2(arr, calledOnce = false) {
    // console.log('Called once ', calledOnce);
    // console.log('Array ', arr.join(' '));

    for (let i = 0; i < arr.length; i++) {
        if (!arr[i + 1]) break;
        // console.log(`i: ${i} | Math.abs(${arr[i]} - ${arr[i + 1]}) = ${Math.abs(arr[i] - arr[i + 1])}`);
        const r = Math.abs(arr[i] - arr[i + 1]);
        // console.log('R ', r);

        if (r < 1 || r > 3) {
            if (!calledOnce) {
                arr.splice(i + 1, 1);
                return safetyP2(arr, true);
            }
            // return [arr, false, `i: ${i} | Math.abs(${arr[i]} - ${arr[i + 1]}) = ${r}`];
            return false;
        }
    }

    // console.log('Reached end');
    // return [arr, true];
    const aux = [arr, isUpOrDownP2(arr, calledOnce)];
    console.log(aux.join(', '));
    return aux[1];
}

// Response 524
const lvls = read.map(x => x.split(' ').map(Number))
const a1 = lvls.filter(x => isUpOrDown(x) && safety(x)).length
print('P1')
print(a1)

// Part 2
const a2 = lvls.filter(x => safetyP2(x)).length
print('P2')
print(a2)