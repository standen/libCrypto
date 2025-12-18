const ALPHABET_ENG = "abcdefghijklmnopqrstuvwxyz";
const ALPHABET_RU = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";

type T_ALPABET = Readonly<{
  digits: string;
  engSmall: string;
  engBig: string;
  ruSmall: string;
  ruBig: string;
  specChars: string;
  sugarChars: string;
}>;

export const vocab: T_ALPABET = {
  digits: "0123456789",
  engSmall: ALPHABET_ENG,
  engBig: ALPHABET_ENG.toUpperCase(),
  ruSmall: ALPHABET_RU,
  ruBig: ALPHABET_RU.toUpperCase(),
  specChars: "~`'\"!@#№$;:,^%&?*()-+=|\\<>[]{}._ ",
  sugarChars:
    "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞ",
};

export const ALPHABET = Object.values(vocab).join("");
