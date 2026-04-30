import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import HonestDecoder from "../components/HonestDecoder";
import Score from "../components/Score";
import Skill from "../components/Skill.jsx";
import { mapStateToCurrentScore } from "../utils/map-state-to-current-score";
import { formatArrayToTargetObject } from "../utils/format-array-to-target-object";
import ProgressBar from "../components/ProgressBar.jsx";

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
        if (entry.intersectionRatio > 0.2) {
          setIsVisible(true);
        } else if (entry.intersectionRatio <= 0.2) {
          setIsVisible(false);
        }

        console.log(entry.intersectionRatio);
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
      <div style={styles.container}>
        <HonestDecoder llmResult={props.llmResult} />
        <Score currentScore={currentScore} totalScore={totalScore} />

        <div ref={myRef}>
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
          <div style={styles.floatingProgress}>
            <p style={styles.p}>Readiness</p>
            <ProgressBar completed={percentage} />
            <p
              style={{
                ...styles.p,
                color: "var(--color-navy)",
                fontWeight: "600",
              }}
            >
              {percentage}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
  },
  floatingProgress: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "fixed",
    width: "78%",
    height: "fit-content",
    padding: "0.4rem 1rem 0.4rem 1rem",
    border: "none",
    borderRadius: "25px",
    background: "rgba(255, 255, 255, 0.9)",
    top: "30px",
    zIndex: "999",
    boxShadow: "0 0 20px 5px rgba(0, 0, 0, 0.1)",
  },
  p: {
    fontWeight: "400",
    fontSize: "18px",
    margin: 0,
    padding: 0,
  },
};

export default Result;
