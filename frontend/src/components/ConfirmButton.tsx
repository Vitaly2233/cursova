import { CSSProperties } from "react";

interface Props {
  text?: string;
  onClick?: () => {};
  type?: "submit";
}

function ConfirmButton(props: Props) {
  return (
    <button style={styles.button} {...props}>
      {props.text}
    </button>
  );
}

const styles: Record<string, CSSProperties> = {
  button: {
    backgroundColor: "#4ea95f",
    borderWidth: "0",
    borderRadius: "30px",
    padding: "10px 30px 10px 30px",
    color: "white",
  },
};

export default ConfirmButton;
