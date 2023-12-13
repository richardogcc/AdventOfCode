const fs = require('fs');

const input = './input.txt';
const fileRead = (fileName) => (fs.readFileSync(fileName)).toString();
const calibrationValues = (fileRead(input)).split('\r\n').filter(line => line);
const print = (txt) => console.log(txt);

const getInts = (ln) => {
    let ints = ln.split('');
    ints =  ints.map(i => parseInt(i)).filter(i => !isNaN(i));
    return ints;
}

const algorithm = (func, list) => list.map(x => func(x)).map(x => {
    if(x.length === 1) return parseInt(x.join('') + x.join(''));
    if(x.length === 2) return parseInt(x.join(''));
    if(x.length > 2) return parseInt(x[0].toString() + x[x.length - 1].toString());
});

// Part 1
print("Part 1");
print(algorithm(getInts, calibrationValues).reduce((a, b) => a + b, 0));

// ====================================================

const mapIntSpelled = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

const intsSpelled = calibrationValues.map(ln => {
    const range = [];
    
    for(let i = Math.min(...mapIntSpelled.map(x => x.length)); i <= Math.max(...mapIntSpelled.map(x => x.length)); i++) range.push(i);

    return ln.split('').map((x, idx) => {
        if(!isNaN(x)) return x.toString();
        return range.map(i => {
            if(mapIntSpelled.includes(ln.slice(idx, (i+idx)))) return mapIntSpelled.indexOf(ln.slice(idx, (i+idx))).toString();
        }).filter(x => !isNaN(x));
    }).filter(x => x).flat();
});

const algorithm2 = (list) => {
    return list.map(x => {
        if(x.length === 1) return parseInt(x.join('') + x.join(''));
        if(x.length === 2) return parseInt(x.join(''));
        if(x.length > 2) return parseInt(x[0].toString() + x[x.length - 1].toString());
    });
};

// Part 2
print("Part 2");
print(algorithm2(intsSpelled).reduce((a, b) => a + b, 0));