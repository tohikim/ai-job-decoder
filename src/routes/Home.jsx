import Header from "../components/Header.jsx";
import TitleContainer from "../components/TitleContainer.jsx";
import InputContainer from "../components/InputContainer.jsx";
import InfoContainer from "../components/InfoContainer.jsx";
import { Mirage } from "ldrs/react";
import "ldrs/react/Mirage.css";
import { useState } from "react";
import * as stylex from "@stylexjs/unplugin";

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
        <div {...props.stylex(styles.loading)}>
          <Mirage
            size="60"
            speed="2.5"
            color="var(--color-navy)"
            position="relative"
          />
          <p {...props.stylex(styles.p)}>We're loading your result...</p>
        </div>
      ) : (
        <div {...props.stylex(styles.content)}>
          <TitleContainer />
          <div {...props.stylex(styles.section)}>
            <InfoContainer />
            <InputContainer
              setRoute={props.setRoute}
              jobDescription={props.jobDescription}
              setJobDescription={props.setJobDescription}
              setLlmResult={props.setLlmResult}
              loading={loading}
              setLoading={setLoading}
            />
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
    justifyContent: "space-between",
    height: "86dvh",
  },
  section: {
    display: "flex",
    flexDirection: "column",
  },
  loading: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "65vh",
  },
  p: {
    fontSize: "18px",
    fontWeight: "100",
    paddingTop: "1rem",
  },
});

export default Home;
