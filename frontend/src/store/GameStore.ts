import { action, makeAutoObservable, observable } from "mobx";
import { IPosition } from "../interface/position";
import { FindMatrixBlockPosition } from "../utils/find-matrix-key-position";
import { api } from "../utils/Api";
import { RandomNumbersOrder } from "../utils/random-numbers-order";

class GameStore {
  @observable
  matrix: number[][] = [];

  @observable
  isGameStarted: Boolean = false;

  @observable
  isResetting: Boolean = true;

  @observable
  moves: number = 0;

  @observable
  lastMoves: number = 0;

  @observable
  time: number = 0;

  @observable
  lastTime: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  saveScores = async () => {
    await api.post("score", {
      time: this.time,
      moves: this.moves,
    });
  };

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
      lastColumn === undefined ||
      lastRow === undefined
    )
      return null;

    this.matrix[lastRow][lastColumn] = blockNumber;
    this.matrix[row][column] = 16;
  };

  @action
  setIsGameStarted = (isGameStarted: boolean) =>
    (this.isGameStarted = isGameStarted);

  @action
  setIsResetting = (isResetting: boolean) => (this.isResetting = isResetting);

  @action
  setMoves = (moves: number) => (this.moves = moves);

  @action
  setTime = (time: number) => (this.time = time);

  @action
  setLastScores = async () => {
    const { data } = await api.get("score/last_scores");
    if (data) {
      this.lastMoves = data.moves;
      this.lastTime = data.time;
    }
  };
}
export default new GameStore();
