import * as stylex from "@stylexjs/stylex";
import { getLlmOutput } from "../api/get-llm-output";
import arrow from "../assets/arrow.png";
import { MINIMUM_JOB_DESCRIPTION_CHARACTERS } from "../constants/job-description";
import { tokens } from "../tokens.stylex";

const InputContainer = (props) => {
  const onSubmit = async (e) => {
    e.preventDefault();
    props.setLoading(true);

    try {
      if (
        import.meta.env.VITE_ENVIRONMENT === "production" &&
        props.jobDescription.length < MINIMUM_JOB_DESCRIPTION_CHARACTERS
      ) {
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
    <div {...stylex.props(styles.container)}>
      <form onSubmit={onSubmit}>
        <textarea
          placeholder="Paste job description here."
          value={props.jobDescription}
          rows={1}
          {...stylex.props(styles.textarea)}
          onChange={(e) => props.setJobDescription(e.target.value)}
        />
        <button
          type={"submit"}
          variant="contained"
          {...stylex.props(styles.button)}
        >
          <img alt="arrow" src={arrow} {...stylex.props(styles.arrow)} />
        </button>
      </form>
    </div>
  );
};

const styles = stylex.create({
  container: {
    boxShadow: `0 0 20px ${tokens["--color-third"]}, 0 0 40px ${tokens["--color-third"]}`,
    borderRadius: "25px",
    marginBottom: "1rem",
    marginLeft: "1.25rem",
    marginRight: "1.25rem",
  },
  textarea: {
    borderWidth: 0,
    borderRadius: "25px",
    color: tokens["--color-primary"],
    padding: "1.5rem",
    fontSize: "18px",
    fontWeight: "100",
    width: "85%",
    alignSelf: "flex-start",
  },
  button: {
    borderRadius: "50px",
    borderWidth: 0,
    backgroundColor: tokens["--color-navy"],
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
});

export default InputContainer;
