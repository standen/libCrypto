"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.encode = exports.passwordSymbols = exports.intArrayToHexString = exports.hexStringToIntArray = void 0;
exports.checkSymbols = checkSymbols;
const vocab = {
    numbers: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    landEngSmall: [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
    ],
    landEngBig: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
    ],
    langRuSmall: [
        "а",
        "б",
        "в",
        "г",
        "д",
        "е",
        "ё",
        "ж",
        "з",
        "и",
        "й",
        "к",
        "л",
        "м",
        "н",
        "о",
        "п",
        "р",
        "с",
        "т",
        "у",
        "ф",
        "х",
        "ц",
        "ч",
        "ш",
        "щ",
        "ъ",
        "ы",
        "ь",
        "э",
        "ю",
        "я",
    ],
    langRuBig: [
        "А",
        "Б",
        "В",
        "Г",
        "Д",
        "Е",
        "Ё",
        "Ж",
        "З",
        "И",
        "Й",
        "К",
        "Л",
        "М",
        "Н",
        "О",
        "П",
        "Р",
        "С",
        "Т",
        "У",
        "Ф",
        "Х",
        "Ц",
        "Ч",
        "Ш",
        "Щ",
        "Ъ",
        "Ы",
        "Ь",
        "Э",
        "Ю",
        "Я",
    ],
    symbols: [
        "~",
        "`",
        "'",
        '"',
        "!",
        "@",
        "#",
        "№",
        "$",
        ";",
        ":",
        ",",
        "^",
        "%",
        "&",
        "?",
        "*",
        "(",
        ")",
        "-",
        "+",
        "=",
        "|",
        "\\",
        "<",
        ">",
        "[",
        "]",
        "{",
        "}",
        ".",
        "_",
        " ",
    ],
    sugar: [
        "À",
        "Á",
        "Â",
        "Ã",
        "Ä",
        "Å",
        "Æ",
        "Ç",
        "È",
        "É",
        "Ê",
        "Ë",
        "Ì",
        "Í",
        "Î",
        "Ï",
        "Ð",
        "Ñ",
        "Ò",
        "Ó",
        "Ô",
        "Õ",
        "Ö",
        "×",
        "Ø",
        "Ù",
        "Ú",
        "Û",
        "Ü",
        "Ý",
        "Þ",
        "ß",
        "à",
        "á",
        "â",
        "ã",
        "ä",
        "å",
        "æ",
        "ç",
        "è",
        "é",
        "ê",
        "ë",
        "ì",
        "í",
        "î",
        "ï",
        "ð",
        "ñ",
        "ò",
        "ó",
        "ô",
        "õ",
        "ö",
        "÷",
        "ø",
        "ù",
        "ú",
        "û",
        "ü",
        "ý",
        "þ",
        "ÿ",
        "Ā",
        "ā",
        "Ă",
        "ă",
        "Ą",
        "ą",
        "Ć",
        "ć",
        "Ĉ",
        "ĉ",
        "Ċ",
        "ċ",
        "Č",
        "č",
        "Ď",
        "ď",
        "Đ",
        "đ",
        "Ē",
        "ē",
        "Ĕ",
        "ĕ",
        "Ė",
        "ė",
        "Ę",
        "ę",
        "Ě",
        "ě",
        "Ĝ",
        "ĝ",
        "Ğ",
    ],
};
const encoding = Object.values(vocab).flat();
const hexToInt = (hex) => Number(`0x${hex}`);
const intToHex = (int) => `${Number(int).toString(16)}`.padStart(2, "0");
const splitHexString = (hexString) => {
    const result = [];
    for (let i = 0; i < hexString.length; i += 2) {
        result.push(hexString.slice(i, i + 2));
    }
    return result;
};
const hexStringToIntArray = (hexString) => splitHexString(hexString).map((item) => hexToInt(item));
exports.hexStringToIntArray = hexStringToIntArray;
const intArrayToHexString = (intArray) => {
    let result = "";
    for (let i = 0; i < intArray.length; i++) {
        result += intToHex(intArray[i]);
    }
    return result;
};
exports.intArrayToHexString = intArrayToHexString;
exports.passwordSymbols = [
    vocab.numbers,
    vocab.landEngSmall,
    vocab.landEngBig,
    vocab.symbols,
];
const encode = (indata) => Array.from(indata).map((item) => encoding.indexOf(item));
exports.encode = encode;
const decode = (indata) => indata.map((item) => encoding[item]).join("");
exports.decode = decode;
function checkSymbols(indata) {
    for (let item of Array.from(indata)) {
        if (encoding.indexOf(item) == -1)
            return false;
    }
    return true;
}
