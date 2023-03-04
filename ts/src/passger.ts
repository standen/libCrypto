import { passwordSymbols } from "./encoding";

export function passGer(len: number = 20, symbol: boolean = true): string {
  let temp = [...Array(len).keys()],
    out: string = "",
    mode: number = symbol ? 4 : 3;

  shuffle(temp);

  temp.forEach((item) => {
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
}

function shuffle(array: number[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function randomInteger(min: number, max: number): number {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
