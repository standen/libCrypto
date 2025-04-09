"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passGer = passGer;
const encoding_1 = require("./encoding");
function passGer(len = 20, symbol = true) {
    let temp = [...Array(len).keys()], out = "", mode = symbol ? 4 : 3;
    shuffle(temp);
    temp.forEach((item) => {
        switch (item % mode) {
            case 0:
                out +=
                    encoding_1.passwordSymbols[0][randomInteger(0, encoding_1.passwordSymbols[0].length - 1)];
                break;
            case 1:
                out +=
                    encoding_1.passwordSymbols[1][randomInteger(0, encoding_1.passwordSymbols[1].length - 1)];
                break;
            case 2:
                out +=
                    encoding_1.passwordSymbols[2][randomInteger(0, encoding_1.passwordSymbols[2].length - 1)];
                break;
            case 3:
                out +=
                    encoding_1.passwordSymbols[3][randomInteger(0, encoding_1.passwordSymbols[3].length - 1)];
                break;
        }
    });
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
