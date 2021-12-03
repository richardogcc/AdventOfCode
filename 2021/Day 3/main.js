const fs = require('fs');

const input = './input.txt';
const fileRead = (fileName) => (fs.readFileSync(fileName)).toString();
const inputLn = (fileRead(input)).split('\n').filter(bit => bit != '');
// const test = ['00100', '11110', '10110', '10111', '10101', '01111', '00111', '11100', '10000', '11001', '00010', '01010'];

function answer(arr){
    let gamma = epsilon = '';
    
    //Count zeros and ones from the specified array for specified position
    const countZeroOne = (arr, outerIndex) => {
        let zeros = ones = 0;
        for (let innerIndex = 0; innerIndex < arr.length; innerIndex++) arr[innerIndex][outerIndex] == '1' ? ones++ : zeros++
        return [zeros, ones];
    };

    //Calculate Gamma and Epsilon
    for (let i = 0; i < arr[0].length; i++) {
        const [zeros, ones] = countZeroOne(arr, i);
        
        if (ones > zeros || ones == zeros) {
            gamma += '1';
            epsilon += '0';
        } else {
            gamma += '0';
            epsilon += '1';
        }
    }

    //true: oxygen | false: co2
    //Calculate Oxygen or CO2
    const operate = (bool, array) => {
        let aux = array;
        for (let i = 0; i < aux[0].length; i++) {
            if(aux.length == 1) break;
            const [zeros, ones] = countZeroOne(aux, i);
            
            if (ones > zeros || ones == zeros) {
                aux = aux.filter(bitsNode => bool ? bitsNode[i] == '1' : bitsNode[i] == '0');
            } else {
                aux = aux.filter(bitsNode => bool ? bitsNode[i] == '0' : bitsNode[i] == '1');
            }
        }   
        return aux.join('');
    };  

    //Return results calculated
    return {
        power: parseInt(gamma, 2) * parseInt(epsilon, 2),
        life: parseInt(operate(true, arr), 2) * parseInt(operate(false, arr), 2)
    }
}

// Answer first part: 3923414 and second part: 5852595
console.log(`Power consumption: ${(answer(inputLn)).power}\nLife support: ${(answer(inputLn)).life}`);