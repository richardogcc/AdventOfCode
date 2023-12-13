const fs = require('fs');

const input = './input.txt';
const fileRead = (fileName) => (fs.readFileSync(fileName)).toString();
const kcal = (fileRead(input)).split('\n').map(str => parseInt(str));
const print = (txt) => console.log(txt);

const kcalPerElv = (arr) => {
    let acc = 0;
    let elvKcals = [];

    arr.forEach((n, it) => {
        if(isNaN(n)) {
            elvKcals.push(acc);
            acc = 0;
        }
        else acc += n;
        if(it === arr.length-1) elvKcals.push(acc);
    });

    return elvKcals;
};

const threeElvsWithMaxKcal = (arr) => {
    if(arr.length >= 3) return arr.sort((a, b) => a - b).slice(-3).reduce((acc, n) => acc + n);
};
const maxElvKcal = Math.max(...kcalPerElv(kcal));

// First solution
print(maxElvKcal);
// Second solution
print(threeElvsWithMaxKcal(kcalPerElv(kcal)))