const ALPHABET_EN = "abcdefghijklmnopqrstuvwxyz";
const ALPHABET_RU = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";

type T_ALPABET = Readonly<{
  digits: string;
  enSmall: string;
  enBig: string;
  ruSmall: string;
  ruBig: string;
  specChars: string;
  sugarChars: string;
}>;

const ALPHABET: T_ALPABET = {
  digits: "0123456789",
  enSmall: ALPHABET_EN,
  enBig: ALPHABET_EN.toUpperCase(),
  ruSmall: ALPHABET_RU,
  ruBig: ALPHABET_RU.toUpperCase(),
  specChars: "~`'\"!@#№$;:,^%&?*()-+=|\\<>[]{}._ ",
  sugarChars:
    "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞ",
};

type T_MAPPED_ALPHABET = Partial<{
  BYTES_TO_HEX: Map<number, string>;
  HEX_TO_BYTES: Map<string, number>;
  TEXT_TO_BYTES: Map<string, number>;
  BYTES_TO_TEXT: Map<number, string>;
}>;

const ALL_SYMBOLS = Object.values(ALPHABET).join("").slice(0, 256);

const MAPPED_ALPHABET: T_MAPPED_ALPHABET = {};

MAPPED_ALPHABET.BYTES_TO_HEX = Array.from({ length: 256 }, (_, i) => i).reduce(
  (acc: Map<number, string>, value) => {
    acc.set(value, value.toString(16).padStart(2, "0"));
    return acc;
  },
  new Map<number, string>()
);

MAPPED_ALPHABET.HEX_TO_BYTES = Array.from({ length: 256 }, (_, i) => i).reduce(
  (acc: Map<string, number>, value) => {
    acc.set(value.toString(16).padStart(2, "0"), value);
    return acc;
  },
  new Map<string, number>()
);

MAPPED_ALPHABET.TEXT_TO_BYTES = ALL_SYMBOLS.split("").reduce(
  (acc: Map<string, number>, value, index) => {
    acc.set(value, index);
    return acc;
  },
  new Map<string, number>()
);

MAPPED_ALPHABET.BYTES_TO_TEXT = ALL_SYMBOLS.split("").reduce(
  (acc: Map<number, string>, value, index) => {
    acc.set(index, value);
    return acc;
  },
  new Map<number, string>()
);

export { ALPHABET, MAPPED_ALPHABET };
