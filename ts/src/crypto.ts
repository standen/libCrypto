import { Gost } from "./libCrypto";
import {
  encode,
  decode,
  intArrayToHexString,
  hexStringToIntArray,
} from "./encoding";

export const encrypt = (symbolString: string, symbolKey: string): string => {
  let result: string = "";

  const crypt = new Gost(symbolKey);

  const dataIntArray: number[] = encode(symbolString);

  while (dataIntArray.length > 0) {
    const tempBlock: number[] = crypt.shareBlock(dataIntArray.splice(0, 16));
    result += intArrayToHexString(crypt.encrypt(tempBlock));
  }

  return result;
};

export const decrypt = (hexString: string, symbolKey: string): string => {
  let result: string = "";

  const crypt = new Gost(symbolKey);

  const dataIntArray: number[] = hexStringToIntArray(hexString);

  while (dataIntArray.length > 0) {
    const tempBlock: number[] = dataIntArray.splice(0, 16);
    result += decode(crypt.decrypt(tempBlock).filter((item) => item != 255));
  }

  return result;
};
