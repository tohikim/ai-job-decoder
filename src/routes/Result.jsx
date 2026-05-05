import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import HonestDecoder from "../components/HonestDecoder";
import Score from "../components/Score";
import Skill from "../components/Skill.jsx";
import { mapStateToCurrentScore } from "../utils/map-state-to-current-score";
import { formatArrayToTargetObject } from "../utils/format-array-to-target-object";
import ProgressBar from "../components/ProgressBar.jsx";
import * as stylex from "@stylexjs/stylex";
import { tokens } from "../tokens.stylex";

function Result(props) {
  const [currentScoreTracker, setCurrentScoreTracker] = useState(
    formatArrayToTargetObject(props.llmResult.skills, 0, "label"),
  );

  const totalScore = props.llmResult.skills.reduce((acc, cur) => {
    acc = acc + cur.actionItems.length;
    return acc;
  }, 0);

  const [isVisible, setIsVisible] = useState(false);
  const myRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // const entry = entries[0];
        const triggerThreshold = 0.1;

        if (entry.intersectionRatio > triggerThreshold) {
          setIsVisible(true);
        } else if (entry.intersectionRatio <= triggerThreshold) {
          setIsVisible(false);
        }
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] },
    );
    if (myRef.current) {
      observer.observe(myRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const currentScore = mapStateToCurrentScore(currentScoreTracker);
  const percentage = Math.round((currentScore / totalScore) * 100);

  return (
    <div>
      <Header
        setRoute={props.setRoute}
        setJobDescription={props.setJobDescription}
        enableRestart
        enableShare
      />
      <div {...stylex.props(styles.containerWhole)}>
        <div {...stylex.props(styles.container)}>
          <HonestDecoder llmResult={props.llmResult} />
          <Score currentScore={currentScore} totalScore={totalScore} />
        </div>
        <div ref={myRef} {...stylex.props(styles.skillContainer)}>
          <div>
            <p {...stylex.props(styles.skillDescription)}>
              {" "}
              Improve your job readiness score by assessing your technical
              skills 👇
            </p>
            {props.llmResult.skills.map((skill, index) => {
              return (
                <Skill
                  key={index}
                  skill={skill}
                  updateSkillScore={(score) => {
                    setCurrentScoreTracker((prev) => {
                      return { ...prev, [skill.label]: score };
                    });
                  }}
                />
              );
            })}
          </div>
          {isVisible && (
            <div {...stylex.props(styles.floatingProgress)}>
              <p {...stylex.props(styles.p)}>Readiness</p>
              <ProgressBar completed={percentage} />
              <p {...stylex.props(styles.p)}>{percentage}%</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = stylex.create({
  containerWhole: {
    display: {
      "@media (max-width: 800px)": null,
      "@media (min-width: 801px)": "flex",
    },
    flexDirection: {
      "@media (max-width: 800px)": null,
      "@media (min-width: 801px)": "row",
    },
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: {
      "@media (max-width: 800px)": "center",
      "@media (min-width: 801px)": "left",
    },
    padding: "2rem 2rem 0 2rem",
    width: {
      "@media (max-width: 800px)": null,
      "@media (min-width: 801px)": "60dvw",
    },
    marginLeft: {
      "@media (max-width: 800px)": null,
      "@media (min-width: 801px)": "3rem",
    },
  },
  skillContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
    width: {
      "@media (max-width: 800px)": null,
      "@media (min-width: 801px)": "40dvw",
    },
    marginRight: {
      "@media (max-width: 800px)": null,
      "@media (min-width: 801px)": "3rem",
    },
  },
  floatingProgress: {
    display: {
      "@media (max-width: 800px)": "flex",
      "@media (min-width: 801px)": "none",
    },
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "fixed",
    width: {
      "@media (max-width: 800px)": "78%",
      "@media (min-width: 801px)": "30%",
    },
    height: "fit-content",
    padding: "0.4rem 1rem 0.4rem 1rem",
    borderWidth: 0,
    borderRadius: "25px",
    backgroundColor: "rgba(255, 255, 255, 0.94)",
    top: "30px",
    zIndex: "999",
    boxShadow: "0 0 20px 5px rgba(0, 0, 0, 0.1)",
  },
  p: {
    fontSize: "18px",
    margin: 0,
    padding: 0,
    color: tokens["--color-navy"],
    fontWeight: "600",
  },
  skillDescription: {
    display: {
      "@media (max-width: 800px)": "none",
      "@media (min-width: 801px)": "block",
    },
    fontSize: "18px",
    textAlign: "left",
    width: "40dvw",
    padding: "1rem",
    margin: "0",
    fontWeight: "100",
    marginBottom: "1rem",
    lineHeight: "1.6rem",
  },
});

export default Result;
