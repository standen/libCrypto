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

export const vocab: T_ALPABET = {
  digits: "0123456789",
  enSmall: ALPHABET_EN,
  enBig: ALPHABET_EN.toUpperCase(),
  ruSmall: ALPHABET_RU,
  ruBig: ALPHABET_RU.toUpperCase(),
  specChars: "~`'\"!@#№$;:,^%&?*()-+=|\\<>[]{}._ ",
  sugarChars:
    "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞ",
};

export const ALPHABET = Object.values(vocab).join("");
