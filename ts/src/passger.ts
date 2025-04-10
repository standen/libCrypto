import { vocab } from "./encoding";

const passwordSymbols = [
  vocab.numbers,
  vocab.landEngSmall,
  vocab.landEngBig,
  vocab.symbols,
];

const shuffle = (array: number[]): number[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const randomInteger = (min: number, max: number): number => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const defCheckSymbols = (symbolString: string): boolean =>
  Array.from(symbolString).every((item) =>
    passwordSymbols.flat().includes(item)
  );

export const passGer = (len: number = 20, symbol: boolean = true): string => {
  const mode: number = symbol ? 4 : 3;

  let out: string = "";

  shuffle([...Array(len).keys()]).forEach((item) => {
    switch (item % mode) {
      case 0:
        out +=
          passwordSymbols[0][randomInteger(0, passwordSymbols[0].length - 1)];
        break;
      case 1:
        out +=
          passwordSymbols[1][randomInteger(0, passwordSymbols[1].length - 1)];
        break;
      case 2:
        out +=
          passwordSymbols[2][randomInteger(0, passwordSymbols[2].length - 1)];
        break;
      case 3:
        out +=
          passwordSymbols[3][randomInteger(0, passwordSymbols[3].length - 1)];
        break;
    }
  });

  return out;
};
