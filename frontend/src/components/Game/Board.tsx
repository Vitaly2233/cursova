import { observer } from "mobx-react";
import { CSSProperties } from "react";
import { useStore } from "../../store";
import BoxItem from "./BoxItem";

interface Props {
  matrix: number[][];
}

function Board({ matrix }: Props) {
  const { gameStore } = useStore();

  const isWinCondition = () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    const matrix = gameStore.matrix;

    if (matrix.length === 0) return false;

    let indexesViewed = 0;
    for (const row of matrix)
      for (const matrixNumber of row) {
        if (matrixNumber !== numbers[indexesViewed]) return false;
        indexesViewed++;
      }

    return true;
  };

  if (isWinCondition()) gameStore.saveScores();

  const handleBlockClick = (blockNumber: number) => {
    if (!gameStore.isGameStarted) {
      gameStore.setIsGameStarted(true);
    }

    if (blockNumber === 16) return;

    const lastPosition = gameStore.findEmptyKeyNearby(blockNumber);
    if (!lastPosition) return;

    gameStore.swapWithLast(lastPosition, blockNumber);
    gameStore.setMoves(gameStore.moves + 1);
  };

  return (
    <div style={styles.container}>
      {matrix.map((matrixRow) => {
        return matrixRow.map((number) => {
          return <BoxItem onClick={handleBlockClick} number={number} />;
        });
      })}
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    width: "400px",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default observer(Board);
