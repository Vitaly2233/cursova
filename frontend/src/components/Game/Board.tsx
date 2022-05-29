import { observer } from "mobx-react";
import { CSSProperties } from "react";
import { useStore } from "../../store";
import BoxItem from "./BoxItem";

interface Props {
  matrix: number[][];
}

function Board({ matrix }: Props) {
  const { gameStore } = useStore();
  const handleBlockClick = (blockNumber: number) => {
    if (blockNumber === 16) return;

    const lastPosition = gameStore.findEmptyKeyNearby(blockNumber);
    if (!lastPosition) return;

    gameStore.swapWithLast(lastPosition, blockNumber);
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
