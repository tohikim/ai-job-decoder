import * as stylex from "@stylexjs/stylex";
import { tokens } from "../tokens.stylex";

const ProgressBar = (props) => {
  const { completed } = props;

  let bgcolor = {};

  if (completed < 40) {
    bgcolor = "#FAC7BE";
  } else if (completed < 70) {
    bgcolor = "#F8D87C";
  } else if (completed < 99) {
    bgcolor = "#B7DFBA";
  } else {
    bgcolor = tokens["--color-navy"];
  }

  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.filler(completed, bgcolor))}></div>
    </div>
  );
};

const styles = stylex.create({
  container: {
    height: 20,
    width: "100%",
    borderRadius: 50,
    margin: "1rem",
    backgroundColor: tokens["--color-third"],
  },
  filler: (completed, bgcolor) => ({
    height: "100%",
    borderRadius: "inherit",
    textAlign: "right",
    width: `${completed}%`,
    backgroundColor: bgcolor,
  }),
});

export default ProgressBar;
