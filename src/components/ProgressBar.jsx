const ProgressBar = (props) => {
  const { completed } = props;

  const containerStyles = {
    height: 20,
    width: "100%",
    backgroundColor: "var(--color-third)",
    borderRadius: 50,
    margin: "1rem",
  };

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

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: "inherit",
    textAlign: "right",
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}></div>
    </div>
  );
};

export default ProgressBar;
