const TitleContainer = () => {
  return (
    <div style={styles.container}>
      <h4 style={styles.title}>Kill your impostor syndrome</h4>
      <div style={styles.tag}>
        <p style={styles.text}>Honest job decoder</p>
        <p style={styles.text}>Skill assessment</p>
      </div>
    </div>
  );
};

const styles = {
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
};

export default TitleContainer;
