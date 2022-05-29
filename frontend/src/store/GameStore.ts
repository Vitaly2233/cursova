import { action, makeAutoObservable, observable } from "mobx";
import { IPosition } from "../interface/position";
import { FindMatrixBlockPosition } from "../utils/find-matrix-key-position";
import { RandomNumbersOrder } from "../utils/random-numbers-order";

class GameStore {
  @observable
  matrix: number[][] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action
  generateRandomMatrix = () => {
    let res: number[][] = [];
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    const randOrder = RandomNumbersOrder(numbers);

    let row = 0;
    for (let i = 0; i < numbers.length; i++) {
      if (!res[row]) res[row] = [];

      res[row].push(randOrder[i]);

      if (res[row].length === 4) {
        row++;
      }
    }

    return res;
  };

  @action
  setMatrix = (matrix: number[][]) => {
    this.matrix = matrix;
  };

  @action
  findEmptyKeyNearby = (blockNumber: number): null | IPosition => {
    const { column, row } = FindMatrixBlockPosition(this.matrix, blockNumber);

    if (column === undefined || row === undefined) return null;

    const rows = [this.matrix[row], this.matrix[row + 1], this.matrix[row - 1]];

    // TODO rewrite
    if (rows[0] !== undefined) {
      if (rows[0][column + 1] === 16) return { row, column: column + 1 };
      if (rows[0][column - 1] === 16) return { row, column: column - 1 };
    }

    if (rows[1] !== undefined) {
      if (rows[1][column] === 16) return { row: row + 1, column };
    }
    if (rows[2] !== undefined) {
      if (rows[2][column] === 16) return { row: row - 1, column };
    }

    return null;
  };

  @action
  swapWithLast = (
    { column: lastColumn, row: lastRow }: IPosition,
    blockNumber: number
  ) => {
    const { column, row } = FindMatrixBlockPosition(this.matrix, blockNumber);

    if (
      column === undefined ||
      row === undefined ||
      lastColumn == undefined ||
      lastRow === undefined
    )
      return null;

    this.matrix[lastRow][lastColumn] = blockNumber;
    this.matrix[row][column] = 16;
  };
}
export default new GameStore();
