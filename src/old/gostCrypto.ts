import { Gost } from "./libCrypto";
import { intArrayToHexString, hexStringToIntArray } from "./encoding";

const data = {
  key: "8899aabbccddeeff0011223344556677fedcba98765432100123456789abcdef",
  pt: "1122334455667700ffeeddccbbaa9988",
  ct: "7f679d90bebc24305a468d42b9d4edcd",
};

const crypt = new Gost(data.key, true);

const gostEnc = (pt: string): string =>
  intArrayToHexString(crypt.encrypt(hexStringToIntArray(pt)));

const gostDec = (ct: string): string =>
  intArrayToHexString(crypt.decrypt(hexStringToIntArray(ct)));

console.log(`Зашифрованный текст: ${gostEnc(data.pt)}`);
console.log(`Расшифрованный текст: ${gostDec(data.ct)}`);
