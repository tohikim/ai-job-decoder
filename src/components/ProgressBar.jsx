import * as stylex from "@stylexjs/unplugin";

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
    bgcolor = "var(--color-navy)";
  }

  return (
    <div
      {...props.stylex(styles.container, {
        backgroundColor: "var(--color-third)",
      })}
    >
      <div
        {...props.stylex(styles.filler, {
          width: `${completed}%`,
          backgroundColor: bgcolor,
        })}
      ></div>
    </div>
  );
};

const styles = stylex.create({
  container: {
    height: 20,
    width: "100%",
    borderRadius: 50,
    margin: "1rem",
  },
  filler: {
    height: "100%",

    borderRadius: "inherit",
    textAlign: "right",
  },
});

export default ProgressBar;
