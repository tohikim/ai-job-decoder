import youtube from "../assets/youtube.png";
import { useEffect, useState } from "react";
import { skillStatuses } from "../constants/skill-statuses";
import { formatArrayToTargetObject } from "../utils/format-array-to-target-object";
import * as stylex from "@stylexjs/stylex";
import { tokens } from "../tokens.stylex";

const Skill = (props) => {
  const [statusIndex, setStatusIndex] = useState(0);
  const [checked, setChecked] = useState(
    formatArrayToTargetObject(props.skill.actionItems, false),
  );

  useEffect(() => {
    switch (statusIndex) {
      case 1:
        setChecked(formatArrayToTargetObject(props.skill.actionItems, true));
        break;
      case 2:
        const allAreTrue = props.skill.actionItems.every(
          (item) => checked[item],
        );

        if (allAreTrue) {
          setChecked(formatArrayToTargetObject(props.skill.actionItems, false));
        }
        break;
      case 3:
        setChecked(formatArrayToTargetObject(props.skill.actionItems, false));
        break;
      default:
        break;
    }
  }, [statusIndex]);

  useEffect(() => {
    const skillsToUpdateCount = props.skill.actionItems.reduce((acc, cur) => {
      if (checked[cur]) {
        acc += 1;

        return acc;
      }

      return acc;
    }, 0);

    props.updateSkillScore(skillsToUpdateCount);

    if (props.skill.actionItems.length === skillsToUpdateCount) {
      setStatusIndex(1);
      return;
    } else if (skillsToUpdateCount > 0) {
      setStatusIndex(2);
      return;
    }
  }, [checked]);

  return (
    <div key={props.skill.label} {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.topSection(statusIndex))}>
        <h6 {...stylex.props(styles.h6)}>{props.skill.label}</h6>
        <form>
          <select
            value={statusIndex}
            {...stylex.props(styles.statusIndex)}
            onChange={(e) => {
              e.preventDefault();
              setStatusIndex(+e.target.value);
            }}
          >
            {skillStatuses.map((status, index) => {
              const isDefault = index === 0;
              return (
                <option
                  key={status.label}
                  disabled={isDefault}
                  defaultValue={isDefault}
                  value={index}
                >
                  {status.label}
                </option>
              );
            })}
          </select>
        </form>
      </div>
      <div {...stylex.props(styles.skillDiv)}>
        {props.skill.actionItems.map((item) => {
          const isChecked = checked[item];
          const link = () => {
            const url = "https://www.youtube.com/results?search_query=" + item;
            return window.open(url);
          };
          return (
            <div key={item} {...stylex.props(styles.section(isChecked))}>
              <input
                type="checkbox"
                value={item}
                checked={isChecked}
                onChange={() => {
                  setChecked((prev) => {
                    return {
                      ...prev,
                      [item]: !isChecked,
                    };
                  });
                }}
                {...stylex.props(styles.checkbox, isChecked && styles.checked)}
              />
              <button
                onClick={() => {
                  setChecked((prev) => {
                    return {
                      ...prev,
                      [item]: !isChecked,
                    };
                  });
                }}
                {...stylex.props(styles.inputValue(isChecked))}
              >
                {item}
              </button>
              <button onClick={link} {...stylex.props(styles.button)}>
                <img
                  alt="Youtube link"
                  src={youtube}
                  {...stylex.props(styles.img(isChecked))}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = stylex.create({
  container: {
    marginBottom: 28,
    width: "100%",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: tokens["--color-third"],
    borderRadius: 15,
  },
  topSection: (statusIndex) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderBottom: `1px solid ${tokens["--color-third"]}`,
    backgroundColor: skillStatuses[statusIndex].backgroundColor,
  }),
  section: (isChecked) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    textAlign: "left",
    padding: "1rem",
    gap: "1rem",
    position: "relative",
    color: isChecked ? tokens["--color-third"] : tokens["--color-secondary"],
  }),
  checkbox: {
    appearance: "none",
    width: "1.6rem",
    height: "1.6rem",
    padding: "0.8rem",
    textAlign: "left",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: tokens["--color-fourth"],
    borderRadius: "50px",
  },
  checked: {
    padding: "0.8rem",
    borderColor: tokens["--color-third"],
    backgroundColor: tokens["--color-third"],
  },
  inputValue: (isChecked) => ({
    fontSize: "18px",
    textAlign: "left",
    padding: "0",
    margin: "0",
    fontWeight: "300",
    lineHeight: "1.4rem",
    marginBottom: "0.5rem",
    marginRight: "0.3rem",
    position: "relative",
    backgroundColor: "transparent",
    borderWidth: 0,
    textDecoration: isChecked
      ? `line-through ${tokens["--color-third"]}`
      : undefined,
    color: isChecked ? tokens["--color-third"] : tokens["--color-secondary"],
  }),
  img: (isChecked) => ({
    height: "15px",
    width: "15px",
    margin: 0,
    paddingTop: "0.3rem",
    alignItems: "center",
    opacity: isChecked ? 0.2 : 0.7,
  }),
  h6: {
    fontSize: "18px",
    textAlign: "left",
    fontWeight: "400",
    padding: 0,
    margin: 0,
  },
  skillDiv: {
    borderRadius: "15px",
    marginTop: "0.6rem",
    textAlign: "left",
  },
  statusIndex: {
    borderWidth: 0,
    backgroundColor: "transparent",
    fontSize: "18px",
    paddingRight: "1rem",
  },
  button: {
    borderWidth: 0,
    backgroundColor: "transparent",
  },
});

export default Skill;
