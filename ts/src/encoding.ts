export const vocab: Record<string, string> = {
  numbers: "0123456789",
  landEngSmall: "abcdefghijklmnopqrstuvwxyz",
  landEngBig: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  langRuSmall: "абвгдеёжзийклмнопрстуфхцчшщъыьэюя",
  langRuBig: "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ",
  symbols: "~`'\"!@#№$;:,^%&?*()-+=|\\<>[]{}._ ",
  sugar:
    "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞ",
};

const encoding = Object.values(vocab).join("");

/**
 * 'ff' => 255
 */
const hexToInt = (hex: string): number => Number(`0x${hex}`);

/**
 * 255 => 'ff'
 */
const intToHex = (int: number): string =>
  `${Number(int).toString(16)}`.padStart(2, "0");

/**
 * Разбивает hex на массив по 8 бит:
 * 'ffdd' => ['ff', 'dd']
 */
const splitHexString = (hexString: string): string[] => {
  const result: string[] = [];
  for (let i = 0; i < hexString.length; i += 2) {
    result.push(hexString.slice(i, i + 2));
  }

  return result;
};

/**
 * Преобразует hex-строку в массив цифр:
 * 'ff' => [255]
 */
export const hexStringToIntArray = (hexString: string): number[] =>
  splitHexString(hexString).map((item) => hexToInt(item));

/**
 * Преобразует массив цифр в hex-строку:
 * [255] => 'ff'
 */
export const intArrayToHexString = (intArray: number[]): string => {
  let result: string = "";
  for (let i = 0; i < intArray.length; i++) {
    result += intToHex(intArray[i]);
  }
  return result;
};

/**
 * Преобразует строку из алфавита (8 бит) в массив цифр:
 * 'A' => [32]
 */
export const encode = (symbolString: string): number[] =>
  Array.from(symbolString).map((item) => encoding.indexOf(item));

/**
 * Преобразует массив цифр (8 бит) в строку из алфавита:
 * [32] => 'A'
 */
export const decode = (intArray: number[]): string =>
  intArray.map((item) => encoding[item]).join("");
