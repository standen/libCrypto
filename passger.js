"use scrict";

// numbers, small, big, symbols
const { passwordSymbols }  = require('./encoding.js');

function passGer(len=20, symbol=true) {
    let temp = [...Array(len).keys()], out = '';

    shuffle(temp);

    if (symbol) {
        temp.forEach(item => {
            switch (item % 4) {
                case 0: out += passwordSymbols[0][randomInteger(0, passwordSymbols[0].length - 1)]; break;
                case 1: out += passwordSymbols[1][randomInteger(0, passwordSymbols[1].length - 1)]; break;
                case 2: out += passwordSymbols[2][randomInteger(0, passwordSymbols[2].length - 1)]; break;
                case 3: out += passwordSymbols[3][randomInteger(0, passwordSymbols[3].length - 1)]; break;
            }
        });
    } else {
        temp.forEach(item => {
            switch (item % 3) {
                case 0: out += passwordSymbols[0][randomInteger(0, passwordSymbols[0].length - 1)]; break;
                case 1: out += passwordSymbols[1][randomInteger(0, passwordSymbols[1].length - 1)]; break;
                case 2: out += passwordSymbols[2][randomInteger(0, passwordSymbols[2].length - 1)]; break;
            }
        });
    }

    return out;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

module.exports = { passGer };