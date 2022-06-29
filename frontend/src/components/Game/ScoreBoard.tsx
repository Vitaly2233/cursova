import { observer } from "mobx-react";
import { CSSProperties, useEffect } from "react";
import { useStore } from "../../store";

function ScoreBoard() {
  const { gameStore } = useStore();

  const init = async () => {
    await gameStore.setLastScores();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div style={styles.container}>
      Your previous moves {gameStore.lastMoves}
      <br></br>
      Your previous time {gameStore.lastTime}
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  container: {
    position: "absolute",
    right: "70px",
    top: "70px",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    width: "200px",
    height: "100px",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "#ffd5a6",
  },
};

export default observer(ScoreBoard);
