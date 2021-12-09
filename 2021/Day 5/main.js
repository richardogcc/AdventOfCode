const fs = require('fs');
const assert = require('assert');
//console.log function
const print = (text) => console.log(text); 
//Inputs
const input = './input.txt';
const testInput = './test.txt';
//Read function
const fileRead = (fileName) => (fs.readFileSync(fileName)).toString();
//Readed lines as array
const inputLn = (fileRead(input)).split('\r\n').filter(ln => ln != '');
const testLn = (fileRead(testInput)).split('\r\n').filter(ln => ln != '');
//Assert function
const expect = (result, expected) => assert(result, expected);
const getMax = (input) => input.map(n => n.replaceAll(' -> ', ',')).join(',').split(',').map(n => Number(n)).sort().reverse()[0];

function generateMap(input, char='.'){
    let max = getMax(input)+1;
    return [...Array(max)].map(x => Array(max).fill(char));
}

// possible @nochecking
const getValuePos = (x, y, map) => map[x][y];
const getLengthMap = (map_) => `${map_.length}, ${map_[0].length}`; 

function setValuePos(x, y, map_){
    if(!isNaN(map_[y][x])) map_[y][x]++;
    if(map_[y][x] == '.') map_[y][x] = 1;
}

function transfomInputToValidData(input){
    return input.map(n => {
        const splitted = n.split(' -> ');
        return {
            x1: Number(splitted[0].split(',')[0]),
            y1: Number(splitted[0].split(',')[1]),
            x2: Number(splitted[1].split(',')[0]),
            y2: Number(splitted[1].split(',')[1])
        }
    });
}

function filterPoints(coords, map){
    let aux = [];
    coords.forEach(coord => {
        if(coord.x1 === coord.x2 || coord.y1 === coord.y2) {
            // print(coord);
            setValuePos(coord.x1, coord.y1, map);
        }
    });
}

function drawMap(map){
    return map.map(ln => ln.join(''));
}

let map_ = generateMap(testLn);
let coords = transfomInputToValidData(testLn);

// print(coords);
// setValuePos(0, 9, map_);
print(filterPoints(coords, map_));
print(drawMap(map_));
// print(getValuePos(9, 9, map_));
// print(flatMap(map_));