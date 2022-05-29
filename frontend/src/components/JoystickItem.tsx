import { CSSProperties } from "react";
import Joystick from "../icons/Joystick";

function JoystickItem() {
  return (
    <div style={styles.joystickContainer}>
      <Joystick />
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  joystickContainer: { width: 100 },
};

export default JoystickItem;
