import { CSSProperties } from "react";

interface Props {
  name: string;
  score: string;
}

function ScoreLabel({ name, score }: Props) {
  return (
    <div style={styles.container}>
      <div style={styles.firstRow}>{name}</div>
      <div style={styles.secondRow}>{score}</div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px",
    padding: "5px 30px 5px 30px",
    backgroundColor: "#ffd5a6",
    marginBottom: "10px",
  },

  firstRow: {
    fontSize: "30px",
    textAlign: "center",
  },

  secondRow: {
    textAlign: "center",
    fontSize: "20px",
  },
};

export default ScoreLabel;
