const fs = require('fs');
const assert = require('assert');
const print = (text) => console.log(text);

const input = './input.txt';
const fileRead = (fileName) => (fs.readFileSync(fileName)).toString();
const inputLn = (fileRead(input)).split('\n').filter(ln => ln != '');
const expect = (result, expected) => assert(result, expected);

const winnerNr = inputLn.shift().split(',').map(n => parseInt(n));

const boards = (rawData) => {
    let board = [];

    let indexBoard = 0;
    rawData.forEach((ln, i) => {
        if (board.length < (rawData.length / 5)) board.push(new Array());
        board[indexBoard].push(ln.split(' ').map(n => n.trim()).filter(n => n != '').map(n => parseInt(n)));
        if (i > 0 && (i + 1) % 5 == 0) indexBoard++;
    });

    return board;
};

function match(winnerNr, boards, lastWinner = false) {
    const x = (boards, t, r, c) => boards[t][r].filter(pattern => pattern == 'x').length === 5 ? true : false;
    const y = (boards, t, r, c) => boards[t].map(n => n[c]).filter(pattern => pattern == 'x').length === 5 ? true : false;
    const sumValidFields = (table) => table.flat().filter(chr => chr != 'x').reduce((pn, n) => pn + n);
    let lastWinnerNumber = NaN;
    let winnerBoardsAlready = [];
    let analisis = 1;

    for(let w = 0; w < winnerNr.length; w++){
        for (let t = 0; t < boards.length; t++) {
            for (let r = 0; r < boards[t].length; r++) {
                for (let c = 0; c < boards[t][r].length; c++) {
                    if (boards[t][r][c] === winnerNr[w]) {
                        boards[t][r][c] = 'x';
    
                        if(lastWinner && winnerBoardsAlready.includes(t)) continue;
                        analisis++;
    
                        let ly = y(boards, t, r, c);
                        let lx = x(boards, t, r, c);
    
    
                        if (lx || ly) {
                            let sum = boards[t].flat().filter(x => x != 'x').length === 0 ? NaN : sumValidFields(boards[t]);
                            // print(`lx: ${lx} | ly: ${ly} | n: ${winnerNr} | table: ${t} | sum: ${winnerNr} + ${sum} = ${winnerNr*sum}`);
                            if (!lastWinner) return winnerNr[w] * sum;
                            if(lastWinner) {
                                winnerBoardsAlready.push(t);
                                lastWinnerNumber = winnerNr[w] * sum;
                            }
                        }
                    }
                }
            }
        }
    }

    // print(`Analisis de iteraciones: ${analisis}`);
    if(lastWinnerNumber) return lastWinnerNumber;
};

function realPart(debug = false, input, secondPart=true) {
    let tables = boards(input);

    let nr = match(winnerNr, tables, secondPart);
    if(debug) print(tables);
    if(nr) return nr;

    return false;
}

//Solo descomentar una de las líneas o afectará al resultado de las demás
const p1 = realPart(false, inputLn, false); //74320
const p2 = realPart(false, inputLn); //17884

print(`Primera parte: ${p1}`);
print(`Segunda parte: ${p2}`);
