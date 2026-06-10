import * as stylex from "@stylexjs/stylex";
import { tokens } from "../tokens.stylex";

const TitleContainer = () => {
  return (
    <div {...stylex.props(styles.container)}>
      <h4 {...stylex.props(styles.title)}>Apply With Confidence</h4>
      <div {...stylex.props(styles.tag)}>
        <p {...stylex.props(styles.text)}>Honest job decoder</p>
        <p {...stylex.props(styles.text)}>Skill assessment</p>
      </div>
    </div>
  );
};

const styles = stylex.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    paddingTop: "5rem",
    paddingBotton: "2rem",
    marginBottom: {
      "@media (max-width:800px)": "0",
      "@media (min-width: 801px)": "3rem",
    },
  },
  title: {
    fontSize: "1.4rem",
    fontWeight: "500",
    margin: "0",
    padding: "0",
    color: tokens["--color-navy"],
  },
  tag: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
  },
  text: {
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: tokens["--color-third"],
    borderRadius: "50px",
    color: tokens["--color-secondary"],
    width: "fit-content",
    height: "fit-content",
    fontSize: "16px",
    margin: "0",
    padding: "0.5rem",
    paddingRight: "1rem",
    paddingLeft: "1rem",
  },
});

export default TitleContainer;
