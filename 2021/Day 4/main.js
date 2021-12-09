const fs = require('fs');
const assert = require('assert');
const print = (text) => console.log(text);

const input = './input.txt';
const testInput = './test.txt';
const fileRead = (fileName) => (fs.readFileSync(fileName)).toString();
const inputLn = (fileRead(input)).split('\n').filter(ln => ln != '');
const testLn = (fileRead(testInput)).split('\n').filter(ln => ln != '');
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

    for (let t = 0; t < boards.length; t++) {
        for (let r = 0; r < boards[t].length; r++) {
            for (let c = 0; c < boards[t][r].length; c++) {
                if (boards[t][r][c] === winnerNr) {
                    boards[t][r][c] = 'x';

                    const ly = y(boards, t, r, c);
                    const lx = x(boards, t, r, c);

                    if (lx || ly) {
                        let sum = boards[t].flat().filter(x => x != 'x').length === 0 ? NaN : sumValidFields(boards[t]);
                        // print(`lx: ${lx} | ly: ${ly} | n: ${winnerNr} | table: ${t} | sum: ${winnerNr} + ${sum} = ${winnerNr*sum}`);
                        if (!lastWinner) return winnerNr * sum;
                        if(lastWinner) lastWinnerNumber = winnerNr * sum;
                    }
                }
            }
        }
    }

    if(lastWinnerNumber) return lastWinnerNumber;
};

function testPart(debug = true, input = testLn, secondPart=true) {
    let winnerNr = input.shift().split(',').map(n => parseInt(n));
    let tables = boards(input);
    let counter = 0;

    for (let w = 0; w < winnerNr.length; w++) {
        let nr = match(winnerNr[w], tables, secondPart);
        if (nr && !secondPart) {
            if (debug) print(tables);
            if (debug) print(`Last bingo number: ${winnerNr[w]}`);
            if (debug) print(`Result: ${nr}`);
            return nr;
        }
        if(nr && secondPart) counter++;
        if(counter == tables.length) {
            if (debug) print(tables);
            if (debug) print(`Last bingo number: ${winnerNr[w]}`);
            if (debug) print(`Result: ${nr}`);
            return nr;
        }
    }

    return false;
}

function realPart(debug = false, input, secondPart=true) {
    let tables = boards(input);
    let counter = 0;
    let index = 0; // @nochecking
    let items = []; // @nochecking

    // for (let w = 0; w < winnerNr.length; w++) {
    //     index++;
    //     let nr = match(winnerNr[w], tables, secondPart);
    //     print(`Winner nr: ${nr} | Counter: ${counter} | Table length: ${tables.length} | Bingo table length: ${winnerNr.length}`); // @nochecking
    //     if (nr && !secondPart) {
    //         if (debug) print(tables);
    //         if (debug) print(`Last bingo number: ${winnerNr[w]}`);
    //         if (debug) print(`Result: ${nr}`);
    //         return nr;
    //     }
    //     if(nr && secondPart) counter++;
    //     if(counter == tables.length) {
    //         if (debug) print(tables);
    //         if (debug) print(`Last bingo number: ${winnerNr[w]}`);
    //         if (debug) print(`Result: ${nr}`);
    //         return nr;
    //     }
    // }

    do {
        index++;
        let nr = match(winnerNr[index], tables, secondPart);
        if(nr) items.push(nr);
        if(nr) print(`Winner nr: ${nr} | Counter: ${counter} | Table length: ${tables.length} | Bingo table length: ${winnerNr.length} | Index counter ${index}`); // @nochecking
        if (nr && !secondPart) {
            if (debug) print(tables);
            if (debug) print(`Last bingo number: ${winnerNr[index]}`);
            if (debug) print(`Result: ${nr}`);
            return nr;
        }
        if(nr && secondPart) counter++;
        if(counter == tables.length) {
            if (debug) print(tables);
            if (debug) print(`Last bingo number: ${winnerNr[index]}`);
            if (debug) print(`Result: ${nr}`);
            return nr;
        }
    } while (index <= tables.length);

    print(`index count: ${index}`); // @nochecking
    print(items.pop());

    return false;
}

//Solo descomentar una de las líneas o afectará al resultado de las demás
// testPart(true, testLn, false); // 4512: first part
// testPart(true, testLn); // 1924: second part

// realPart(true, inputLn, false); //74320
// realPart(true, inputLn); //74320
