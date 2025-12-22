import { ALPHABET } from "./alphabet";

export class Encoder {
  private readonly ALL_ALPHABET = [].join("");

  private readonly MAP_NUMBER_HEX = Array.from(
    { length: 256 },
    (_, i) => i
  ).reduce((acc: Map<number, string>, value) => {
    acc.set(value, value.toString(16).padStart(2, "0"));
    return acc;
  }, new Map<number, string>());

  private readonly MAP_HEX_NUMBER = Array.from(
    { length: 256 },
    (_, i) => i
  ).reduce((acc: Map<string, number>, value) => {
    acc.set(value.toString(16).padStart(2, "0"), value);
    return acc;
  }, new Map<string, number>());
}
