import * as stylex from "@stylexjs/unplugin";
import reloadicon from "../assets/reload.png";
import Sharebutton from "./Sharebutton";

const Header = (props) => {
  const handleClick = (e) => {
    e.preventDefault();
    props.setRoute("home");
    props.setJobDescription("");
  };

  return (
    <div {...props.stylex(styles.container)}>
      <div {...props.stylex(styles.restartContainer)}>
        {props.enableRestart && (
          <button onClick={handleClick} {...props.stylex(styles.button)}>
            <img src={reloadicon} {...props.stylex(styles.icon)} />
          </button>
        )}
      </div>
      <p {...props.stylex(styles.modelName)}>ISK 1.0</p>
      <div {...props.stylex(styles.iconContainer)}>
        {props.enableShare && <Sharebutton />}
      </div>
    </div>
  );
};

const styles = stylex.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "fit-content",
    verticalAlign: "top",
    padding: "1rem",
    maxHeight: "10dvh",
  },
  restartContainer: {
    alignItems: "left",
  },
  modelName: {
    color: "var(--color-secondary)",
    fontSize: "1rem",
    textAlign: "center",
    paddingTop: "0.5rem",
  },
  button: {
    backgroundColor: "transparent",
    borderWidth: "0",
    alignItems: "right",
  },
  iconContainer: { alignItems: "right" },
  icon: { height: 70, width: 70, margin: 0, padding: 0 },
});

export default Header;
