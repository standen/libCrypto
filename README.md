## Проверка соответствия ГОСТ Р 34.12-2015

```typescript
import { Kuznechik } from "./gostKuznechik";

import { uint8ArrayToStringHex, stringHexToUint8Array } from "./encoding";

const key = "8899aabbccddeeff0011223344556677fedcba98765432100123456789abcdef";
const plainText = "1122334455667700ffeeddccbbaa9988";
const cipherText = "7f679d90bebc24305a468d42b9d4edcd";

const crypto = new Kuznechik(stringHexToUint8Array(key));

console.log(
  uint8ArrayToStringHex(crypto.encrypt(stringHexToUint8Array(plainText)))
);

console.log(
  uint8ArrayToStringHex(crypto.decrypt(stringHexToUint8Array(cipherText)))
);

```

## Использование утилиты

```typescript
import { Kuznechik } from "./gostKuznechik";

import { stringAlphabetToUint8Array } from "./encoding";

const key = "мой_ключ";
const plainText = "открытый_текст";
const cipherText = "зашифрованный_текст";

const crypto = new Kuznechik(stringAlphabetToUint8Array(key));

console.log(crypto.enc(plainText));
console.log(crypto.dec(cipherText));

```