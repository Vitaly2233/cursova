import { observer } from "mobx-react";
import { CSSProperties, useEffect } from "react";
import Board from "../../components/Game/Board";
import Controller from "../../components/Game/Controller";
import { useStore } from "../../store";

function Game() {
  const { gameStore } = useStore();

  const init = async () => {
    if (gameStore.isResetting) {
      gameStore.setMatrix(gameStore.generateRandomMatrix());
      gameStore.setIsResetting(false);
    }
  };

  useEffect(() => {
    init();
  }, [gameStore.isResetting]);

  return (
    <div style={styles.container}>
      <Controller />
      <Board matrix={gameStore.matrix} />
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  container: {
    display: "flex",
    backgroundColor: "#b8b8b8",
    height: "100vh",
    flex: "1",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
};

export default observer(Game);
