import * as stylex from "@stylexjs/stylex";
import infomark from "../assets/info-mark.png";
import { tokens } from "../tokens.stylex";

const InfoContainer = () => {
  return (
    <div {...stylex.props(styles.container)}>
      <img alt="info mark" src={infomark} {...stylex.props(styles.icon)} />
      <p {...stylex.props(styles.text)}>
        We translate complex JDs into simple skill checklists so you can apply
        with confidence.
      </p>
    </div>
  );
};

const styles = stylex.create({
  container: {
    display: "flex",
    flexDirection: "row",
    color: tokens["--color-secondary"],
    backgroundColor: tokens["--color-background"],
    borderRadius: "15px",
    padding: "1rem 1.5rem",
    margin: "2rem 3.35rem 2.5rem 3.35rem",
    gap: "10px",
    alignSelf: "center",
    width: {
      default: null,
      "@media (max-width: 800px)": null,
      "@media (min-width: 801px)": "30dvw",
    },
  },
  icon: {
    height: {
      "@media (max-width: 800px)": "21px",
      "@media (min-width: 801px)": "17px",
    },
    width: {
      "@media (max-width: 800px)": "21px",
      "@media (min-width: 801px)": "17px",
    },
    paddingTop: {
      "@media (max-width: 800px)": "5px",
      "@media (min-width: 801px)": "3px",
    },
    opacity: "50%",
  },
  text: {
    padding: "0",
    margin: "0",
    fontSize: "14px",
    fontWeight: "100",
    textAlign: "left",
    lineHeight: "1.4rem",
  },
});

export default InfoContainer;
