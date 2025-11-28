export const generateIV = (): Uint8Array => {
  const iv = new Uint8Array(16);
  window.crypto.getRandomValues(iv);
  return iv;
};

export const encryptAES256 = async (
  data: Uint8Array,
  key: Uint8Array,
  iv: Uint8Array
): Promise<Uint8Array> => {
  if (key.length !== 32) throw new Error("Key must be 32 bytes (256 bits)");
  if (iv.length !== 16) throw new Error("IV must be 16 bytes");

  // Импортируем ключ
  const cryptoKey = await window.crypto.subtle.importKey(
    "raw",
    key,
    { name: "AES-CBC" },
    false,
    ["encrypt"]
  );

  // Шифруем данные
  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: "AES-CBC",
      iv: iv,
    },
    cryptoKey,
    data
  );

  return new Uint8Array(encrypted);
};

export const decryptAES256 = async (
  encryptedData: Uint8Array,
  key: Uint8Array,
  iv: Uint8Array
): Promise<Uint8Array> => {
  if (key.length !== 32) throw new Error("Key must be 32 bytes (256 bits)");
  if (iv.length !== 16) throw new Error("IV must be 16 bytes");

  // Импортируем ключ
  const cryptoKey = await window.crypto.subtle.importKey(
    "raw",
    key,
    { name: "AES-CBC" },
    false,
    ["decrypt"]
  );

  // Дешифруем данные
  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: "AES-CBC",
      iv: iv,
    },
    cryptoKey,
    encryptedData
  );

  return new Uint8Array(decrypted);
};
