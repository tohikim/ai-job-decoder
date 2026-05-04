import * as stylex from "@stylexjs/unplugin";

const TitleContainer = () => {
  return (
    <div {...props.stylex(styles.container)}>
      <h4 {...props.stylex(styles.title)}>Kill your impostor syndrome</h4>
      <div {...props.stylex(styles.tag)}>
        <p {...props.stylex(styles.text)}>Honest job decoder</p>
        <p {...props.stylex(styles.text)}>Skill assessment</p>
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
    paddingTop: "4rem",
    paddingBotton: "2rem",
  },
  title: {
    fontSize: "1.4rem",
    fontWeight: "500",
    margin: "0",
    padding: "0",
    color: "var(--color-navy)",
  },
  tag: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
  },
  text: {
    border: "1px solid var(--color-third)",
    borderRadius: "50px",
    color: "var(--color-secondary)",
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
