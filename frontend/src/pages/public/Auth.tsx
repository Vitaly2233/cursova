import { observer } from "mobx-react";
import { CSSProperties } from "react";
import { useForm } from "react-hook-form";
import ConfirmButton from "../../components/ConfirmButton";
import JoystickItem from "../../components/JoystickItem";
import { useStore } from "../../store";
import securedStorage from "../../utils/SecuredStorage";

function Auth() {
  const { userStore } = useStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const { access_token } = await userStore.login(
      data.username,
      data.password
    );
    if (!access_token) {
      await userStore.register(data.username, data.password);
    }
    userStore.setToken(access_token);
    securedStorage.set("access_token", access_token);
  };

  return (
    <div style={styles.container}>
      <JoystickItem />
      <h1 style={styles.logoText}>Cursova</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.formContainer}>
        <input
          placeholder={`Enter you'r username`}
          style={styles.formInput}
          type={"text"}
          {...register("username", {
            required: true,
            maxLength: 20,
            minLength: 4,
          })}
        />
        <input
          placeholder={`Enter you'r password`}
          style={styles.formInput}
          type={"password"}
          {...register("password", {
            required: true,
            maxLength: 20,
            minLength: 4,
          })}
        />
        <ConfirmButton type="submit" text="Submit" />
      </form>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#444e5d",
  },
  logoText: { fontSize: 18, color: "#c3c5c8" },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#4e5765",
    borderRadius: "10px",
    marginTop: "20px",
    padding: "40px",
  },
  formInput: { marginBottom: "10px" },
  buttonsContainer: {},
};

export default observer(Auth);
