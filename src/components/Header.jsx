import * as stylex from "@stylexjs/stylex";
import reloadicon from "../assets/reload.png";
import Sharebutton from "./Sharebutton";
import { tokens } from "../tokens.stylex";

const Header = (props) => {
  const handleClick = (e) => {
    e.preventDefault();
    props.setRoute("home");
    props.setJobDescription("");
  };

  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.restartContainer)}>
        {props.enableRestart && (
          <button onClick={handleClick} {...stylex.props(styles.button)}>
            <img src={reloadicon} {...stylex.props(styles.icon)} />
          </button>
        )}
      </div>
      <p {...stylex.props(styles.modelName)}>ISK 1.0</p>
      <div {...stylex.props(styles.iconContainer)}>
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
    color: tokens["--color-secondary"],
    fontSize: "1rem",
    textAlign: "center",
    paddingTop: "0.5rem",
  },
  button: {
    backgroundColor: "transparent",
    borderWidth: 0,
    alignItems: "right",
  },
  iconContainer: { alignItems: "right" },
  icon: { height: 70, width: 70, margin: 0, padding: 0 },
});

export default Header;
