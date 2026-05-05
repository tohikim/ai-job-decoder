import Header from "../components/Header.jsx";
import TitleContainer from "../components/TitleContainer.jsx";
import InputContainer from "../components/InputContainer.jsx";
import InfoContainer from "../components/InfoContainer.jsx";
import { Mirage } from "ldrs/react";
import "ldrs/react/Mirage.css";
import { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { tokens } from "../tokens.stylex";

function Home(props) {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Header
        setRoute={props.setRoute}
        setJobDescription={props.setJobDescription}
        enableRestart={false}
        enableShare={false}
      />
      {loading ? (
        <div {...stylex.props(styles.loading)}>
          <Mirage
            size="60"
            speed="2.5"
            color={tokens["--color-navy"]}
            position="relative"
          />
          <p {...stylex.props(styles.p)}>We're loading your result...</p>
        </div>
      ) : (
        <div {...stylex.props(styles.content)}>
          <TitleContainer />
          <div {...stylex.props(styles.section)}>
            <div {...stylex.props(styles.InfoContainer)}>
              <InfoContainer />
            </div>
            <InputContainer
              setRoute={props.setRoute}
              jobDescription={props.jobDescription}
              setJobDescription={props.setJobDescription}
              setLlmResult={props.setLlmResult}
              loading={loading}
              setLoading={setLoading}
            />
            <div {...stylex.props(styles.InfoContainer2)}>
              <InfoContainer />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = stylex.create({
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: {
      "@media (max-width: 800px)": "space-between",
      "@media (min-width: 801px)": "center",
    },
    height: "86dvh",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  loading: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "70vh",
  },
  p: {
    fontSize: "18px",
    fontWeight: "100",
    paddingTop: "1rem",
  },
  InfoContainer: {
    display: {
      "@media (max-width: 800px)": "flex",
      "@media (min-width: 801px)": "none",
    },
  },
  InfoContainer2: {
    display: {
      "@media (max-width: 800px)": "none",
      "@media (min-width: 801px)": "flex",
    },
    marginTop: {
      "@media (max-width: 800px)": "none",
      "@media (min-width: 801px)": "3rem",
    },
  },
});

export default Home;
