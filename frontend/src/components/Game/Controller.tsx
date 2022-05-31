import { observer } from "mobx-react";
import { CSSProperties, useEffect } from "react";
import { useStore } from "../../store";
import ConfirmButton from "../ConfirmButton";
import ScoreLabel from "./ScoreLabel";

function Controller() {
  const { gameStore } = useStore();

  useEffect(() => {
    let interval: any;
    if (gameStore.isGameStarted) {
      interval = setInterval(() => {
        gameStore.setTime(gameStore.time + 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [gameStore.isGameStarted]);

  const handleResetClick = () => {
    gameStore.setIsResetting(true);
    gameStore.setIsGameStarted(false);
    gameStore.setTime(0);
    gameStore.setMoves(0);
  };

  const handleStartClick = () => {
    if (gameStore.isGameStarted) {
      gameStore.setIsGameStarted(false);
    } else {
      gameStore.setIsGameStarted(true);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.columnLabels}>
        <ScoreLabel name="MOVES" score={gameStore.moves.toString()} />
        <ConfirmButton
          text={gameStore.isGameStarted ? "PAUSE" : "START"}
          onClick={handleStartClick}
        />
      </div>
      <div style={styles.columnLabels}>
        <ScoreLabel name="TIME" score={gameStore.time.toString()} />
        <ConfirmButton text={"RESET"} onClick={handleResetClick} />
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  container: {
    position: "absolute",
    display: "flex",
    left: "70px",
    top: "70px",
  },

  columnLabels: {
    display: "flex",
    flexDirection: "column",
    marginRight: "30px",
  },
};

export default observer(Controller);
