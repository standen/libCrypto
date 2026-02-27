## Проверка соответствия ГОСТ Р 34.12-2015

```typescript
import { GOST } from "@standen/crypto";

const key = "8899aabbccddeeff0011223344556677fedcba98765432100123456789abcdef";
const plainText = "1122334455667700ffeeddccbbaa9988";
const cipherText = "7f679d90bebc24305a468d42b9d4edcd";

console.log(GOST.gostEncrypt(key, plainText));
console.log(GOST.gostDecrypt(key, cipherText));
```

## Использование утилиты

```typescript
import { Kuznechik } from "@standen/crypto";

const key = "мой_ключ";
const plainText = "открытый_текст";
const cipherText = "зашифрованный_текст";

const crypto = new Kuznechik(key);

console.log(crypto.enc(plainText));
console.log(crypto.dec(cipherText));
```
