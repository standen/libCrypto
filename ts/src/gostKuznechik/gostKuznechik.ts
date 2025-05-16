import { TABLE_L_OPERATION } from "./tableL";
import { KEYS_CONSTS, TABLE_L, TABLE_S, TABLE_S_INV } from "./operationsConsts";

const BLOCK_SIZE_IN_BYTES = 16;
const KEY_SIZE_IN_BYTES = 32;

export class Kuznechik {
  keys: Uint8Array[];

  constructor(key: Uint8Array) {
    this.keys = this.generateKeys(key);
  }

  public generateKeys = (key: Uint8Array): Uint8Array[] => {
    const keys: Uint8Array[] = [key.subarray(0, 16), key.subarray(16)];

    let temp: Uint8Array,
      left: Uint8Array = keys[0],
      right: Uint8Array = keys[1];

    for (let i = 0; i < 4; i++) {
      for (let k = 0; k < 8; k++) {
        temp = left;
        left = this.X(this.LSX(left, KEYS_CONSTS[8 * i + k]), right);
        right = temp;
      }
      keys.push(left, right);
    }

    return keys;
  };

  private X = (a: Uint8Array, b: Uint8Array): Uint8Array =>
    a.map((item, i) => item ^ b[i]);

  private S = (indata: Uint8Array): Uint8Array =>
    indata.map((item) => TABLE_S[item]);

  public Sinv = (indata: Uint8Array): Uint8Array =>
    indata.map((item) => TABLE_S_INV[item]);

  private L = (indata: Uint8Array): Uint8Array => {
    for (let i = 0; i < 16; i++) {
      let sum: number = 0;

      for (let k = 0; k < 16; k++) {
        sum ^= TABLE_L_OPERATION[indata[k] * 256 + TABLE_L[k]];
      }

      indata.set([sum, ...indata.subarray(0, indata.length - 1)]);
    }

    return indata;
  };

  public Linv() {}

  private LSX = (pt: Uint8Array, key: Uint8Array): Uint8Array =>
    this.L(this.S(this.X(pt, key)));

  public SLX() {}

  public encrypt = (pt: Uint8Array): Uint8Array => {
    for (let i = 0; i < 9; i++) {
      pt = this.LSX(pt, this.keys[i]);
    }

    return this.X(pt, this.keys[9]);
  };

  public decrypt() {}
}
