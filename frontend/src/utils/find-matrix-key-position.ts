import { IPosition } from "../interface/position";

export function FindMatrixBlockPosition(
  matrix: number[][],
  blockNumber: number
): IPosition {
  let row: number | undefined;
  let column: number | undefined;

  matrix.forEach((matrixRow, rowIndex) => {
    const i = matrixRow.findIndex((rowVal) => rowVal === blockNumber);

    if (i !== -1) {
      row = rowIndex;
      column = i;
    }
  });

  return { row, column };
}
