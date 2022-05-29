import { CSSProperties } from "react";

interface Props {
  number: number;

  onClick: (number: number) => void;
}

function BoxItem({ number, onClick }: Props) {
  if (number === 16) return <div style={styles.container}></div>;

  return (
    <div
      onClick={(e) => {
        onClick(number);
      }}
      style={styles.container}
    >
      {number}
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "94px",
    height: "94px",
    fontSize: "30px",
    color: "black",
    margin: "3px",
    borderRadius: "10px",
    backgroundColor: "#ffd5a6",
  },
};

export default BoxItem;
