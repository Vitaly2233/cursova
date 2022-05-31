import { observer } from "mobx-react";
import { CSSProperties } from "react";

function ScoreBoard() {
  return <div style={styles.container}></div>;
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
    alignItems: "center",
    backgroundColor: "#ffd5a6",
  },
};

export default observer(ScoreBoard);
