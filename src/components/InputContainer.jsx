import { getLlmOutput } from "../api/get-llm-output";
import arrow from "../assets/arrow.png";

const InputContainer = (props) => {
  const onSubmit = async (e) => {
    e.preventDefault();
    props.setLoading(true);

    try {
      if (props.jobDescription.length < 30) {
        alert("Please enter a job description");

        return;
      }

      const llmOutput = await getLlmOutput(props.jobDescription);

      if (!llmOutput) {
        alert("Something went wrong, please try again.");
        throw new Error("Could not get llm output");
      }

      props.setLlmResult(llmOutput);

      props.setRoute("result");
    } catch (error) {
      console.error(error);
    } finally {
      props.setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={onSubmit}>
        <textarea
          placeholder="Paste job description here."
          value={props.jobDescription}
          rows={1}
          style={styles.textarea}
          onChange={(e) => props.setJobDescription(e.target.value)}
        />
        <button type={"submit"} variant="contained" style={styles.button}>
          <img alt="arrow" src={arrow} style={styles.arrow} />
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    boxShadow: "0 0 20px var(--color-third), 0 0 40px var(--color-third)",
    borderRadius: "25px",
    marginBottom: "1rem",
    marginLeft: "1.25rem",
    marginRight: "1.25rem",
  },
  textarea: {
    border: "0",
    borderRadius: "25px",
    color: "var(--color-primary)",
    padding: "1.5rem",
    fontSize: "18px",
    fontWeight: "100",
    width: "85%",
    alignSelf: "flex-start",
  },
  button: {
    borderRadius: "50px",
    border: 0,
    backgroundColor: "var(--color-navy)",
    paddingTop: "0.2rem",
    height: "45px",
    width: "45px",
    margin: "1rem",
    marginTop: "0.4rem",
    float: "right",
  },
  arrow: {
    width: "16px",
    height: "21x",
  },
};

export default InputContainer;
