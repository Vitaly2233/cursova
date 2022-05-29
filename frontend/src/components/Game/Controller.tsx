import { observer } from "mobx-react";
import { CSSProperties } from "react";
import ConfirmButton from "../ConfirmButton";
import ScoreLabel from "./ScoreLabel";

function Controller() {
  return (
    <div style={styles.container}>
      <div style={styles.columnLabels}>
        <ScoreLabel name="MOVES" score="sjfd" />
        <ConfirmButton text="START" />
      </div>
      <div style={styles.columnLabels}>
        <ScoreLabel name="TIME" score="sjfd" />
        <ConfirmButton text={"RESET"} />
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
