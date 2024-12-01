import { readFileSync } from 'fs';

const input = './input.txt';
const fileRead = (fileName) => (readFileSync(fileName)).toString();
const ids = (fileRead(input)).split('\n').map(x => x.split('   ')).flat().filter(x => x).map(x => Number(x))
const print = (txt) => console.log(txt);

// Part 1
const g1 = ids.filter((x, i) => i % 2 == 0).sort();
const g2 = ids.filter((x, i) => i % 2 != 0).sort();

let diff = []
for(let i = 0; i < g1.length; i++) g1[i] >= g2[i] ? diff.push(g1[i] - g2[i]) : diff.push(g2[i] - g1[i]);

print(`Part 1: ${diff.reduce((a, b) => a + b, 0)}`);

// Part 2
let occurrences = [];
for(let i = 0; i < g1.length; i++) occurrences.push(g1[i] * g2.filter(x => x === g1[i]).length);

print(`Part 2: ${occurrences.reduce((a, b) => a + b, 0)}`);