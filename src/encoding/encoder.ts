import { ALPHABET, MAPPED_ALPHABET } from "./alphabet";

export class Encoder {
  private readonly HEX_SYMBOLS = "0123456789abcdef";

  public validateHex = (hex: string): boolean =>
    hex.split("").every((item) => this.HEX_SYMBOLS.includes(item));

  public validateText = (text: string): boolean =>
    text
      .split("")
      .every((item) =>
        Object.values(ALPHABET).join("").slice(0, 256).includes(item)
      );

  private splitHexIntoPairs = (hex: string): string[] => {
    if (hex.length % 2 !== 0) {
      throw new Error(
        "Строка должна состоять из bytes в hex формате с ведущими нулями!"
      );
    }
    return hex.match(/.{1,2}/g) || [];
  };

  public bytesToHex = (bytes: Uint8Array): string =>
    bytes.reduce((acc, value) => {
      acc += MAPPED_ALPHABET.BYTES_TO_HEX?.get(value) || "";
      return acc;
    }, "");

  public hexToBytes = (hex: string): Uint8Array => {
    if (hex.length % 2 !== 0) {
      throw new Error("Длина строки должна быть четной");
    }

    if (!this.validateHex(hex)) {
      throw new Error("Строка должна содержать только hex символы");
    }

    const pairsString = this.splitHexIntoPairs(hex);

    const bytes = new Uint8Array(pairsString.length);

    for (let i = 0; i <= bytes.length; i++) {
      bytes[i] = MAPPED_ALPHABET.HEX_TO_BYTES?.get(pairsString[i]) || 0;
    }

    return bytes;
  };

  public bytesToText = (bytes: Uint8Array): string =>
    bytes.reduce((acc, value) => {
      acc += MAPPED_ALPHABET.BYTES_TO_TEXT?.get(value) || "";
      return acc;
    }, "");

  public textToBytes = (text: string): Uint8Array => {
    if (!this.validateText(text)) {
      throw new Error("Присутствуют недопустимые символы!");
    }

    const bytes = new Uint8Array(text.length);

    for (let i = 0; i <= bytes.length; i++) {
      bytes[i] = MAPPED_ALPHABET.TEXT_TO_BYTES?.get(text[i]) || 0;
    }

    return bytes;
  };
}
